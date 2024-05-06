'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Page not found
export default function NotFound() {
    const router = useRouter();
    const t = useI18n();

    return (
        <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
            <div className="flex-1 flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {t('not_found.title')}
                        </h1>
                        <p className="text-balance text-muted-foreground">
                            {t('not_found.description')}
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={() => router.push('/')}
                        >
                            {t('not_found.back_to_home')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
