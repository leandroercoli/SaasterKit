import { CURRENCIES } from '@/libs/database';
import { updateUser } from '@/libs/database/functions/user';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// User update schema
const userUpdateSchema = z.object({
    defaultCurrency: z.enum([CURRENCIES[0], ...CURRENCIES.slice(1)]).optional(),
});

// Update the signed in user - we dont need the user id, as it will be fetched from the session
export async function PUT(req: Request) {
    try {
        const body = await req.json();

        // Validate the request body
        const userData = userUpdateSchema.parse(body);

        // Update the user
        const queryResponse = await updateUser(userData);

        return NextResponse.json(queryResponse);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
