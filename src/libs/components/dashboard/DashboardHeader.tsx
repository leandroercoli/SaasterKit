'use client';

import { cn } from '@/libs/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Atom, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, createElement } from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../ui/breadcrumb';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { DarkModeToggle } from '../DarkModeToggle';
import { GlobalCurrencySelector } from '../GlobalCurrencySelector';
import { LocaleSelector } from '../LocaleSelector';
import { SubscribeButton } from './SubscribeButton';
import { useSidenavRoutes } from './useSidenavRoutes';

// Sidenav routes base for the dashboard
const SIDENAV_ROUTES_BASE = '/dashboard';

export function DashboardHeader({
    breadcrumb = [], // Breadcrumb items
}: {
    breadcrumb?: Array<{
        label: string;
        href?: string;
    }>;
}) {
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
        <div className="flex items-center gap-4 h-full w-full">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="sm:max-w-xs flex flex-col h-full"
                >
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Atom className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">SaasterKit</span>
                        </Link>
                        {SIDENAV_ROUTES?.map(({ label, Icon, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className={cn(
                                    'group flex items-center gap-4 px-2.5 transition-colors hover:text-foreground',
                                    activeRoute?.href === href
                                        ? 'text-foreground'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {createElement(Icon, {
                                    className: 'h-5 w-5',
                                })}
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="flex-1" />
                    <nav className="flex gap-4">
                        <DarkModeToggle />
                        <LocaleSelector />
                    </nav>
                </SheetContent>
            </Sheet>
            {breadcrumb?.length > 0 && (
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {breadcrumb.map(({ label, href }, index) => (
                            <Fragment key={label + index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        {href ? (
                                            <Link href={href}>{label}</Link>
                                        ) : (
                                            <BreadcrumbPage>
                                                {label}
                                            </BreadcrumbPage>
                                        )}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < breadcrumb.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
            <div className="relative ml-auto flex-1 md:grow-0 flex justify-end gap-4">
                <GlobalCurrencySelector />
            </div>
            <SubscribeButton />
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
}
