'use client';

import { useI18n } from '@/libs/locales/client';
import { Button } from '@/libs/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/ui/card';
import { Input } from '@/libs/ui/input';
import { Switch } from '@/libs/ui/switch';

export function GeneralSettingsView() {
    const t = useI18n();
    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>
                        {t('dashboard.settings.general.goals')}
                    </CardTitle>
                    <CardDescription>
                        {t('dashboard.settings.general.goals_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="grid gap-3">
                        <li className="grid sm:grid-cols-2 gap-4">
                            <div className="grid gap-1">
                                <span className="text-muted-foreground">
                                    {t(
                                        'dashboard.settings.general.weekly_goal',
                                    )}
                                </span>
                                <Input id="email" type="number" />
                            </div>
                            <div className="grid gap-1">
                                <span className="text-muted-foreground">
                                    {t(
                                        'dashboard.settings.general.monthly_goal',
                                    )}
                                </span>
                                <Input id="email" type="number" />
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>
                        {t('dashboard.settings.general.notifications')}
                    </CardTitle>
                    <CardDescription>
                        {t(
                            'dashboard.settings.general.notifications_description',
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                {t(
                                    'dashboard.settings.general.send_notifications_to_email',
                                )}
                            </span>
                            <Switch id="isActive" defaultChecked />
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                {t(
                                    'dashboard.settings.general.send_deals_and_offers',
                                )}
                            </span>
                            <Switch id="isActive" defaultChecked />
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>
                        {t('dashboard.settings.general.delete_account')}
                    </CardTitle>
                    <CardDescription>
                        {t(
                            'dashboard.settings.general.delete_account_description',
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className='border-red-400'>
                        {t('dashboard.settings.general.delete_account')}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
