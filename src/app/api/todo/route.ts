import { getTodoItems } from '@/libs/database';
import { NextRequest, NextResponse } from 'next/server';

// Get all todo items for the signed in user from the database
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        // Get the page and skip from the URL search params
        const take = 10;
        const page = searchParams.get('page') || '1';
        const skip = page ? parseInt(page) * take : undefined;

        // Get the optional param status from the URL search params
        const status = searchParams.get('status');
        const done =
            status === 'done' ? true : status === 'pending' ? false : undefined;

        // Get the todo items
        const todoItems = await getTodoItems({
            skip,
            take,
            done,
        });
        return NextResponse.json(todoItems);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
