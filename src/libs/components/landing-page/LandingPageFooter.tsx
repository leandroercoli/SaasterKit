'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

export function LandingPageFooter() {
    const t = useI18n();

    return (
        <footer
            id="landing-footer"
            className="flex items-center gap-4 border-t bg-background px-4 md:px-6 py-12 md:py-20 "
        >
            <Link
                href="#"
                className="flex items-center gap-4 font-semibold text-base"
            >
                <img src="/favicon.ico" className="h-10 w-10 rounded-sm" alt="favicon" />
                <span>SaasterKit</span>
            </Link>
            <div className="flex-1" />
            <li className="hidden sm:flex font-medium flex-row items-center gap-5 text-sm lg:gap-6">
                <a
                    href="#landing-features"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.features')}
                </a>
                <a
                    href="#landing-pricing"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.pricing')}
                </a>
                <a
                    href="#landing-faq"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.faq')}
                </a>
                <a
                    href="/docs"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.docs')}
                </a>
            </li>
            <li className="font-medium flex flex-row items-center gap-2">
                <Link
                    href="https://github.com/leandroercoli/SaasterKit"
                    target="_blank"
                >
                    <Button variant="outline" size="icon">
                        <GitHubLogoIcon className="h-4 w-4" />
                    </Button>
                </Link>
                <Link href="#" target="_blank">
                    <Button variant="outline" size="icon">
                        <MailIcon className="h-4 w-4" />
                    </Button>
                </Link>
            </li>
        </footer>
    );
}
