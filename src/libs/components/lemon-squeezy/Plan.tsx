'use client';

import { formatPrice } from '@/libs/lemon-squeezy/utils';
import { useI18n } from '@/libs/locales/client';
import { Badge } from '@/libs/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { cn } from '@/libs/utils';
import { LsSubscriptionPlan, LsUserSubscription } from '@prisma/client';
import { Check, X } from 'lucide-react';

import { CheckoutButton } from './CheckoutButton';

// Display a subscription plan with its features and a checkout button.
export async function Plan({
    subscriptionPlan,
    currentPlan,
    isChangingPlans,
}: {
    subscriptionPlan: LsSubscriptionPlan;
    currentPlan?: LsUserSubscription;
    isChangingPlans?: boolean;
}) {
    // Get the description and features from the translation file. This can be set on Lemon Squeezy's dashboard as well (but in one language only)
    const t = useI18n();

    const STARTER_PACK = {
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
            t('landing.pricing.all_features.feature_lemon'),
        ],
        missingFeatures: [t('landing.pricing.all_features.feature_openai')],
        href: 'https://github.com/leandroercoli/SaasterKit',
        mostPopular: false,
    };

    const PRO_PACK = {
        description: t('landing.pricing.pro.description'),
        features: [
            ...STARTER_PACK.features,
            t('landing.pricing.all_features.feature_openai'),
        ],
        missingFeatures: [],
        href: '',
        mostPopular: true,
    };

    const { productName, name, price } = subscriptionPlan;

    // Map the variant name to the correct set of translations.
    const item = subscriptionPlan.name === 'Starter' ? STARTER_PACK : PRO_PACK;

    return (
        <Card
            className={cn(
                'flex flex-col',
                item.mostPopular && 'border-primary border-2',
            )}
        >
            <CardHeader className="h-40">
                <div className="flex gap-2">
                    <CardDescription>
                        {productName} {name}
                    </CardDescription>
                    {subscriptionPlan.name === 'Pro' && (
                        <Badge className="ml-2">
                            {t('landing.pricing.most_popular')}
                        </Badge>
                    )}
                </div>
                <div className="flex gap-2">
                    <CardTitle>
                        {formatPrice(price)}/{' '}
                        {t(
                            `landing.lemon_squeezy.interval.${
                                subscriptionPlan?.interval as
                                    | 'day'
                                    | 'week'
                                    | 'month'
                                    | 'year'
                            }`,
                        )}
                    </CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {/* If the description comes from Lemon Squeezy:
                 {description ? (                    
                    <div
                        dangerouslySetInnerHTML={{
                            // Ideally sanitize the description first.
                            __html: description,
                        }}
                    ></div>
                ) : null} */}

                {item.features.map((feature) => (
                    <div className="flex items-center gap-2" key={feature}>
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
                <CheckoutButton
                    plan={subscriptionPlan}
                    currentPlan={currentPlan}
                    isChangingPlans={isChangingPlans}
                />
            </CardFooter>
        </Card>
    );
}
