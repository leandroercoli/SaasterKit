'use client';

import { useI18n } from '@/libs/locales/client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/libs/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Reusable component to delete an element through an alert dialog
export function DeleteElementWithAlertDialog({
    onClose,
    onDeleted,
    deleteUrl,
}: {
    onClose: () => void;
    onDeleted?: () => void; // Callback function to execute after the element is deleted
    deleteUrl: string; // URL to delete the element by ID
}) {
    const router = useRouter();
    const t = useI18n();

    // Labels
    const title = t('alert_dialog.delete_element.title');
    const description = t('alert_dialog.delete_element.description');
    const pending = t('alert_dialog.delete_element.pending');
    const success = t('alert_dialog.delete_element.success');
    const error = t('alert_dialog.delete_element.error');

    // on delete function
    const onDelete = async () => {
        await toast.promise(
            fetch(deleteUrl, {
                method: 'DELETE',
            }).then(async (res) => {
                if (!res.ok) {
                    throw new Error(error);
                }

                // Refresh the page
                router.refresh();
                onDeleted?.();
            }),
            {
                pending,
                success,
                error,
            },
        );
    };

    return (
        <AlertDialog
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose();
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {t('alert_dialog.cancel')}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        {t('alert_dialog.continue')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
