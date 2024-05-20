import { getSubscriptionURLs } from '@/libs/lemon-squeezy/actions';
import { LsUserSubscription } from '@prisma/client';

import { SubscriptionsActionsDropdown } from './SubscriptionsActionsDropdown';

// RSC that passes the appropiate urls to the SubscriptionsActionsDropdown component based on the userSubscription status
export async function SubscriptionActions({
    userSubscription,
}: {
    userSubscription: LsUserSubscription;
}) {
    if (
        userSubscription.status === 'expired' ||
        userSubscription.status === 'cancelled' ||
        userSubscription.status === 'unpaid'
    ) {
        return null;
    }

    // Get the appropiate urls based on the userSubscription status
    const urls = await getSubscriptionURLs(userSubscription.lemonSqueezyId);

    return (
        <SubscriptionsActionsDropdown
            userSubscription={userSubscription}
            urls={urls}
        />
    );
}
