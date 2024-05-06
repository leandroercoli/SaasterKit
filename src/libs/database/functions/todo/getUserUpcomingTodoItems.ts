import moment from 'moment';

import { prisma } from '../../prisma-client';
import { getSignedInUserOrThrow } from '../../utils';

// Get the user's upcoming todo items
export async function getUserUpcomingTodoItems() {
    const signedInUser = await getSignedInUserOrThrow();

    return await prisma.todoItem.findMany({
        take: 5, // Only get the first 5
        where: {
            userId: signedInUser!.id,
            dueDate: {
                gt: moment().endOf('day').toDate(), // Due date is greater than today
            },
        },
        orderBy: {
            dueDate: 'asc',
        },
    });
}
