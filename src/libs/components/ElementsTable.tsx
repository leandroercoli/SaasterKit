'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/libs/ui/table';

import { cn } from '../utils';

type ElementsTableColumn = {
    title: string;
    key?: string;
    render?: (row: any) => React.ReactNode;
    smHidden?: boolean; // Hide on small screens
};

type Row = {
    id: string;
    [key: string]: any;
};

// Reusable table component
export function ElementsTable({
    columns,
    rows,
    onSelectRow,
    selectedRow,
}: {
    columns: ElementsTableColumn[];
    rows: Row[];
    onSelectRow?: (row: Row) => void;
    selectedRow?: Row | null;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead
                            key={column.key}
                            className={cn(
                                column.smHidden ? 'hidden sm:table-cell' : '',
                            )}
                        >
                            {column.title}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        className={cn(
                            onSelectRow && 'cursor-pointer',
                            selectedRow?.id === row.id ? 'bg-accent' : '',
                        )}
                        onClick={() => onSelectRow?.(row)}
                    >
                        {
                            // Render each column
                            columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    className={cn(
                                        'font-medium align-top',
                                        column.smHidden
                                            ? 'hidden sm:table-cell'
                                            : '',
                                    )}
                                >
                                    {column.render
                                        ? column.render(row)
                                        : column.key
                                        ? row[column.key]
                                        : ''}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
