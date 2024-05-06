// locales/server.ts
import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
    createI18nServer({
        en: () => import('./en'),
        es: () => import('./es'),
        // Add more locales here
        // fr: () => import('./fr'),
    });
