import { DashboardSidebar } from '@/libs/components/dashboard/DashboardSidebar';
import { getSignedInUser } from '@/libs/database';
import { SignedInUserProvider } from '@/libs/providers';

// Signed in user provider layout
export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const signedInUser = await getSignedInUser();

    return (
        <SignedInUserProvider signedInUser={signedInUser}>
            <div className="flex min-h-screen w-full flex-col bg-muted">
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                    <DashboardSidebar />
                </aside>
                <div className="flex flex-col sm:py-4 sm:pl-14">{children}</div>
            </div>
        </SignedInUserProvider>
    );
}
