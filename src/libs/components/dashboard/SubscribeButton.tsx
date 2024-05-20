'use client';

import { useI18n } from '@/libs/locales/client';
import { CreditCard } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../../ui/button';

export function SubscribeButton() {
    const t = useI18n();

    return (
        <Link href="/dashboard/my-account">
            <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                {t('dashboard.nav.subscribe_now')}
            </Button>
        </Link>
    );
}
