import { deleteTodoItem, updateTodoItem } from '@/libs/database/functions/todo';
import { NextResponse } from 'next/server';

// Update a todo item by id for the signed in user
export async function PUT(
    req: Request,
    { params }: { params: { id: string } },
) {
    try {
        // Todo item ID to update
        const id = params.id;

        const body = await req.json();

        // Update the todo item
        const queryResponse = await updateTodoItem({
            id: id,
            ...body,
        });
        return NextResponse.json(queryResponse);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// Delete a todo item by id for the signed in user
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
) {
    try {
        const id = params.id;

        const queryResponse = await deleteTodoItem({ id });
        return NextResponse.json(queryResponse);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
