import { Plan } from '@/libs/components/lemon-squeezy/Plan';
import { formatPrice, isValidSubscription } from '@/libs/lemon-squeezy/utils';
import { getI18n } from '@/libs/locales/server';
import { Badge, BadgeProps } from '@/libs/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { formatDateShort } from '@/libs/utils';
import { LsSubscriptionPlan, LsUserSubscription } from '@prisma/client';

import { ChangePlansButton } from './ChangePlansButton';
import { SubscriptionActions } from './SubscriptionsActions';

export async function Subscriptions({
    allPlans,
    userSubscriptions,
}: {
    allPlans: LsSubscriptionPlan[];
    userSubscriptions: LsUserSubscription[];
}) {
    const t = await getI18n();

    const hasValidSubscriptions = userSubscriptions.some((s) =>
        isValidSubscription(s.status),
    );

    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>{t('dashboard.my_account.billing')}</CardTitle>
                    <CardDescription>
                        {t('dashboard.my_account.billing_description')}{' '}
                        {!hasValidSubscriptions
                            ? t('dashboard.my_account.no_subscriptions')
                            : ''}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        // If the user has no valid subscriptions, show the available plans
                        !hasValidSubscriptions && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                    {allPlans.map((item, index) => (
                                        <Plan
                                            key={index}
                                            subscriptionPlan={item}
                                        />
                                    ))}
                                </div>
                            </>
                        )
                    }
                    <div className="flex flex-col gap-4">
                        {userSubscriptions.map((subscription) => {
                            const plan = allPlans.find(
                                (p) => p.id === subscription.planId,
                            );

                            if (!plan) return null;

                            return (
                                <Card key={subscription.id}>
                                    <CardHeader className="grid gap-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center gap-2">
                                                <CardTitle>
                                                    {plan?.productName}{' '}
                                                    {plan?.name}
                                                </CardTitle>
                                                <SubscriptionStatus
                                                    userSubscription={
                                                        subscription
                                                    }
                                                />
                                            </div>
                                            <div className="flex-1 gap-1 flex justify-end items-center">
                                                {isValidSubscription(
                                                    subscription.status,
                                                ) && (
                                                    <ChangePlansButton
                                                        allPlans={allPlans}
                                                        userSubscriptions={
                                                            userSubscriptions
                                                        }
                                                    />
                                                )}
                                                <SubscriptionActions
                                                    userSubscription={
                                                        subscription
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <CardDescription>
                                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                                <SubscriptionPrice
                                                    userSubscription={
                                                        subscription
                                                    }
                                                    subscriptionPlan={plan}
                                                />
                                                <SubscriptionDate
                                                    userSubscription={
                                                        subscription
                                                    }
                                                />
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Display the status of a subscription
function SubscriptionStatus({
    userSubscription,
}: {
    userSubscription: LsUserSubscription;
}) {
    const statusColor: Record<string, BadgeProps['variant']> = {
        active: 'default',
        cancelled: 'secondary',
        expired: 'destructive',
        past_due: 'destructive',
        on_trial: 'default',
        unpaid: 'destructive',
        pause: 'outline',
        paused: 'outline',
    };

    const _status = userSubscription?.isPaused
        ? 'paused'
        : userSubscription?.status;
    const _statusFormatted = userSubscription?.isPaused
        ? 'Paused'
        : userSubscription?.statusFormatted;

    return (
        <Badge className="w-fit" variant={statusColor[_status]}>
            {_statusFormatted}
        </Badge>
    );
}

// Display the price of a subscription
function SubscriptionPrice({
    userSubscription,
    subscriptionPlan,
}: {
    userSubscription: LsUserSubscription;
    subscriptionPlan: LsSubscriptionPlan;
}) {
    if (userSubscription?.endsAt) return null;

    let formattedPrice = formatPrice(userSubscription?.price);

    if (userSubscription?.isUsageBased) {
        formattedPrice += '/unit';
    }

    const formattedIntervalCount =
        subscriptionPlan?.intervalCount && subscriptionPlan?.intervalCount !== 1
            ? `every ${subscriptionPlan?.intervalCount} `
            : 'every';

    return (
        <>
            <span>{`${formattedPrice} ${formattedIntervalCount} ${subscriptionPlan?.interval}`}</span>
        </>
    );
}

// Display the renewal date of a subscription
function SubscriptionDate({
    userSubscription,
}: {
    userSubscription: LsUserSubscription;
}) {
    const now = new Date();
    const trialEndDate = userSubscription?.trialEndsAt
        ? new Date(userSubscription?.trialEndsAt)
        : null;
    const endsAtDate = userSubscription?.endsAt
        ? new Date(userSubscription?.endsAt)
        : null;
    let message = `Renews on ${
        userSubscription?.renewsAt
            ? formatDateShort(userSubscription?.renewsAt)
            : ''
    }`;

    if (!userSubscription?.trialEndsAt && !userSubscription?.renewsAt)
        return null;

    if (trialEndDate && trialEndDate > now) {
        message = `Ends on ${
            userSubscription?.trialEndsAt
                ? formatDateShort(userSubscription?.trialEndsAt)
                : ''
        }`;
    }

    if (userSubscription?.endsAt) {
        message =
            endsAtDate && endsAtDate < now
                ? `Expired on ${formatDateShort(userSubscription?.endsAt)}`
                : `Expires on ${formatDateShort(userSubscription?.endsAt)}`;
    }

    return (
        <>
            <p>{message}</p>
        </>
    );
}
