import { isUserAuthorServerOrThrow } from '@/libs/admin';
import { sendEmail } from '@/libs/resend/sendEmail';
import { NextResponse } from 'next/server';

const AUTHOR_EMAIL = process.env.NEXT_PUBLIC_AUTHOR_EMAIL;

// Send an email with Resend API
export async function POST(req: Request, res: Response) {
    try {
        // Only allow the author to perform this action
        isUserAuthorServerOrThrow();

        const { data, error } = await sendEmail({
            to: `${AUTHOR_EMAIL}`,
            subject: 'Hello World',
            html: '<p>Congrats on sending an <strong>email</strong>!</p>',
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}