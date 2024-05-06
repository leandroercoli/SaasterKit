import { useI18n } from '@/libs/locales/client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const data = [
    {
        date: '2022-01-01',
        total: 10,
    },
    {
        date: '2022-02-01',
        total: 20,
    },
    {
        date: '2022-03-01',
        total: 22,
    },
    {
        date: '2022-04-01',
        total: 28,
    },
    {
        date: '2022-05-01',
        total: 40,
    },
];

export function LineChartCard() {
    const t = useI18n();

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex flex-row items-center justify-between">
                    <CardDescription>
                        {t('dashboard.todo.stats.total')}
                    </CardDescription>
                </div>
                <CardTitle className="text-4xl">+12%</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[80px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 10,
                            }}
                        >
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="total"
                                activeDot={{
                                    r: 6,
                                    style: {
                                        fill: 'hsl(var(--primary))',
                                        opacity: 0.25,
                                    },
                                }}
                                style={
                                    {
                                        stroke: 'hsl(var(--primary))',
                                    } as React.CSSProperties
                                }
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
