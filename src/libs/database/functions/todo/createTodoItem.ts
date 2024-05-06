import { TodoItem } from '@prisma/client';

import { prisma } from '../../prisma-client';
import { checkParamsAndGetUserOrThrow } from '../../utils';

type CreateTodoItemQuery = Partial<TodoItem>;

// Create a todo item for the signed in user
export async function createTodoItem(params?: CreateTodoItemQuery) {
    const signedInUser = await checkParamsAndGetUserOrThrow(params, [
        'title',
        'category',
        'dueDate',
    ]);

    // Todo item data
    const data = {
        userId: signedInUser!.id,
        title: params!.title!,
        description: params!.description,
        category: params!.category!,
        dueDate: new Date(params!.dueDate!),
        done: params!.done,
    };

    // Create the todo item
    const newTodoItem = await prisma.todoItem.create({
        data,
    });

    return newTodoItem;
}
