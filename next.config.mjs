import { withSentryConfig } from '@sentry/nextjs';
import nextra from 'nextra';

/** @type {import('next').NextConfig} */
let nextConfig = {};

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
});

// Wrap with Nextra for documentation support
nextConfig = withNextra(nextConfig);

// Check if the environment variables for Sentry are set. If they are, enable Sentry.
const sentryEnabled =
    process.env.SENTRY_ORG && process.env.SENTRY_PROJECT && process.env.SENTRY_DSN;
if (sentryEnabled) {
    nextConfig = withSentryConfig(
        nextConfig,
        {
            // For all available options, see:
            // https://github.com/getsentry/sentry-webpack-plugin#options

            // Suppresses source map uploading logs during build
            silent: true,
            org: `${process.env.SENTRY_ORG}`,
            project: `${process.env.SENTRY_PROJECT}`,
        },
        {
            // For all available options, see:
            // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

            // Upload a larger set of source maps for prettier stack traces (increases build time)
            widenClientFileUpload: true,

            // Transpiles SDK to be compatible with IE11 (increases bundle size)
            transpileClientSDK: true,

            // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
            // This can increase your server load as well as your hosting bill.
            // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
            // side errors will fail.
            // tunnelRoute: "/monitoring",

            // Hides source maps from generated client bundles
            hideSourceMaps: true,

            // Automatically tree-shake Sentry logger statements to reduce bundle size
            disableLogger: true,

            // Enables automatic instrumentation of Vercel Cron Monitors.
            // See the following for more information:
            // https://docs.sentry.io/product/crons/
            // https://vercel.com/docs/cron-jobs
            automaticVercelMonitors: true,
        },
    );
}

export default nextConfig;
