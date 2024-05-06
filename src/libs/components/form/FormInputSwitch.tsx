'use client';

import { Label } from '@/libs/ui/label';
import { Switch } from '@/libs/ui/switch';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export function FormInputSwitch({
    formInputName,
    label,
    onLabel,
    offLabel,
}: {
    formInputName: string;
    label: string | ReactNode;
    onLabel?: string;
    offLabel?: string;
}) {
    const { control } = useFormContext();

    return (
        <div className="flex justify-between items-center py-3">
            <Label htmlFor={formInputName}>{label}</Label>
            <Controller
                name={formInputName}
                control={control}
                render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="isActive">
                            {field.value ? onLabel : offLabel}
                        </Label>
                        <Switch
                            id="isActive"
                            checked={field.value}
                            onCheckedChange={(checked) =>
                                field.onChange(checked)
                            }
                        />
                    </div>
                )}
            />
        </div>
    );
}
