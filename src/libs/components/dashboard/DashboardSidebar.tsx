'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/libs/ui/tooltip';
import { cn } from '@/libs/utils';
import { Atom } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createElement } from 'react';

import { DarkModeToggle } from '../DarkModeToggle';
import { LocaleSelector } from '../LocaleSelector';
import { useSidenavRoutes } from './useSidenavRoutes';

// Sidenav routes base for the dashboard
const SIDENAV_ROUTES_BASE = '/dashboard';

export function DashboardSidebar() {
    // Get localised sidenav routes
    const SIDENAV_ROUTES = useSidenavRoutes();

    // Get the active route based on the current pathname
    const pathname = usePathname();
    const activeRoute = SIDENAV_ROUTES?.find(
        ({ href }) =>
            href === pathname ||
            (href !== SIDENAV_ROUTES_BASE && pathname?.includes(href)),
    );

    return (
        <div className="flex-col flex h-full">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Atom className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">SaasterKit</span>
                </Link>
                {SIDENAV_ROUTES?.map(({ label, Icon, href }) => (
                    <Tooltip key={href}>
                        <TooltipTrigger asChild>
                            <Link
                                href={href}
                                className={cn(
                                    'group flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                                    activeRoute?.href === href
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {createElement(Icon, {
                                    className: 'h-5 w-5',
                                })}
                                <span className="sr-only">{label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{label}</TooltipContent>
                    </Tooltip>
                ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <LocaleSelector />
                <DarkModeToggle />
            </nav>
        </div>
    );
}
