'use client';

import { Plan } from '@/libs/components/lemon-squeezy/Plan';
import { isValidSubscription } from '@/libs/lemon-squeezy/utils';
import { useI18n } from '@/libs/locales/client';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/libs/ui/sheet';
import { LsSubscriptionPlan, LsUserSubscription } from '@prisma/client';

export function ChangePlans({
    allPlans,
    userSubscriptions,
    onClose,
}: {
    allPlans: LsSubscriptionPlan[];
    userSubscriptions: LsUserSubscription[];
    onClose: () => void;
}) {
    const t = useI18n();

    const currentPlan = userSubscriptions.find((s) =>
        isValidSubscription(s.status),
    );

    // Check if the current plan is usage based
    const isCurrentPlanUsageBased = currentPlan?.isUsageBased;

    // Get all plans that are usage based or not usage based
    const filteredPlans = allPlans
        .filter((plan) => {
            return isCurrentPlanUsageBased
                ? Boolean(plan.isUsageBased)
                : Boolean(!plan.isUsageBased);
        })
        .sort((a, b) => {
            if (
                a.sort === undefined ||
                a.sort === null ||
                b.sort === undefined ||
                b.sort === null
            ) {
                return 0;
            }

            return a.sort - b.sort;
        });

    return (
        <Sheet
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose();
                }
            }}
        >
            <SheetContent
                className="overflow-y-auto w-full h-full md:h-auto"
                side="bottom"
            >
                <SheetHeader>
                    <SheetTitle>
                        {t('dashboard.my_account.change_plan')}
                    </SheetTitle>
                    <SheetDescription>
                        {t('dashboard.my_account.change_plan_description')}
                    </SheetDescription>
                </SheetHeader>

                {!userSubscriptions.length ||
                !allPlans.length ||
                filteredPlans.length < 2 ? (
                    <p>{t('dashboard.my_account.no_plans_available')}</p>
                ) : (
                    <div className="grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 py-4">
                        {filteredPlans.map((plan, index) => (
                            <Plan
                                key={plan.id}
                                subscriptionPlan={plan}
                                currentPlan={currentPlan}
                                isChangingPlans={true}
                            />
                        ))}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
