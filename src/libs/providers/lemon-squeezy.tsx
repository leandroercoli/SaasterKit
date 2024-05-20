'use client'
import Script from 'next/script';

export const LemonSqueezy = () => {
    return (
        <>
            <Script
                src="https://app.lemonsqueezy.com/js/lemon.js"
                strategy="afterInteractive"
                onLoad={() => {
                    window.createLemonSqueezy();
                }}
            />
        </>
    );
};
