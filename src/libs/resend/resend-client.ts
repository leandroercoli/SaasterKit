import { Resend } from 'resend';

// Singleton pattern to avoid multiple instances of Resend
const resendClientSingleton = () => {
    // Create a new Resend instance with your API key
    return new Resend(process.env.RESEND_API_KEY);
};

declare global {
    // eslint-disable-next-line no-var
    var resend: undefined | ReturnType<typeof resendClientSingleton>;
}

export const resend = globalThis.resend ?? resendClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.resend = resend;
