import moment from 'moment';

import { prisma } from '../../prisma-client';
import { getSignedInUserOrThrow } from '../../utils';

// Get the user's recent todo items
export async function getUserRecentTodoItems() {
    const signedInUser = await getSignedInUserOrThrow();

    return await prisma.todoItem.findMany({
        take: 5, // Only get the first 5
        where: {
            userId: signedInUser!.id,
            dueDate: {
                lte: moment().endOf('day').toDate(), // Due date is less than or equal to today
            },
        },
        orderBy: {
            dueDate: 'desc',
        },
    });
}
