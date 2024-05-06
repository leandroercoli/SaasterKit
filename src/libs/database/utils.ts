import { auth } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';

import { prisma } from './prisma-client';

// Checks that the user is signed in and returns the user from the database that matches the Clerk user ID.
export async function getSignedInUser(include?: Prisma.UserInclude) {
    // Get the signed in user ID from Clerk
    const authdata = auth();
    const { userId } = authdata;
    if (!userId) return null;

    // There's a signed in user, but it might not be in the database yet.
    // Try a couple times to get the user from the database. This is a workaround for the race condition between the user signing up and creating the user in the database.
    let user = null;
    for (let i = 0; i < 10; i++) {
        user = await prisma.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            include,
        });

        if (user) break;

        // Delay a random amount of miliseconds to avoid multiple users being created with the same slug or clerkUserId
        await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 1000),
        );
    }

    return user;
}

// Checks that the user is signed in and returns the user from the database that matches the Clerk user ID, or throws an error if not.
export async function getSignedInUserOrThrow(include?: Prisma.UserInclude) {
    const user = await getSignedInUser(include);
    if (!user) throw new Error('User not signed in');

    return user;
}

// Checks that all the given parameters are defined, and throws an error if not.
export function checkParamsOrThrow(
    params?: Record<string, any>,
    paramsList: string[] = [],
) {
    paramsList.forEach((param) => {
        if (
            !params?.[param] &&
            params?.[param] !== false &&
            params?.[param] !== 0
        ) {
            throw new Error(`Missing parameter: ${param}`);
        }
    });
}

// Combines the checkParamsOrThrow and getSignedInUserOrThrow functions. Returns the signed in user.
export function checkParamsAndGetUserOrThrow(
    params?: Record<string, any>,
    paramsList: string[] = [],
) {
    checkParamsOrThrow(params, paramsList);
    return getSignedInUserOrThrow();
}
