import {
    processWebhookEvent,
    storeWebhookEvent,
} from '@/libs/lemon-squeezy/actions';
import { webhookHasMeta } from '@/libs/lemon-squeezy/typeguards';
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

// Lemon Squeezt Webhook: process a subscription event
export async function POST(req: Request) {
    try {
        if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
            return new Response(
                'Lemon Squeezy Webhook Secret not set in .env',
                {
                    status: 500,
                },
            );
        }
        const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

        // Check the request signature
        const rawBody = await req.text();
        const hmac = crypto.createHmac('sha256', secret);
        const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
        const signature = Buffer.from(
            req.headers.get('X-Signature') || '',
            'utf8',
        );

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error('Invalid signature.');
        }

        // Parse the Lemon Squeezy event
        const data = JSON.parse(rawBody) as unknown;

        // Type guard to check if the object has a 'meta' property.
        if (webhookHasMeta(data)) {
            const webhookEvent = await storeWebhookEvent(
                data.meta.event_name,
                data,
            );

            await processWebhookEvent(webhookEvent);

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Data invalid' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
