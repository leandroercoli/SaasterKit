import { CURRENCIES, getSignedInUser } from '@/libs/database';
import { CurrencyEnum, User } from '@prisma/client';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

// Get the display currency from the cookie or the signed in user. Optionally pass the signed in user to avoid fetching it again.
export async function getDisplayCurrency(signedInUser?: User | null) {
    let displayCurrency = String(
        getCookie('currency', {
            cookies,
        }),
    ) as CurrencyEnum;
    if (CURRENCIES.indexOf(displayCurrency) === -1) {
        const user = signedInUser || (await getSignedInUser());
        displayCurrency = user?.defaultCurrency || 'USD';
    }

    return displayCurrency;
}
