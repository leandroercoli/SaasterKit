'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Rocket } from 'lucide-react';
import Link from 'next/link';


export function LandingPageHero() {
    const t = useI18n();
    return (
        <div
            id="landing-hero"
            className="w-full min-h-screen py-28 max-w-[1600px] mx-auto px-8 grid grid-rows-[auto,1fr] lg:grid-rows-1 lg:grid-cols-2 items-center gap-8"
        >
            <div className="w-full h-fit my-auto flex flex-col justify-center gap-4 md:gap-8 group">
                <h1 className="text-5xl md:text-6xl !leading-tight">
                    {t('landing.hero.slash')}{' '}
                    <div className="relative inline-block">
                        <img
                            src="/images/brix/Line 7.svg"
                            className="absolute left-0 w-full -bottom-2 group-hover:scale-x-105 transition-all duration-500"
                            alt="slash"
                        />
                        {t('landing.hero.dev_time')},
                    </div>{' '}
                    <br />
                    {t('landing.hero.fast_track')}{' '}
                    <div className="relative inline-block">
                        <img
                            src="/images/brix/Line 3.svg"
                            className="absolute -bottom-6 w-full left-0 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500"
                            alt="slash"
                        />
                        {t('landing.hero.launch')}
                    </div>
                </h1>
                <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl">
                    {t('landing.hero.description')}{' '}
                    <strong>{t('landing.hero.business')}</strong>.
                </p>
                <div className="flex gap-8 flex-col w-full">
                    <div className="flex w-fit relative">
                        <Link href="#landing-pricing">
                            <Button size="lg" className="w-full md:w-60">
                                <Rocket className="h-5 w-5 mr-3" />
                                {t('landing.hero.get_started')}
                            </Button>
                        </Link>
                        <img
                            src="/images/brix/Arrow 2.svg"
                            className="h-28 md:h-40 rotate-[190deg] absolute left-[125%] bottom-0 -mb-[20%] transform group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-1 transition-all duration-500"
                            alt="slash"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-full h-12 flex justify-end items-start gap-4 transform group-hover:-translate-x-2 transition-all duration-500">
                    <img
                        src="/images/brix/Arrow 1.svg"
                        className="h-10 rotate-[150deg] group-hover:scale-110 group-hover:-translate-x-4 group-hover:translate-y-1 transition-all duration-500"
                        alt="slash"
                    />
                    <p className="text-xl md:text-2xl whitespace-nowrap font-medium text-muted-foreground">
                        {t('landing.hero.view_demo')}
                    </p>
                </div>
                <SignedIn>
                    <Link href="/dashboard">
                        <DemoCard />
                    </Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Link
                            href="#"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <DemoCard />
                        </Link>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    );
}

function DemoCard() {
    return (
        <Card className="w-full flex justify-center items-center overflow-hidden transform group-hover:scale-105 transition-all duration-500 cursor-pointer">
            <img
                src="/images/design-laptop.png" // Replace with your Demo image
                alt="demo"
                className="h-full w-full object-contain "
            />
        </Card>
    );
}
