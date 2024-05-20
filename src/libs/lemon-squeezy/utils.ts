import { LsUserSubscription } from '@prisma/client';

export function formatPrice(priceInCents: string) {
    const price = parseFloat(priceInCents);
    const dollars = price / 100;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // Use minimumFractionDigits to handle cases like $59.00 -> $59
        minimumFractionDigits: dollars % 1 !== 0 ? 2 : 0,
    }).format(dollars);
}

export function isValidSubscription(status: LsUserSubscription['status']) {
    return (
        status !== 'cancelled' && status !== 'expired' && status !== 'unpaid'
    );
}
