'use client';

import { useI18n } from '@/libs/locales/client';
import { Badge } from '@/libs/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/libs/ui/card';

export function LandingPageFeatures() {
    const t = useI18n();

    const content = [
        {
            title: 'Next.js',
            description: t('landing.features.next_description'),
        },
        {
            title: 'Tailwind CSS',
            description: t('landing.features.tailwind_description'),
        },
        {
            title: 'Prisma & Supabase',
            description: t('landing.features.prisma_description'),
        },
        {
            title: 'Clerk',
            description: t('landing.features.clerk_description'),
        },
        {
            title: 'Resend',
            description: t('landing.features.resend_description'),
        },
        {
            title: 'Sentry',
            description: t('landing.features.sentry_description'),
        },
        {
            title: 'MDX Docs',
            description: t('landing.features.mdx_description'),
        },
        {
            title: (
                <div className="flex items-start  justify-between">
                    <span>OpenAI</span>
                    <Badge
                        variant="secondary"
                        className="ml-2 whitespace-nowrap"
                    >
                        {t('landing.features.coming_soon')}
                    </Badge>
                </div>
            ),
            description: t('landing.features.openai_description'),
        },
        {
            title: (
                <div className="flex items-start justify-between">
                    <span>Lemon Squeezy</span>
                    <Badge
                        variant="secondary"
                        className="ml-2 whitespace-nowrap"
                    >
                        {t('landing.features.coming_soon')}
                    </Badge>
                </div>
            ),
            description: t('landing.features.lemon_description'),
        },
    ];

    return (
        <div
            id="landing-features"
            className="w-full max-w-5xl text-left mx-auto flex flex-col justify-center p-8 gap-8"
        >
            <h1 className="relative w-fit">
                <img
                    src="/images/brix/Line 1.svg"
                    alt="Image"
                    className="w-full scale-y-75 max-w-none absolute top-full left-0"
                />
                {t('landing.features.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
                {t('landing.features.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {content.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>
                                {item.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
