'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { TodoItem } from '@prisma/client';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { TodoItemsTable } from './TodoItemsTable';

export function RecentTodoItemsCard({
    recentTodoItems,
}: {
    recentTodoItems: TodoItem[];
}) {
    const router = useRouter();
    const t = useI18n();

    return (
        <>
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>
                            {t('dashboard.todo.recent_title')}
                        </CardTitle>
                        <CardDescription>
                            {t('dashboard.todo.recent_description')}
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <Button
                            size="sm"
                            className="gap-2"
                            variant="secondary"
                            onClick={() => {
                                router.push('/dashboard/todo');
                            }}
                        >
                            {t('dashboard.todo.view_all')}
                            <ArrowUpRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {
                        // If there are no upcoming todo items
                        !recentTodoItems.length ? (
                            <p className="text-muted-foreground text-center py-4">
                                {t('dashboard.todo.no_todo_items')}
                            </p>
                        ) : (
                            <TodoItemsTable todoItems={recentTodoItems} />
                        )
                    }
                </CardContent>
            </Card>
        </>
    );
}
