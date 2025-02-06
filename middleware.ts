import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Skip all paths that should not be internationalized
        '/((?!_next|.*\\..*).*)',

        // Necessary for base path to work
        '/',
    ],
};
