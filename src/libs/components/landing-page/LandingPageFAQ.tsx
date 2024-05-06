'use client';

import { useI18n } from '@/libs/locales/client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/libs/ui/accordion';

export function LandingPageFAQ() {
    const t = useI18n();

    // FAQ content
    const content = [
        {
            title: t('landing.faq.content.0.title'),
            description: t('landing.faq.content.0.description'),
        },

        {
            title: t('landing.faq.content.1.title'),
            description: t('landing.faq.content.1.description'),
        },

        {
            title: t('landing.faq.content.2.title'),
            description: t('landing.faq.content.2.description'),
        },
        {
            title: t('landing.faq.content.3.title'),
            description: t('landing.faq.content.3.description'),
        },
        {
            title: t('landing.faq.content.4.title'),
            description: t('landing.faq.content.4.description'),
        },
    ];

    return (
        <div
            id="landing-faq"
            className="w-full max-w-5xl text-left mx-auto flex flex-col justify-center p-8 gap-8"
        >
            <h1 className="relative w-fit">
                <img
                    src="/images/brix/Circle 5.svg"
                    alt="Image"
                    className="h-20 lg:h-24 max-w-none absolute top-1/2 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2"
                />
                {t('landing.faq.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
                {t('landing.faq.description')}
            </p>
            <Accordion type="single" collapsible className="w-full">
                {content.map((item) => (
                    <AccordionItem value={item.title} key={item.title}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.description}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
