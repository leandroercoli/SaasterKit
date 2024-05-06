import { notFound } from 'next/navigation';

// This page will be rendered when the user navigates to a page that doesn't exist. This is needed to correctly route to the custom NotFound page when using i18n routing.
export default function CatchAllPage() {
    notFound();
}
