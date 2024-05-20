import { useI18n } from '@/libs/locales/client';
import { Home, ListTodo, Settings, User } from 'lucide-react';

// Sidenav routes with their translated labels, icons, and hrefs
export function useSidenavRoutes() {
    const t = useI18n();

    return [
        {
            label: t('dashboard.nav.dashboard'),
            Icon: Home,
            href: '/dashboard',
        },
        {
            label: t('dashboard.nav.todo'),
            Icon: ListTodo,
            href: '/dashboard/todo',
        },
        {
            label: t('dashboard.nav.my_account'),
            Icon: User,
            href: '/dashboard/my-account',
        },
        {
            label: t('dashboard.nav.settings'),
            Icon: Settings,
            href: '/dashboard/settings',
        },
    ];
}
