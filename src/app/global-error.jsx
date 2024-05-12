'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }) {
    useEffect(() => {
        console.error('GlobalError', error);
        Sentry?.captureException(error);
    }, [error]);

    return (
        <html  suppressHydrationWarning>
            <body>
                <Error />
            </body>
        </html>
    );
}
