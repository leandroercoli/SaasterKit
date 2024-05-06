import { LocaleProvider } from '@/libs/providers';

// Locale provider layout
export default async function LocaleLayout({
    children,
    params: { locale = 'en' },
}: Readonly<{
    children: React.ReactNode;
    params: {
        locale: string;
    };
}>) {
    return (
        <LocaleProvider locale={locale}>
            <div className="w-full flex-1 flex flex-col z-0">{children}</div>
        </LocaleProvider>
    );
}
