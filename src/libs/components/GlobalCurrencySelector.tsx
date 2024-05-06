'use client';

import { useDisplayCurrency } from '@/libs/cookies/currency/useDisplayCurrency';
import { CURRENCIES } from '@/libs/database';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/libs/ui/select';

// Global currency selector. Allows the user to change the currency displayed in the app. Saves the currency in a cookie.
export function GlobalCurrencySelector() {
    const { displayCurrency, setDisplayCurrency } = useDisplayCurrency();

    return (
        <Select
            defaultValue={displayCurrency}
            onValueChange={setDisplayCurrency}
        >
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
                {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                        {c}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
