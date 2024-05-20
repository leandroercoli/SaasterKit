'use client';

import { useI18n } from '@/libs/locales/client';
import Link from 'next/link';

import { GeneralSettingsView } from './GeneralSettingsView';

export default function SettingsPageView() {
    const t = useI18n();
    return (
        <>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">
                    {t('dashboard.settings.title')}
                </h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav
                    className="grid gap-4 text-sm text-muted-foreground"
                    x-chunk="dashboard-04-chunk-0"
                >
                    <Link
                        href="/dashboard/settings"
                        className="font-semibold text-primary"
                    >
                        {t('dashboard.nav.settings_nav.general')}
                    </Link>
                    <Link href="#">
                        {t('dashboard.nav.settings_nav.premium')}
                    </Link>
                </nav>

                <GeneralSettingsView />
            </div>
        </>
    );
}
