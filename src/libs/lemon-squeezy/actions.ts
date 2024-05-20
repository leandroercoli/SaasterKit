'use server';

import { getSignedInUserOrThrow, prisma } from '@/libs/database';
import { configureLemonSqueezy } from '@/libs/lemon-squeezy/config';
import {
    type Variant,
    cancelSubscription,
    createCheckout,
    getPrice,
    getProduct,
    getSubscription,
    listPrices,
    listProducts,
    updateSubscription,
} from '@lemonsqueezy/lemonsqueezy.js';
import {
    LsSubscriptionPlan,
    LsUserSubscription,
    LsWebhookEvent,
} from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { webhookHasData, webhookHasMeta } from './typeguards';

/**
 * This action will create a checkout on Lemon Squeezy.
 */
export async function getCheckoutURL(variantId: number, embed = false) {
    configureLemonSqueezy();

    // Get the signed in user or throw an error.
    const user = await getSignedInUserOrThrow();

    const checkout = await createCheckout(
        process.env.LEMONSQUEEZY_STORE_ID!,
        variantId,
        {
            checkoutOptions: {
                embed,
                media: false,
                logo: !embed,
            },
            checkoutData: {
                email: user.email,
                custom: {
                    userId: user.id,
                    clerkUserId: user.clerkUserId,
                },
            },
            productOptions: {
                enabledVariants: [variantId],
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/my-account/`,
                receiptButtonText: 'Go to Dashboard',
                receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
            },
        },
    );

    return checkout.data?.data.attributes.url;
}

/**
 * This action will sync the product variants from Lemon Squeezy with the
 * Plans database model. It will only sync the 'subscription' variants.
 */
export async function syncPlans() {
    configureLemonSqueezy();

    // Fetch all the variants from the database.
    const productVariants: LsSubscriptionPlan[] =
        await prisma.lsSubscriptionPlan.findMany();

    // Helper function to add a variant to the productVariants array and sync it with the database.
    async function _addVariant(
        variant: Omit<LsSubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>,
    ) {
        // eslint-disable-next-line no-console -- allow
        console.log(`Syncing variant ${variant.name} with the database...`);

        // Sync the variant with the plan in the database.
        const newVariant = await prisma.lsSubscriptionPlan.upsert({
            where: { variantId: variant.variantId },
            create: variant,
            update: variant,
        });

        /* eslint-disable no-console -- allow */
        console.log(`${variant.name} synced with the database...`);

        productVariants.push(newVariant);
    }

    // Fetch products from the Lemon Squeezy store.
    const products = await listProducts({
        filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
        include: ['variants'],
    });

    // Loop through all the variants.
    const allVariants = products.data?.included as
        | Variant['data'][]
        | undefined;

    // for...of supports asynchronous operations, unlike forEach.
    if (allVariants) {
        for (const v of allVariants) {
            const variant = v.attributes;

            // Skip draft variants or if there's more than one variant, skip the default
            // variant. See https://docs.lemonsqueezy.com/api/variants
            if (
                variant.status === 'draft' ||
                (allVariants.length !== 1 && variant.status === 'pending')
            ) {
                // `return` exits the function entirely, not just the current iteration.
                continue;
            }

            // Fetch the Product name.
            const productName =
                (await getProduct(variant.product_id)).data?.data.attributes
                    .name ?? '';

            // Fetch the Price object.
            const variantPriceObject = await listPrices({
                filter: {
                    variantId: v.id,
                },
            });

            const currentPriceObj = variantPriceObject.data?.data.at(0);
            const isUsageBased =
                currentPriceObj?.attributes.usage_aggregation !== null;
            const interval =
                currentPriceObj?.attributes.renewal_interval_unit ?? null;
            const intervalCount =
                currentPriceObj?.attributes.renewal_interval_quantity ?? null;
            const trialInterval =
                currentPriceObj?.attributes.trial_interval_unit ?? null;
            const trialIntervalCount =
                currentPriceObj?.attributes.trial_interval_quantity ?? null;

            const price = isUsageBased
                ? currentPriceObj?.attributes.unit_price_decimal
                : currentPriceObj.attributes.unit_price;

            const priceString = price !== null ? price?.toString() ?? '' : '';

            const isSubscription =
                currentPriceObj?.attributes.category === 'subscription';

            // If not a subscription, skip it.
            if (!isSubscription) {
                continue;
            }

            await _addVariant({
                name: variant.name,
                description: variant.description,
                price: priceString,
                interval,
                intervalCount,
                isUsageBased,
                productId: variant.product_id,
                productName,
                variantId: parseInt(v.id) as unknown as number,
                trialInterval,
                trialIntervalCount,
                sort: variant.sort,
            });
        }
    }

    return productVariants;
}

/**
 * This action will store a webhook event in the database.
 * @param eventName - The name of the event.
 * @param body - The body of the event.
 */
export async function storeWebhookEvent(
    eventName: string,
    body: LsWebhookEvent['body'],
) {
    const event = await prisma.lsWebhookEvent.create({
        data: {
            eventName,
            processed: false,
            body: JSON.parse(JSON.stringify(body)),
        },
    });

    return event;
}

/**
 * This action will process a webhook event in the database.
 */
export async function processWebhookEvent(webhookEvent: LsWebhookEvent) {
    configureLemonSqueezy();

    let processingError = '';
    const eventBody = webhookEvent.body;

    if (!webhookHasMeta(eventBody)) {
        processingError = "Event body is missing the 'meta' property.";
    } else if (webhookHasData(eventBody)) {
        if (webhookEvent.eventName.startsWith('subscription_payment_')) {
            // Save subscription invoices; eventBody is a SubscriptionInvoice
            // Not implemented.
        } else if (webhookEvent.eventName.startsWith('subscription_')) {
            // Save subscription events; obj is a Subscription
            const attributes = eventBody.data.attributes;
            const variantId = `${attributes.variant_id}`;

            // We assume that the Plan table is up to date.
            const plan = await prisma.lsSubscriptionPlan.findMany({
                where: {
                    variantId: parseInt(variantId, 10),
                },
            });

            if (plan.length < 1) {
                processingError = `Plan with variantId ${variantId} not found.`;
            } else {
                // Update the subscription in the database.

                const priceId = attributes.first_subscription_item.price_id;

                // Get the price data from Lemon Squeezy.
                const priceData = await getPrice(priceId);
                if (priceData.error) {
                    processingError = `Failed to get the price data for the subscription ${eventBody.data.id}.`;
                }

                const isUsageBased =
                    attributes.first_subscription_item.is_usage_based;
                const price = isUsageBased
                    ? priceData.data?.data.attributes.unit_price_decimal
                    : priceData.data?.data.attributes.unit_price;

                const updateData = {
                    lemonSqueezyId: eventBody.data.id,
                    orderId: attributes.order_id as number,
                    name: attributes.user_name as string,
                    email: attributes.user_email as string,
                    status: attributes.status as string,
                    statusFormatted: attributes.status_formatted as string,
                    renewsAt: attributes.renews_at as string,
                    endsAt: attributes.ends_at as string,
                    trialEndsAt: attributes.trial_ends_at as string,
                    price: price?.toString() ?? '',
                    isPaused: false,
                    subscriptionItemId: `${attributes.first_subscription_item.id}`,
                    isUsageBased:
                        attributes.first_subscription_item.is_usage_based,
                    userId: eventBody.meta.custom_data.user_id,
                    planId: plan[0].id,
                };

                // Create/update subscription in the database.
                try {
                    await prisma.lsUserSubscription.upsert({
                        where: {
                            lemonSqueezyId: updateData.lemonSqueezyId,
                        },
                        create: updateData,
                        update: updateData,
                    });
                } catch (error) {
                    processingError = `Failed to upsert Subscription #${updateData.lemonSqueezyId} to the database.`;
                    console.error(error);
                }
            }
        } else if (webhookEvent.eventName.startsWith('order_')) {
            // Save orders; eventBody is a "Order"
            /* Not implemented */
        } else if (webhookEvent.eventName.startsWith('license_')) {
            // Save license keys; eventBody is a "License key"
            /* Not implemented */
        }

        // Update the webhook event in the database.
        await prisma.lsWebhookEvent.update({
            where: {
                id: webhookEvent.id,
            },
            data: {
                processed: true,
                processingError,
            },
        });

        revalidatePath('/');
    }
}

/**
 * This action will get the subscriptions for the current user.
 */
export async function getUserSubscriptions() {
    // Get the signed in user or throw an error.
    const user = await getSignedInUserOrThrow();

    const userSubscriptions: LsUserSubscription[] =
        await prisma.lsUserSubscription.findMany({
            where: {
                userId: user.id,
            },
        });

    return userSubscriptions;
}

/**
 * This action will cancel a subscription on Lemon Squeezy.
 */
export async function cancelSub(id: string) {
    configureLemonSqueezy();

    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions();

    // Check if the subscription exists
    const subscription = userSubscriptions.find(
        (sub) => sub.lemonSqueezyId === id,
    );

    if (!subscription) {
        throw new Error(`Subscription #${id} not found.`);
    }

    const cancelledSub = await cancelSubscription(id);

    if (cancelledSub.error) {
        throw new Error(cancelledSub.error.message);
    }

    // Update the db
    try {
        await prisma.lsUserSubscription.update({
            where: {
                lemonSqueezyId: id,
            },
            data: {
                status: cancelledSub.data?.data.attributes.status,
                statusFormatted:
                    cancelledSub.data?.data.attributes.status_formatted,
                endsAt: cancelledSub.data?.data.attributes.ends_at,
            },
        });
    } catch (error) {
        throw new Error(
            `Failed to cancel Subscription #${id} in the database.`,
        );
    }

    revalidatePath('/');

    return cancelledSub;
}

/**
 * This action will pause a subscription on Lemon Squeezy.
 */
export async function pauseUserSubscription(id: string) {
    configureLemonSqueezy();

    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions();

    // Check if the subscription exists
    const subscription = userSubscriptions.find(
        (sub) => sub.lemonSqueezyId === id,
    );

    if (!subscription) {
        throw new Error(`Subscription #${id} not found.`);
    }

    const returnedSub = await updateSubscription(id, {
        pause: {
            mode: 'void',
        },
    });

    // Update the db
    try {
        await prisma.lsUserSubscription.update({
            where: {
                lemonSqueezyId: id,
            },
            data: {
                status: returnedSub.data?.data.attributes.status,
                statusFormatted:
                    returnedSub.data?.data.attributes.status_formatted,
                endsAt: returnedSub.data?.data.attributes.ends_at,
                isPaused: returnedSub.data?.data.attributes.pause !== null,
            },
        });
    } catch (error) {
        throw new Error(`Failed to pause Subscription #${id} in the database.`);
    }

    revalidatePath('/');

    return returnedSub;
}

/**
 * This action will unpause a subscription on Lemon Squeezy.
 */
export async function unpauseUserSubscription(id: string) {
    configureLemonSqueezy();

    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions();

    // Check if the subscription exists
    const subscription = userSubscriptions.find(
        (sub) => sub.lemonSqueezyId === id,
    );

    if (!subscription) {
        throw new Error(`Subscription #${id} not found.`);
    }

    const returnedSub = await updateSubscription(id, {
        // @ts-expect-error -- null is a valid value for pause
        pause: null,
    });

    // Update the db
    try {
        await prisma.lsUserSubscription.update({
            where: {
                lemonSqueezyId: id,
            },
            data: {
                status: returnedSub.data?.data.attributes.status,
                statusFormatted:
                    returnedSub.data?.data.attributes.status_formatted,
                endsAt: returnedSub.data?.data.attributes.ends_at,
                isPaused: returnedSub.data?.data.attributes.pause !== null,
            },
        });
    } catch (error) {
        throw new Error(`Failed to pause Subscription #${id} in the database.`);
    }

    revalidatePath('/');

    return returnedSub;
}

/**
 * This action will change the plan of a subscription on Lemon Squeezy.
 */
export async function changePlan(currentPlanId: string, newPlanId: string) {
    configureLemonSqueezy();

    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions();

    // Check if the subscription exists
    const subscription = userSubscriptions.find(
        (sub) => sub.planId === currentPlanId,
    );

    if (!subscription) {
        throw new Error(
            `No subscription with plan id #${currentPlanId} was found.`,
        );
    }

    // Get the new plan details from the database.
    const newPlan = await prisma.lsSubscriptionPlan.findFirst({
        where: {
            id: newPlanId,
        },
    });

    if (!newPlan) {
        throw new Error(`Plan #${newPlanId} not found.`);
    }

    // Send request to Lemon Squeezy to change the subscription.
    const updatedSub = await updateSubscription(subscription.lemonSqueezyId, {
        variantId: newPlan.variantId,
    });

    // Save in db
    try {
        await prisma.lsUserSubscription.update({
            where: {
                lemonSqueezyId: subscription.lemonSqueezyId,
            },
            data: {
                planId: newPlanId,
                price: newPlan.price,
                endsAt: updatedSub.data?.data.attributes.ends_at,
            },
        });
    } catch (error) {
        throw new Error(
            `Failed to update Subscription #${subscription.lemonSqueezyId} in the database.`,
        );
    }

    revalidatePath('/');

    return updatedSub;
}

/**
 * This action will get the subscription URLs (including `update_payment_method` for the given subscription ID.
 *
 */
export async function getSubscriptionURLs(id: string) {
    configureLemonSqueezy();
    const subscription = await getSubscription(id);

    if (subscription.error) {
        throw new Error(subscription.error.message);
    }

    return subscription.data?.data.attributes.urls;
}
