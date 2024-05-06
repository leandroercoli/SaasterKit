'use client';

import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Toaster } from '../ui/toaster';

// shadcn/radix-ui and react-toastify Toast provider
export function ToastProvider() {
    const theme = useTheme();
    return (
        <>
            <ToastContainer
                theme={theme.theme === 'dark' ? 'dark' : 'light'}
                newestOnTop
                position="bottom-right"
                pauseOnFocusLoss={false}
            />
            <Toaster />
        </>
    );
}
