import { resend } from './resend-client';

// The email address that the email will be sent from - needs to be verified in Resend Dashboard
const RESEND_FROM = 'onboarding@resend.dev';

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    return await resend.emails.send({
        from: RESEND_FROM,
        to,
        subject,
        html,
    });
}
