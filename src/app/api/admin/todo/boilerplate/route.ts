import { isUserAuthorServerOrThrow } from '@/libs/admin';
import { getSignedInUser, prisma } from '@/libs/database';
import { createTodoItem } from '@/libs/database/functions/todo/createTodoItem';
import { NextResponse } from 'next/server';

import { generateMockTodoItem } from './boilerplate.utils';

// Sets the boilerplate
export async function POST(req: Request, res: Response) {
    try {
        // Only allow the author to perform this action
        isUserAuthorServerOrThrow();

        // Create 50 boilerplate todo items
        const responses = [];
        for (let i = 0; i < 50; i++) {
            const airesponse = await createTodoItem(generateMockTodoItem());
            responses.push(airesponse);
        }

        return NextResponse.json({ responses });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

// Delete all boilerplate todo items
export async function DELETE(req: Request, res: Response) {
    try {
        // Only allow the author to perform this action
        isUserAuthorServerOrThrow();

        const signedInUser = await getSignedInUser();
        if (!signedInUser) throw new Error('User not signed in');

        // Delete all todo items for the signed in user (author)
        await prisma.todoItem.deleteMany({
            where: {
                userId: signedInUser.id,
            },
        });

        return NextResponse.json(true);
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
