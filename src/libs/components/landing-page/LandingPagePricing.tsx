import { prisma } from '@/libs/database';
import { syncPlans } from '@/libs/lemon-squeezy/actions';
import { getI18n } from '@/libs/locales/server';
import { LsSubscriptionPlan } from '@prisma/client';

import { Plan } from '../lemon-squeezy/Plan';

export async function LandingPagePricing() {
    const t = await getI18n();

    // Get all plans from the database.
    let allPlans: LsSubscriptionPlan[] =
        await prisma.lsSubscriptionPlan.findMany();

    // If there are no plans in the database, sync them from Lemon Squeezy.
    // You might want to add logic to sync plans periodically or a webhook handler.
    if (!allPlans.length) {
        allPlans = await syncPlans();
    }

    if (!allPlans.length) {
        return <p>No plans available.</p>;
    }

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
                {allPlans.map((item, index) => (
                    <Plan key={index} subscriptionPlan={item} />
                ))}
            </div>
        </div>
    );
}
