import { createTodoItem } from '@/libs/database';
import { NextResponse } from 'next/server';

// Create a new todo item for the signed in user
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const queryResponse = await createTodoItem(body);
        return NextResponse.json(queryResponse);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
