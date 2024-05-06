import { prisma } from '../../prisma-client';
import { checkParamsAndGetUserOrThrow } from '../../utils';

type DeleteTodoItemQuery = {
    id: string;
};

// Delete a todo item by id for the signed in user
export async function deleteTodoItem(params?: DeleteTodoItemQuery) {
    const signedInUser = await checkParamsAndGetUserOrThrow(params, ['id']);

    // Delete the todo item by id for the signed in user
    const deletedTodoItem = await prisma.todoItem.delete({
        where: {
            userId: signedInUser!.id, // Only the signed in user can delete their own todo items
            id: params!.id,
        },
    });

    return deletedTodoItem;
}
