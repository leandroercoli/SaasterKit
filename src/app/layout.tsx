import {
    GoogleAnalytics,
    LemonSqueezy,
    ToastProvider,
    TooltipProviderComponent,
} from '@/libs/providers';
import { ThemeProvider } from '@/libs/providers/theme-provider';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

import '../globals.css';
import Loading from './loading';

// Load the fonts
const lato = Lato({
    subsets: ['latin'],
    variable: '--font-lato',
    display: 'swap',
    weight: ['300', '400', '700'],
});

// Metadata for the app
export const metadata: Metadata = {
    title: 'SaasterKit',
    description: 'A Next.js Boilerplate Kit for SaaS apps',
    keywords: [
        'nextjs',
        'saas',
        'boilerplate',
        'kit',
        'starter',
        'template',
        'prisma',
        'postgresql',
        'supabase',
        'clerk',
        'resend',
        'shadcn',
        'tailwindcss',
        'typescript',
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            style={{ scrollBehavior: 'smooth' }}
            className={`${lato.variable}`}
        >
            <TooltipProviderComponent>
                <ClerkProvider>
                    <body className="w-screen min-h-screen flex bg-background text-foreground">
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <ClerkLoading>
                                <Loading />
                            </ClerkLoading>
                            <ClerkLoaded>{children}</ClerkLoaded>
                            <ToastProvider />
                            <Analytics />
                            <GoogleAnalytics />
                            <LemonSqueezy />
                        </ThemeProvider>
                    </body>
                </ClerkProvider>
            </TooltipProviderComponent>
        </html>
    );
}
