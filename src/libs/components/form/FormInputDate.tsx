'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import { Calendar } from '@/libs/ui/calendar';
import { Label } from '@/libs/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/libs/ui/popover';
import { cn, formatDateShort } from '@/libs/utils';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

export function FormInputDate({
    formInputName,
    label,
    calendarProps,
}: {
    formInputName: string;
    label: string;
    calendarProps?: any; // fixme: should be React.ComponentProps<typeof Calendar>
}) {
    const t = useI18n();
    const { control } = useFormContext();

    return (
        <div className="grid gap-3">
            <Label htmlFor={formInputName}>{label}</Label>
            <Controller
                name={formInputName}
                control={control}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                {field.value ? (
                                    formatDateShort(field.value || '')
                                ) : (
                                    <span>
                                        {t('literals.pick_a_date')}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="flex w-auto flex-col space-y-2 p-2"
                        >
                            <Calendar
                                numberOfMonths={1}
                                mode="single"
                                {...calendarProps}
                                defaultMonth={moment(field.value).toDate()}
                                selected={moment(field.value).toDate()}
                                onSelect={(date) => {
                                    field.onChange(date);
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
        </div>
    );
}
