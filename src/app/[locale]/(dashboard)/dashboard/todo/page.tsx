import { DashboardHeader } from '@/libs/components/dashboard';
import { getI18n } from '@/libs/locales/server';

import { TodoPageView } from './components/TodoPageView';

export default async function Dashboard() {
    const t = await getI18n();

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
                            label: t('dashboard.nav.todo'),
                        },
                    ]}
                />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full max-w-7xl mx-auto">
                <TodoPageView />
            </main>
        </div>
    );
}
