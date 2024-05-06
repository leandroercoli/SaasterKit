'use client';

import { DarkModeToggle } from '@/libs/components';
import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/libs/ui/sheet';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';

import { LocaleSelector } from '../LocaleSelector';

export function LandingPageHeader() {
    const t = useI18n();

    return (
        <header
            id="landing-header"
            className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
        >
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="sm:max-w-xs flex flex-col h-full"
                >
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold text-base"
                        >
                            <img
                                src="/favicon.ico"
                                className="h-6 w-6 rounded-sm"
                                alt="favicon"
                            />
                            <span className="">SaasterKit</span>
                        </Link>
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
                    </nav>
                    <div className="flex-1" />
                    <div className="flex gap-4">
                        <DarkModeToggle />
                        <LocaleSelector />
                    </div>
                </SheetContent>
            </Sheet>
            <nav className="font-medium flex flex-row items-center gap-5 text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 font-semibold text-base"
                >
                    <img src="/favicon.ico" className="h-6 w-6 rounded-sm" alt="favicon" />
                    <span className="">SaasterKit</span>
                </Link>
                <a
                    href="#landing-features"
                    className="hidden sm:block text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.features')}
                </a>
                <a
                    href="#landing-pricing"
                    className="hidden sm:block text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.pricing')}
                </a>
                <a
                    href="#landing-faq"
                    className="hidden sm:block text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.faq')}
                </a>
                <a
                    href="/docs"
                    className="hidden sm:block text-muted-foreground transition-colors hover:text-foreground"
                >
                    {t('landing.nav.docs')}
                </a>
            </nav>
            <div className="flex-1" />
            <SignedIn>
                <Link href="/dashboard" className="flex mr-2">
                    <Button>{t('landing.nav.dashboard')}</Button>
                </Link>
            </SignedIn>
            <SignedOut>
                <SignInButton
                    mode="modal"
                >
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {t('landing.nav.sign_in_for_demo')}
                    </Link>
                </SignInButton>
            </SignedOut>
            <div className="hidden sm:flex gap-2">
                <DarkModeToggle />
                <LocaleSelector />
            </div>
        </header>
    );
}
