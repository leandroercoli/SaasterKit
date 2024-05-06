import { useI18n } from '@/libs/locales/client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

const data = [
    {
        date: '2022-01-01',
        total: 14,
    },
    {
        date: '2022-02-01',
        total: 20,
    },
    {
        date: '2022-03-01',
        total: 28,
    },
    {
        date: '2022-04-01',
        total: 20,
    },
    {
        date: '2022-05-01',
        total: 25,
    },
];

export function BarChartCard() {
    const t = useI18n();

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex flex-row items-center justify-between">
                    <CardDescription>{t('dashboard.todo.stats.total')}</CardDescription>
                </div>
                <CardTitle className="text-4xl">+5</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[80px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 15,
                                right: 0,
                                left: 0,
                                bottom: -10,
                            }}
                        >
                            <Bar
                                dataKey="total"
                                style={
                                    {
                                        fill: 'hsl(var(--primary))',
                                        opacity: 1,
                                    } as React.CSSProperties
                                }
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
