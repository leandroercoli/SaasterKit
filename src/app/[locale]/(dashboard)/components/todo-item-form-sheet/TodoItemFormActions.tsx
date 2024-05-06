'use client';

import { DeleteElementWithAlertDialog } from '@/libs/components';
import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { cn } from '@/libs/utils';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mutate, useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';

import { TodoItemFormValues } from './TodoItemForm';

// Actions for the todo item form (save, discard, delete)
export function TodoItemFormActions({
    todoItemId,
    onSaved,
}: {
    todoItemId?: string;
    onSaved?: () => void;
}) {
    const router = useRouter();
    const t = useI18n();
    const { cache } = useSWRConfig();

    const {
        reset,
        watch,
        getValues,
        formState: { isDirty },
    } = useFormContext<TodoItemFormValues>();
    const [title] = watch(['title']);

    const canSave = !!title;

    const onSave = async () => {
        let formValues = getValues() as any;
        formValues.dueDate = moment(formValues.dueDate).toDate().toISOString();

        let id = todoItemId;
        const promise = id
            ? fetch(`/api/todo/${todoItemId}`, {
                  method: 'PUT',
                  body: JSON.stringify(formValues),
              })
            : fetch('/api/todo/new', {
                  method: 'POST',
                  body: JSON.stringify(formValues),
              });

        await toast.promise(
            promise.then(async (res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong.');
                }

                // Refresh the page
                reset();
                router.refresh();
                onSaved?.();

                // Invalidte the cache for the todo items table
                const keys = [...cache.keys()];
                const todoItemsKeys = keys.filter((key) =>
                    key.startsWith('/api/todo?'),
                ); // Get the keys for the todo items table
                todoItemsKeys.forEach((key) =>
                    mutate(unstable_serialize(() => key)),
                );
            }),
            {
                pending: t('alert_dialog.save_element.pending'),
                success: t('alert_dialog.save_element.success'),
                error: t('alert_dialog.save_element.error'),
            },
        );
    };

    // Delete todo item alert dialog state
    const [openDeleteTodoItemlDialog, setOpenDeleteTodoItemDialog] =
        useState(false);

    return (
        <>
            {todoItemId && openDeleteTodoItemlDialog && (
                <DeleteElementWithAlertDialog
                    onClose={() => {
                        setOpenDeleteTodoItemDialog(false);
                    }}
                    onDeleted={() => {
                        router.push('/dashboard/todo');
                    }}
                    deleteUrl={`/api/todo/${todoItemId}`}
                />
            )}

            <div className="w-full flex items-center justify-between gap-2 py-4">
                {todoItemId && (
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                            setOpenDeleteTodoItemDialog(true);
                        }}
                    >
                        {t('dashboard.todo.form.delete')}
                    </Button>
                )}
                <div className="flex-1 flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            reset();
                        }}
                        className={cn(!isDirty && 'opacity-30')}
                    >
                        {t('dashboard.todo.form.discard')}
                    </Button>
                    <Button size="sm" disabled={!canSave} onClick={onSave}>
                        {t('dashboard.todo.form.save')}
                    </Button>
                </div>
            </div>
        </>
    );
}
