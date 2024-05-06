'use client';

import { DashboardStatsCard, Loading } from '@/libs/components';
import { useDisplayCurrency } from '@/libs/cookies/currency/useDisplayCurrency';
import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/libs/ui/tooltip';
import { cn, fetcher, formatDateShortDay } from '@/libs/utils';
import { TodoItem } from '@prisma/client';
import { Loader } from 'lucide-react';
import moment from 'moment';
import { useCallback, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import { NewTodoItemCard } from '../../../components/NewTodoItemCard';
import { TodoItemsTable } from '../../../components/TodoItemsTable';
import { LineChartCard } from '../../../components/charts/LineChartCard';

const startOfMonth = moment().startOf('month');
const endOfMOnth = moment().endOf('month');

export function TodoPageView() {
    const t = useI18n();

    const { displayCurrency } = useDisplayCurrency();

    // Tab state
    const [selectedTab, setSelectedTab] = useState<'all' | 'done' | 'pending'>(
        'all',
    );

    // Get todo items from the database
    const getKey = useCallback(
        (pageIndex: number, previousPageData: TodoItem[]) => {
            if (previousPageData && !previousPageData.length) return null; // reached the end
            return `/api/todo?page=${pageIndex}${
                selectedTab === 'done'
                    ? '&status=done'
                    : selectedTab === 'pending'
                    ? '&status=pending'
                    : ''
            }`; // SWR key
        },
        [selectedTab],
    );

    // Get todo items from the database
    const {
        data = [],
        size,
        setSize,
        isLoading,
        isValidating,
    } = useSWRInfinite(getKey, fetcher, {
        initialSize: 1,
        revalidateOnFocus: false,
    });

    // Check if the end of the list has been reached
    const reachedEnd = data[data.length - 1]?.length === 0;
    const searchResults = data.flat();

    return (
        <>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-3">
                    <NewTodoItemCard />

                    <DashboardStatsCard
                        title={t('dashboard.todo.stats.total')}
                        value="$123"
                        description={t('dashboard.todo.stats.items_from_to', {
                            from: formatDateShortDay(startOfMonth.toDate()),
                            to: formatDateShortDay(endOfMOnth.toDate()),
                        })}
                        badge={displayCurrency}
                        progress={65}
                    />
                    <LineChartCard />
                </div>

                <Tabs
                    defaultValue="all"
                    onValueChange={(value) =>
                        setSelectedTab(value as 'all' | 'done' | 'pending')
                    }
                >
                    <div className="w-full flex justify-between items-center gap-4">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">
                                    {t('literals.all')}
                                </TabsTrigger>
                                <TabsTrigger value="done">
                                    {t('dashboard.todo.item.done')}
                                </TabsTrigger>
                                <TabsTrigger value="pending">
                                    {t('dashboard.todo.item.pending')}
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button className="opacity-50 cursor-default">
                                    {t('literals.download')}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                {t('literals.coming_soon')}
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <TabsContent value={selectedTab}>
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>
                                    {t('dashboard.todo.title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('dashboard.todo.description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TodoItemsTable todoItems={searchResults} />
                            </CardContent>
                            <CardFooter className="w-full flex flex-col justify-center items-center">
                                {
                                    // Show a loading spinner if the data is being fetched
                                    isLoading && (
                                        <div className="flex justify-center py-4">
                                            <Loading />
                                        </div>
                                    )
                                }
                                {
                                    // Show a message if there are no todo items
                                    !isLoading &&
                                        searchResults.length === 0 && (
                                            <div className="flex justify-center py-4">
                                                {t(
                                                    'dashboard.todo.no_todo_items',
                                                )}
                                            </div>
                                        )
                                }
                                {
                                    // Show a message if the end of the list has been reached
                                    reachedEnd ? (
                                        <div className="flex justify-center py-4">
                                            {t('dashboard.todo.no_more_items')}
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => setSize(size + 1)}
                                            disabled={isLoading || isValidating}
                                            className={cn(
                                                isLoading ||
                                                    (isValidating &&
                                                        'animate-pulse'),
                                            )}
                                        >
                                            {(isLoading || isValidating) && (
                                                <Loader className="animate-spin w-3 h-3 mr-2" />
                                            )}
                                            {t('dashboard.todo.load_more')}
                                        </Button>
                                    )
                                }
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
