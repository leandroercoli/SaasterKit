'use client';

import type { ReactNode } from 'react';

import { Loading } from '../components';
import { I18nProviderClient } from '../locales/client';

type ProviderProps = {
    locale: string;
    children: ReactNode;
};

// i18n provider
export function LocaleProvider({ locale, children }: ProviderProps) {
    return (
        <I18nProviderClient locale={locale} fallback={<Loading />}>
            {children}
        </I18nProviderClient>
    );
}
