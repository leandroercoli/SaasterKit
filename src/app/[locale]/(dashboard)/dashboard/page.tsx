import { DashboardHeader } from '@/libs/components/dashboard';
import { getUserRecentTodoItems } from '@/libs/database/functions/todo/getUserRecentTodoItems';
import { getUserUpcomingTodoItems } from '@/libs/database/functions/todo/getUserUpcomingTodoItems';

import { DashboardPageView } from '../components/DashboardPageView';

export default async function Dashboard() {
    const recentTodoItems = await getUserRecentTodoItems();
    const upcomingTodoItems = await getUserUpcomingTodoItems();

    return (
        <div className="flex flex-col sm:gap-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <DashboardHeader />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full max-w-7xl mx-auto">
                <DashboardPageView
                    recentTodoItems={recentTodoItems}
                    upcomingTodoItems={upcomingTodoItems}
                />
            </main>
        </div>
    );
}
