'use client';

import { useChangeLocale, useCurrentLocale } from '@/libs/locales/client';
import { LOCALES } from '@/libs/locales/locale-middleware';
import { Button } from '@/libs/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/libs/ui/dropdown-menu';

export function LocaleSelector() {
    const changeLocale = useChangeLocale({ preserveSearchParams: true });
    const locale = useCurrentLocale();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className=""> {locale.toUpperCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {LOCALES.map((c) => (
                    <DropdownMenuCheckboxItem
                        key={c}
                        checked={c === locale}
                        onClick={() => changeLocale(c)}
                    >
                        {c.toUpperCase()}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
