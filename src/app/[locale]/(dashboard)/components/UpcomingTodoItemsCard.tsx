'use client';

import { useI18n } from '@/libs/locales/client';
import { Badge } from '@/libs/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { formatDateFromNow } from '@/libs/utils';
import { TodoItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TodoItemSheet } from './TodoItemSheet';

export function UpcomingTodoItemsCard({
    upcomingTodoItems,
}: {
    upcomingTodoItems: TodoItem[];
}) {
    const router = useRouter();
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
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader className="grid gap-2">
                    <CardTitle>{t('dashboard.todo.upcoming_title')}</CardTitle>
                    <CardDescription>
                        {t('dashboard.todo.upcoming_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-0">
                    {
                        // If there are no upcoming todo items
                        !upcomingTodoItems.length ? (
                            <p className="text-muted-foreground text-center py-4">
                                {t('dashboard.todo.no_todo_items')}
                            </p>
                        ) : (
                            <>
                                {upcomingTodoItems.map((item) => (
                                    <div
                                        className={
                                            'flex items-center gap-4 hover:bg-muted/50 py-4 px-2 cursor-pointer'
                                        }
                                        key={item.id}
                                        onClick={() =>
                                            setSelectedTodoItem(item)
                                        }
                                    >
                                        <div className="grid gap-1">
                                            <div className="flex gap-2">
                                                <span className="font-medium text-sm">
                                                    {item.title}
                                                </span>
                                            </div>

                                            <span className="text-muted-foreground text-sm">
                                                {formatDateFromNow(
                                                    item.dueDate,
                                                )}
                                            </span>
                                        </div>
                                        <div className="grid gap-1 ml-auto">
                                            <Badge
                                                className="whitespace-nowrap w-fit"
                                                variant={
                                                    item.done
                                                        ? 'secondary'
                                                        : 'default'
                                                }
                                            >
                                                {item.done
                                                    ? t(
                                                          'dashboard.todo.item.done',
                                                      )
                                                    : t(
                                                          'dashboard.todo.item.pending',
                                                      )}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    }
                </CardContent>
            </Card>
        </>
    );
}
