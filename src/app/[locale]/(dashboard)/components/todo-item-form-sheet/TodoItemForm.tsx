'use client';

import { FormInputSwitch } from '@/libs/components';
import { FormInput } from '@/libs/components/form/FormInput';
import { FormInputDate } from '@/libs/components/form/FormInputDate';
import { FormSelect } from '@/libs/components/form/FormSelect';
import { TODO_ITEM_CATEGORIES } from '@/libs/database';
import { useI18n } from '@/libs/locales/client';
import { SheetFooter } from '@/libs/ui/sheet';
import { cn } from '@/libs/utils';
import { TodoItem, TodoItemCategoryEnum } from '@prisma/client';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';

import { TodoItemFormActions } from './TodoItemFormActions';

export type TodoItemFormValues = Partial<TodoItem>;

const DEFAULT_FORM_VALUES: TodoItemFormValues = {
    title: '',
    description: '',
    category: TodoItemCategoryEnum.UNSPECIFIED,
    dueDate: moment().toDate(),
    done: false,
};

// Form to create or edit a todo item
export function TodoItemForm({
    todoItem,
    onSaved,
}: {
    todoItem?: TodoItem | null;
    onSaved: () => void;
}) {
    const t = useI18n();

    const methods = useForm<TodoItemFormValues>({
        defaultValues: !todoItem
            ? DEFAULT_FORM_VALUES
            : {
                  title: todoItem.title,
                  description: todoItem.description,
                  done: todoItem.done,
                  category: todoItem.category as TodoItemCategoryEnum,
                  dueDate: todoItem.dueDate,
              },
    });

    return (
        <FormProvider {...methods}>
            <div className={cn('flex flex-col gap-4 py-4')}>
                <FormInput
                    formInputName="title"
                    label={t('dashboard.todo.item.title')}
                />
                <FormInput
                    formInputName="description"
                    label={t('dashboard.todo.item.description')}
                />
                <FormInputSwitch
                    formInputName="done"
                    label={t('dashboard.todo.item.status')}
                    onLabel={t('dashboard.todo.item.done')}
                    offLabel={t('dashboard.todo.item.pending')}
                />
                <FormInputDate
                    formInputName="dueDate"
                    label={t('dashboard.todo.item.due_date')}
                />
                <FormSelect
                    formSelectName="category"
                    label={t('dashboard.todo.item.category')}
                    placeholder={t('dashboard.todo.form.select_category')}
                    selectItems={TODO_ITEM_CATEGORIES}
                    renderSelectItem={(category) =>
                        t(
                            `dashboard.todo.categories.${
                                category as TodoItemCategoryEnum
                            }`,
                        )
                    }
                />
            </div>
            <SheetFooter>
                <TodoItemFormActions
                    onSaved={onSaved}
                    todoItemId={todoItem?.id}
                />
            </SheetFooter>
        </FormProvider>
    );
}
