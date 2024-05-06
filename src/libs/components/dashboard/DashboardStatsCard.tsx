'use client';

import { Badge } from '@/libs/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { Progress } from '@/libs/ui/progress';
import { cn } from '@/libs/utils';
import { isNumber, isString } from 'lodash';

export function DashboardStatsCard({
    title,
    value,
    description,
    badge,
    progress,
    className,
    variant,
}: {
    title: string;
    value: string;
    description?: string | React.ReactNode;
    badge: string;
    progress?: number;
    className?: string;
    variant?: 'default' | 'danger';
}) {
    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader className="pb-2">
                <div className="flex flex-row items-center justify-between">
                    <CardDescription>{title}</CardDescription>
                    <Badge variant="outline" className="text-muted-foreground">
                        {badge}
                    </Badge>
                </div>
                <CardTitle
                    className={cn(
                        'text-4xl',
                        variant === 'danger' && 'text-red-500',
                    )}
                >
                    {value}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isString(description) ? (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                ) : (
                    description
                )}
            </CardContent>
            {isNumber(progress) && (
                <CardFooter className='flex-1 flex flex-col justify-end'>
                    <Progress value={progress} aria-label="progress" />
                </CardFooter>
            )}
        </Card>
    );
}
