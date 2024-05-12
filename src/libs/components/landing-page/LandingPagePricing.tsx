'use client';

import { useI18n } from '@/libs/locales/client';
import { Badge } from '@/libs/ui/badge';
import { Button } from '@/libs/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { cn } from '@/libs/utils';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export function LandingPagePricing() {
    const t = useI18n();

    const STARTER_PACK = {
        title: t('landing.pricing.starter.title'),
        price: t('landing.pricing.starter.price'),
        originalPrice: '',
        description: t('landing.pricing.starter.description'),
        features: [
            t('landing.pricing.all_features.feature_next'),
            t('landing.pricing.all_features.feature_prisma'),
            t('landing.pricing.all_features.feature_clerk'),
            t('landing.pricing.all_features.feature_supabase'),
            t('landing.pricing.all_features.feature_resend'),
            t('landing.pricing.all_features.feature_sentry'),
            t('landing.pricing.all_features.feature_i18n'),
            t('landing.pricing.all_features.feature_tailwind'),
            t('landing.pricing.all_features.feature_dashboard'),
            t('landing.pricing.all_features.feature_landing'),
            t('landing.pricing.all_features.feature_mdx'),
        ],
        missingFeatures: [
            t('landing.pricing.all_features.feature_openai'),
            t('landing.pricing.all_features.feature_lemon'),
        ],
        isComingSoon: false,
        href: 'https://github.com/leandroercoli/SaasterKit',
    };

    const PRO_PACK = {
        title: t('landing.pricing.pro.title'),
        price: '',
        originalPrice: '',
        description: t('landing.pricing.pro.description'),
        features: [
            ...STARTER_PACK.features,
            t('landing.pricing.all_features.feature_openai'),
            t('landing.pricing.all_features.feature_lemon'),
        ],
        missingFeatures: [],
        isComingSoon: true,
        href: '',
    };

    const content = [STARTER_PACK, PRO_PACK];

    return (
        <div
            id="landing-pricing"
            className="w-full max-w-5xl text-left mx-auto flex flex-col justify-center items-center p-8 gap-8"
        >
            <h1 className="relative">
                <img
                    src="/images/brix/Circle 4.svg"
                    alt="Image"
                    className="h-24 max-w-none absolute top-1/2 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2"
                />
                {t('landing.pricing.title')}
            </h1>
            <p className="text-xl text-muted-foreground text-center ">
                {t('landing.pricing.description')}
            </p>
            <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto mt-8">
                {content.map((item, index) => (
                    <Card
                        key={item.title}
                        className={cn(
                            'flex flex-col',
                            index === 0 && 'border-primary',
                        )}
                    >
                        <CardHeader className="h-40">
                            <div className="flex gap-2">
                                <CardDescription>{item.title}</CardDescription>
                                {index === 0 && (
                                    <Badge className="ml-2">
                                        {t('landing.pricing.most_popular')}
                                    </Badge>
                                )}
                                {item.isComingSoon && (
                                    <Badge variant="secondary">
                                        {t('landing.pricing.coming_soon')}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {item.originalPrice && (
                                    <CardTitle>
                                        <span className="text-muted-foreground line-through text-xl">
                                            {item.originalPrice}
                                        </span>
                                    </CardTitle>
                                )}
                                <CardTitle>{item.price}</CardTitle>
                                {item.isComingSoon && (
                                    <CardTitle>$ -</CardTitle>
                                )}
                            </div>
                            <CardDescription>
                                {item.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {item.features.map((feature) => (
                                <div
                                    className="flex items-center gap-2"
                                    key={feature}
                                >
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                            {item.missingFeatures?.map((feature) => (
                                <div
                                    className="flex items-center gap-2 text-muted-foreground"
                                    key={feature}
                                >
                                    <X className="h-4 w-4" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Link
                                href={item.isComingSoon ? '' : item.href}
                                target="_blank"
                            >
                                <Button
                                    type="button"
                                    className="w-full"
                                    variant={
                                        index === 0 ? 'default' : 'outline'
                                    }
                                    disabled={item.isComingSoon}
                                >
                                    {item.isComingSoon
                                        ? t('landing.pricing.coming_soon')
                                        : t('landing.pricing.get_started')}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
