import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from '@/libs/ui/sheet';
import { formatDateFull } from '@/libs/utils';
import { TodoItem } from '@prisma/client';
import { useState } from 'react';

import { TodoItemFormSheet } from './todo-item-form-sheet/TodoItemFormSheet';

export function TodoItemSheet({
    todoItem,
    onClose,
}: {
    todoItem: TodoItem;
    onClose: () => void;
}) {
    const t = useI18n();

    // Edit the todo item sheet state
    const [isEditing, setIsEditing] = useState(false);

    if (!todoItem) return null;

    return (
        <>
            {isEditing && (
                <TodoItemFormSheet
                    todoItem={todoItem}
                    onClose={() => {
                        setIsEditing(false);
                        onClose();
                    }}
                />
            )}
            <Sheet
                open
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        onClose();
                    }
                }}
            >
                <SheetContent className="overflow-y-auto w-full">
                    <SheetHeader>
                        <SheetTitle className="text-left">
                            {todoItem.title}
                        </SheetTitle>
                    </SheetHeader>
                    <ul className="grid gap-2 py-4 text-sm">
                        <li className="grid gap-1">
                            <span className="text-muted-foreground">
                                {t('dashboard.todo.item.description')}
                            </span>
                            <span>{todoItem.description}</span>
                        </li>
                        <li className="grid gap-1">
                            <span className="text-muted-foreground">
                                {t('dashboard.todo.item.status')}
                            </span>
                            <span>
                                {todoItem.done
                                    ? t('dashboard.todo.item.done')
                                    : t('dashboard.todo.item.pending')}
                            </span>
                        </li>
                        <li className="grid gap-1">
                            <span className="text-muted-foreground">
                                {t('dashboard.todo.item.due_date')}
                            </span>
                            <span>{formatDateFull(todoItem.dueDate)}</span>
                        </li>
                        <li className="grid gap-1">
                            <span className="text-muted-foreground">
                                {t('dashboard.todo.item.created_at')}
                            </span>
                            <span>{formatDateFull(todoItem.createdAt)}</span>
                        </li>
                    </ul>
                    <Button
                        variant="secondary"
                        onClick={() => setIsEditing(true)}
                    >
                        {t('dashboard.todo.form.edit')}
                    </Button>
                </SheetContent>
            </Sheet>
        </>
    );
}
