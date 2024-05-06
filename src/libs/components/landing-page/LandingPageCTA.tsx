'use client';

import { Button } from '@/libs/ui/button';

export function LandingPageCTA() {
    return (
        <div
            id="landing-cta"
            className="w-full max-w-7xl text-left mx-auto p-8 flex flex-col justify-center items-center gap-8"
        >
            <h2 className='text-center sm:text-4xl'>Fast-Track Your App to Market</h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-2xl">
                Start strong with pre-configured boilerplate code and focus on
                what really matters - <strong>your business</strong>.
            </p>
            <Button type="submit" className="w-60" size="lg">
                Get SaasterKit
            </Button>
        </div>
    );
}
