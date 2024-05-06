'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';

import { cn } from '../utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export function DatePicker({
    defaultValue,
    value,
    onChange,
}: {
    defaultValue: Date;
    value?: Date;
    onChange?: (date?: Date) => void;
}) {
    const [date, setDate] = React.useState<Date | undefined>(defaultValue);

    const onSelectDate = (date?: Date) => {
        setDate(date);
        onChange?.(date);
    };

    useEffect(() => {
        setDate(value);
    }, [value]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full flex justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSelectDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
