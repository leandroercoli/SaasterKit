'use client';

import { DashboardStatsCard } from '@/libs/components';
import { useDisplayCurrency } from '@/libs/cookies/currency/useDisplayCurrency';
import { useI18n } from '@/libs/locales/client';
import { formatDateShortDay } from '@/libs/utils';
import { TodoItem } from '@prisma/client';
import moment from 'moment';

import { NewTodoItemCard } from './NewTodoItemCard';
import { RecentTodoItemsCard } from './RecentTodoItemsCard';
import { UpcomingTodoItemsCard } from './UpcomingTodoItemsCard';
import { BarChartCard } from './charts/BarChartCard';

const startOfMonth = moment()
    .startOf('month')
    .startOf('day')
    .format('YYYY-MM-DD');
const endOfMonth = moment().endOf('month').endOf('day').format('YYYY-MM-DD');

export function DashboardPageView({
    upcomingTodoItems,
    recentTodoItems,
}: {
    upcomingTodoItems: TodoItem[];
    recentTodoItems: TodoItem[];
}) {
    const t = useI18n();

    // Globally selected currency
    const { displayCurrency } = useDisplayCurrency();

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <NewTodoItemCard />
                <DashboardStatsCard
                    title={t('dashboard.todo.stats.completed')}
                    value={'23'}
                    description={t('dashboard.todo.stats.items_from_to', {
                        from: formatDateShortDay(startOfMonth),
                        to: formatDateShortDay(endOfMonth),
                    })}
                    badge={displayCurrency}
                />
                <DashboardStatsCard
                    title={t('dashboard.todo.stats.pending')}
                    value={'23'}
                    description={t('dashboard.todo.stats.items_from_to', {
                        from: formatDateShortDay(startOfMonth),
                        to: formatDateShortDay(endOfMonth),
                    })}
                    badge={displayCurrency}
                    progress={32}
                />
                <BarChartCard />
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <RecentTodoItemsCard recentTodoItems={recentTodoItems} />
                <UpcomingTodoItemsCard upcomingTodoItems={upcomingTodoItems} />
            </div>
        </>
    );
}
