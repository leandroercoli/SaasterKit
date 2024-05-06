import { TodoItem } from '@prisma/client';

import { prisma } from '../../prisma-client';
import { checkParamsAndGetUserOrThrow } from '../../utils';

type UpdateTodoItemQuery = Partial<TodoItem>;

// Update a todo item by id for the signed in user
export async function updateTodoItem(params?: UpdateTodoItemQuery) {
    const signedInUser = await checkParamsAndGetUserOrThrow(params, ['id']);

    // Todo item data to update
    const data = {
        title: params!.title,
        description: params!.description,
        category: params!.category,
        dueDate: params!.dueDate ? new Date(params!.dueDate) : undefined,
        done: params!.done,
    };

    // Update the todo item
    const updatedTodoItem = await prisma.todoItem.update({
        where: {
            userId: signedInUser!.id, // Only the signed in user can update their own todo items
            id: params!.id,
        },
        data,
    });

    return updatedTodoItem;
}
