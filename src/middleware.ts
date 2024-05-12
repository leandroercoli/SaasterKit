import { authMiddleware } from '@clerk/nextjs';

import { localeMiddleware } from './libs/locales/locale-middleware';

// Clerk auth middleware
export default authMiddleware({
    // Execute next-intl middleware before Clerk's auth middleware
    beforeAuth: (req) => {
        // Only execute the locale middleware if the request is for a page (not an API route)
        if (req.url.match(/\/(api|trpc)(.*)/)) {
            return;
        }

        // Only execute the locale middleware if the request is not for the docs
        if (req.url.match(/\/docs(.*)/)) {
            return;
        }

        // Execute the locale middleware
        return localeMiddleware(req);
    },

    // Routes that can be accessed while signed out - everything except /dashboard
    publicRoutes: ['((?!^/dashboard).*)'],
    // Routes that can always be accessed, and have
    // no authentication information
    ignoredRoutes: [],
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
