'use client';

import { CurrencyEnum } from '@prisma/client';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CURRENCIES } from '../../database';
import { useSignedInUser } from '../../providers';

export function useDisplayCurrency() {
    const router = useRouter();

    // Get the preferred currency from the signed in user or the cookie
    const signedInUser = useSignedInUser();
    let defaultCurrency = String(getCookie('currency')) as CurrencyEnum;
    // If the currency is not supported or the cookie is corrupted, use the user's default currency
    if (CURRENCIES.indexOf(defaultCurrency) === -1)
        defaultCurrency = signedInUser?.defaultCurrency || 'USD';

    // Currency to display in the app
    const [currency, setCurrency] = useState<CurrencyEnum>(
        defaultCurrency as CurrencyEnum,
    );

    // On currency change, update the cookie
    const setDisplayCurrency = (value: CurrencyEnum) => {
        setCurrency(value);
        setCookie('currency', value, {
            maxAge: 60 * 60 * 24 * 365,
        });

        // Update the user's default currency if they are signed in
        if (signedInUser) {
            fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    defaultCurrency: value,
                }),
            });
        }

        router.refresh();
    };

    return {
        displayCurrency: currency,
        setDisplayCurrency,
    };
}
