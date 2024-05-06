'use client';

import { ElementsTable } from '@/libs/components/ElementsTable';
import { useI18n } from '@/libs/locales/client';
import { Badge } from '@/libs/ui/badge';
import { formatDateFromNow } from '@/libs/utils';
import { TodoItem, TodoItemCategoryEnum } from '@prisma/client';
import { useState } from 'react';

import { TodoItemSheet } from './TodoItemSheet';

export function TodoItemsTable({ todoItems }: { todoItems: TodoItem[] }) {
    const t = useI18n();

    // Selected todo item from the list
    const [selectedTodoItem, setSelectedTodoItem] = useState<TodoItem | null>(
        null,
    );

    return (
        <>
            {selectedTodoItem && (
                <TodoItemSheet
                    todoItem={selectedTodoItem}
                    onClose={() => {
                        setSelectedTodoItem(null);
                    }}
                />
            )}
            <ElementsTable
                rows={todoItems}
                onSelectRow={(row) => setSelectedTodoItem?.(row as TodoItem)}
                selectedRow={selectedTodoItem}
                columns={[
                    {
                        title: t('dashboard.todo.item.item'),
                        render: (row: TodoItem) => (
                            <div className="grid gap-1">
                                <span className="font-semibold">
                                    {row.title}
                                </span>
                                <span className="line-clamp-2 text-sm">
                                    {row.description}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-sm">
                                        {formatDateFromNow(row.createdAt)}
                                    </span>
                                    <Badge
                                        className="whitespace-nowrap w-fit"
                                        variant="secondary"
                                    >
                                        {t(
                                            `dashboard.todo.categories.${
                                                row.category as TodoItemCategoryEnum
                                            }`,
                                        )}
                                    </Badge>
                                </div>
                            </div>
                        ),
                    },
                    {
                        title: t('dashboard.todo.item.status'),
                        render: (row: TodoItem) => (
                            <div className="grid gap-1">
                                <Badge
                                    className="whitespace-nowrap w-fit"
                                    variant={row.done ? 'secondary' : 'default'}
                                >
                                    {row.done
                                        ? t('dashboard.todo.item.done')
                                        : t('dashboard.todo.item.pending')}
                                </Badge>
                            </div>
                        ),
                    },
                ]}
            />
        </>
    );
}
