'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { useI18n } from '../locales/client';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// Sets the theme based on the user's preference
export function DarkModeToggle() {
    const t = useI18n();
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t('theme.toggle_theme')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                    checked={theme === 'light'}
                    onClick={() => setTheme('light')}
                >
                    {t('theme.light')}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === 'dark'}
                    onClick={() => setTheme('dark')}
                >
                    {t('theme.dark')}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === 'system'}
                    onClick={() => setTheme('system')}
                >
                    {t('theme.system')}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
