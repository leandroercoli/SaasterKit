import { DashboardHeader } from '@/libs/components/dashboard';
import { Subscriptions } from '@/libs/components/lemon-squeezy/Subscriptions';
import { prisma } from '@/libs/database';
import { getUserSubscriptions, syncPlans } from '@/libs/lemon-squeezy/actions';
import { getI18n } from '@/libs/locales/server';

export default async function MyAccount() {
    const t = await getI18n();

    const userSubscriptions = await getUserSubscriptions();
    let allPlans = await prisma.lsSubscriptionPlan.findMany();

    // If there are no plans in the database, sync them from Lemon Squeezy.
    // You might want to add logic to sync plans periodically or a webhook handler.
    if (!allPlans.length) {
        allPlans = await syncPlans();
    }

    // Show active subscriptions first, then paused, then canceled
    const sortedSubscriptions = userSubscriptions.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') {
            return -1;
        }

        if (a.status === 'paused' && b.status === 'cancelled') {
            return -1;
        }

        return 0;
    });

    return (
        <div className="flex flex-col sm:gap-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <DashboardHeader
                    breadcrumb={[
                        {
                            label: t('dashboard.nav.dashboard'),
                            href: '/dashboard',
                        },
                        {
                            label: t('dashboard.nav.my_account'),
                        },
                    ]}
                />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full max-w-4xl mx-auto">
                <Subscriptions
                    allPlans={allPlans}
                    userSubscriptions={sortedSubscriptions}
                />
            </main>
        </div>
    );
}
