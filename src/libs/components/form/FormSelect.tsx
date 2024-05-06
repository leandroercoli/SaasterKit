'use client';

import { Label } from '@/libs/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/libs/ui/select';
import { Controller, useFormContext } from 'react-hook-form';

export function FormSelect({
    formSelectName,
    label,
    placeholder,
    selectItems,
    renderSelectItem,
}: {
    formSelectName: string;
    label: string;
    placeholder: string;
    selectItems: string[];
    renderSelectItem?: (item: string) => React.ReactNode;
}) {
    const { control } = useFormContext();

    return (
        <div className="grid gap-3">
            <Label htmlFor={formSelectName}>{label}</Label>
            <Controller
                name={formSelectName}
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        aria-label={label}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {selectItems.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {renderSelectItem?.(item) || item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
}
