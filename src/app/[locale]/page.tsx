import {
    LandingPageFAQ,
    LandingPageFeatures,
    LandingPageFooter,
    LandingPageHeader,
    LandingPageHero,
    LandingPagePricing,
    LandingPageWaitlist,
} from '@/libs/components/landing-page';

export default function Page() {
    return (
        <div className="flex flex-col">
            <LandingPageHeader />
            <div className="-mt-8">
                <LandingPageHero />
            </div>
            <div className="flex flex-col gap-[15vh]">
                <div className="bg-muted py-16">
                    <LandingPageFeatures />
                </div>
                <LandingPagePricing />
                <div className="bg-muted py-16">
                    <LandingPageFAQ />
                </div>
                <LandingPageWaitlist />
                <LandingPageFooter />
            </div>
        </div>
    );
}
