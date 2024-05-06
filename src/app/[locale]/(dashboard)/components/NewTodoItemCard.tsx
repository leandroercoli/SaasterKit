'use client';

import { useI18n } from '@/libs/locales/client';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';

import { NewTodoItemButton } from './NewTodoItemButton';

export function NewTodoItemCard() {
    const t = useI18n();

    return (
        <Card x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
                <CardTitle>{t('dashboard.todo.cta_card.title')}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t('dashboard.todo.cta_card.description')}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <NewTodoItemButton />
            </CardFooter>
        </Card>
    );
}
