import { prisma } from '../../prisma-client';
import { getSignedInUserOrThrow } from '../../utils';

type GetTodoItemsQuery = {
    take?: number;
    skip?: number;
    from?: string;
    to?: string;
    done?: boolean;
};

// Get todo items for the signed in user between the specified dates and status
export async function getTodoItems(params?: GetTodoItemsQuery) {
    const signedInUser = await getSignedInUserOrThrow();

    const where = {
        ...(params?.from && params?.to
            ? {
                  createdAt: {
                      gte: new Date(params.from),
                      lte: new Date(params.to),
                  },
              }
            : {}),
        ...(params?.done ? { done: params.done } : {}),
    };

    return await prisma.todoItem.findMany({
        where: {
            ...where,
            userId: signedInUser!.id,
        },
        take: params?.take,
        skip: params?.skip,
        orderBy: {
            dueDate: 'desc',
        },
    });
}
