import { auth } from '@clerk/nextjs';
import { UserResource } from '@clerk/types';

// Checks if the user is the author CLIENT-SIDE.
export const isUserAuthor = (user?: UserResource | null) => {
    return (
        user?.primaryEmailAddress?.emailAddress ===
        process.env['NEXT_PUBLIC_AUTHOR_EMAIL']
    );
};

// Checks if the user is the author SERVER-SIDE.
export const isUserAuthorServer = () => {
    const { sessionClaims } = auth();
    return (
        sessionClaims?.['primary_email_address'] ===
        process.env['NEXT_PUBLIC_AUTHOR_EMAIL']
    );
};

// Checks if the user is the author SERVER-SIDE and throws an error if it's not.
export const isUserAuthorServerOrThrow = async () => {
    const isAuthor = isUserAuthorServer();
    if (!isAuthor) {
        throw new Error('Unauthorized');
    }
    return isAuthor;
};
