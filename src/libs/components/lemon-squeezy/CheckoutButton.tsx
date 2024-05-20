'use client';

import { changePlan, getCheckoutURL } from '@/libs/lemon-squeezy/actions';
import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { SignInButton, useSession } from '@clerk/nextjs';
import { LsSubscriptionPlan, LsUserSubscription } from '@prisma/client';
import { useRouter } from 'next/navigation';
import {
    type ComponentProps,
    type ElementRef,
    forwardRef,
    useState,
} from 'react';
import { toast } from 'react-toastify';

type ButtonElement = ElementRef<typeof Button>;
type ButtonProps = ComponentProps<typeof Button> & {
    embed?: boolean; // Embed the checkout modal in the page as a modal
    currentPlan?: LsUserSubscription; // Current user's subscription. If present, the button for this plan will display "Your Plan"
    plan: LsSubscriptionPlan; // Plan to display
    isChangingPlans?: boolean; // If true, the button will change the user's plan instead of creating a new checkout
};

// Display a checkout button that opens the Lemon.js modal or changes the user's plan.
export const CheckoutButton = forwardRef<ButtonElement, ButtonProps>(
    (props, ref) => {
        const router = useRouter();
        const t = useI18n();

        const session = useSession();

        const {
            embed = false,
            plan,
            currentPlan,
            isChangingPlans,
            ...otherProps
        } = props;

        const [loading, setLoading] = useState(false);

        // If the plan is the current plan, show the "Your Plan" label.
        const isCurrent = plan.id === currentPlan?.planId;
        const label = isCurrent
            ? t('landing.pricing.your_plan')
            : isChangingPlans
            ? t('landing.pricing.switch_to_plan')
            : t('landing.pricing.get_started');

        // If the user is not signed in, show the sign in button.
        if (!session?.isSignedIn) {
            return (
                <SignInButton>
                    <Button
                        ref={ref}
                        disabled={loading || isCurrent || props.disabled}
                        {...otherProps}
                    >
                        {t('landing.pricing.sign_up')}
                    </Button>
                </SignInButton>
            );
        }

        return (
            <Button
                ref={ref}
                disabled={loading || isCurrent || props.disabled}
                onClick={async () => {
                    // If changing plans, call server action.
                    if (isChangingPlans) {
                        if (!currentPlan?.id) {
                            throw new Error('Current plan not found.');
                        }

                        if (!plan.id) {
                            throw new Error('New plan not found.');
                        }

                        setLoading(true);
                        await changePlan(currentPlan.planId, plan.id);
                        setLoading(false);

                        router.refresh();

                        return;
                    }

                    // Otherwise, create a checkout and open the Lemon.js modal.
                    let checkoutUrl: string | undefined = '';
                    try {
                        setLoading(true);
                        checkoutUrl = await getCheckoutURL(
                            plan.variantId,
                            embed,
                        );
                    } catch (error) {
                        setLoading(false);
                        toast.error(t('landing.pricing.checkout_error'));
                    } finally {
                        embed && setLoading(false);
                    }

                    embed
                        ? checkoutUrl &&
                          window.LemonSqueezy.Url.Open(checkoutUrl)
                        : router.push(checkoutUrl ?? '/');
                }}
                {...otherProps}
            >
                {label}
            </Button>
        );
    },
);

CheckoutButton.displayName = 'CheckoutButton';
