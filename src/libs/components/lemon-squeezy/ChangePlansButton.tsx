'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { LsSubscriptionPlan, LsUserSubscription } from '@prisma/client';
import { useState } from 'react';

import { ChangePlans } from './ChangePlans';

// Renders the change plans button and opens a modal to change plans
export function ChangePlansButton({
    allPlans,
    userSubscriptions,
}: {
    allPlans: LsSubscriptionPlan[];
    userSubscriptions: LsUserSubscription[];
}) {
    const t = useI18n();

    const [isChangePlansOpen, setIsChangePlansOpen] = useState(false);

    return (
        <>
            {isChangePlansOpen && (
                <ChangePlans
                    allPlans={allPlans}
                    userSubscriptions={userSubscriptions}
                    onClose={() => setIsChangePlansOpen(false)}
                />
            )}

            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangePlansOpen(true)}
            >
                {t('dashboard.my_account.change_plan')}
            </Button>
        </>
    );
}
