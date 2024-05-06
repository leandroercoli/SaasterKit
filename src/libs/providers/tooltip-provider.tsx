'use client';

import { TooltipProvider } from '../ui/tooltip';

// shadcn/radix-ui Tooltip provider
export function TooltipProviderComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <TooltipProvider>{children}</TooltipProvider>;
}
