'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { Input } from '@/libs/ui/input';
import { cn } from '@/libs/utils';
import { noop } from 'lodash';
import { useState } from 'react';

export function LandingPageWaitlist() {
    const t = useI18n();
    // Email state
    const [email, setEmail] = useState('');

    return (
        <div
            id="landing-waitlist"
            className="w-full max-w-5xl text-left mx-auto p-8 grid md:grid-cols-[2fr,1fr] items-center gap-12"
        >
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <h1 className="">{t('landing.waitlist.title')}</h1>
                    <p className="text-xl text-muted-foreground">
                        {t('landing.waitlist.description')}
                    </p>
                </div>

                <form onSubmit={noop}>
                    <div className="grid sm:grid-cols-[1fr,auto] gap-4 items-center">
                        <Input
                            type="email"
                            placeholder={t('landing.waitlist.form.email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                        <Button type="submit" className="sm:w-fit" size="sm">
                            {t('landing.waitlist.form.join_waitlist')}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="hidden md:flex w-full justify-center items-center">
                <img
                    src="/images/brix/Arrow 6.svg"
                    alt="Image"
                    className="h-40 object-contain rotate-[190deg] -scale-y-100"
                />
            </div>
        </div>
    );
}
