import { CurrencyEnum, Prisma, TodoItemCategoryEnum } from '@prisma/client';

// ------------- Enums

export const TODO_ITEM_CATEGORIES: TodoItemCategoryEnum[] = [
    'WORK',
    'PERSONAL',
    'SHOPPING',
    'UNSPECIFIED',
] as const;

export const CURRENCIES: CurrencyEnum[] = ['USD', 'ARS'] as const;

// ------------- Composite types

export type UserWithTodoItems = Prisma.UserGetPayload<{
    include: {
        Todos: true;
    };
}>;

export type TodoItemWithUser = Prisma.TodoItemGetPayload<{
    include: {
        User: true;
    };
}>;
