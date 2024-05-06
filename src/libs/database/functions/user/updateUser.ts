import { User } from '@prisma/client';

import { prisma } from '../../prisma-client';
import { getSignedInUserOrThrow } from '../../utils';

type UpdateUserQuery = Partial<User>;

export async function updateUser(params?: UpdateUserQuery) {
    // Only the signed in user can update their own data
    const signedInUser = await getSignedInUserOrThrow();

    // Update the user
    const user = await prisma.user.update({
        where: {
            id: signedInUser!.id,
        },
        data: {
            defaultCurrency: params?.defaultCurrency,
        },
    });

    return user;
}
