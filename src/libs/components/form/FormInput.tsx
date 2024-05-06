'use client';

import { Input } from '@/libs/ui/input';
import { Label } from '@/libs/ui/label';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export function FormInput({
    formInputName,
    label,
    inputProps,
}: {
    formInputName: string;
    label: string | ReactNode;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
    const { control } = useFormContext();

    return (
        <div className="grid gap-3">
            <Label htmlFor={formInputName}>{label}</Label>
            <Controller
                name={formInputName}
                control={control}
                render={({ field }) => (
                    <Input
                        id={formInputName}
                        className="w-full"
                        {...inputProps}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    );
}
