'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { useState } from 'react';

import { TodoItemFormSheet } from './todo-item-form-sheet/TodoItemFormSheet';

// CTA button to create a new todo item on a sheet component
export function NewTodoItemButton() {
    const t = useI18n();

    // New bill state for the sheet
    const [newTodoItemOpen, setNewTodoItemOpen] = useState<boolean>(false);

    return (
        <>
            {newTodoItemOpen && (
                <TodoItemFormSheet
                    onClose={() => {
                        setNewTodoItemOpen(false);
                    }}
                />
            )}
            <Button
                size="sm"
                className="gap-2"
                onClick={() => {
                    setNewTodoItemOpen(true);
                }}
            >
                {t('dashboard.todo.cta_card.new')}
            </Button>
        </>
    );
}
