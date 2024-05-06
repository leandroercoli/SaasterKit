import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

// Supported locales
export const LOCALES = [
    'en',
    'es',
    // Add more locales here
] as const;

const I18nMiddleware = createI18nMiddleware({
    locales: LOCALES,
    defaultLocale: 'en',
    urlMappingStrategy: 'rewrite',
});

export function localeMiddleware(request: NextRequest) {
    return I18nMiddleware(request);
}
