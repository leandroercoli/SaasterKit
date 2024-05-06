import { useI18n } from '@/libs/locales/client';
import { Badge } from '@/libs/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/libs/ui/sheet';
import { TodoItem } from '@prisma/client';

import { TodoItemForm } from './TodoItemForm';

// Sheet to create or edit a new todo item
export function TodoItemFormSheet({
    todoItem,
    onClose,
}: {
    todoItem?: TodoItem | null;
    onClose: () => void;
}) {
    const t = useI18n();

    return (
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
                    <SheetTitle>
                        {todoItem?.id
                            ? t('dashboard.todo.form.edit')
                            : t('dashboard.todo.form.new')}
                    </SheetTitle>
                    <SheetDescription>
                        {todoItem?.id
                            ? todoItem?.title
                            : t('dashboard.todo.form.new_description')}{' '}
                        {todoItem?.id ? (
                            <Badge
                                className="whitespace-nowrap w-fit"
                                variant="secondary"
                            >
                                {todoItem.done
                                    ? t('dashboard.todo.item.done')
                                    : t('dashboard.todo.item.pending')}
                            </Badge>
                        ) : null}
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <TodoItemForm onSaved={onClose} todoItem={todoItem} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
