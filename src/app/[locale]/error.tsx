'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    const t = useI18n();

    useEffect(() => {
        // Log the error to an error reporting service, e.g. Sentry
        console.error('Error', error);
        Sentry?.captureException(error);
    }, [error]);

    return (
        <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">
                    <div className="grid gap-2">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {t('error.title')}
                        </h1>
                    </div>
                    <div className="grid gap-4">
                        <Button type="submit" className="w-fit">
                            {t('not_found.back_to_home')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/placeholder.svg" // Replace with your Error image
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
