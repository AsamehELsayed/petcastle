import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Settings, Save, Globe, Info, CreditCard, Mail, Shield, MessageSquare, PanelBottom } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/admin/settings',
    },
];

export default function Index({ settings }: { settings: Record<string, any[]> }) {
    const { data, setData, put, processing } = useForm(
        Object.values(settings).flat().reduce((acc: any, s: any) => {
            acc[s.key] = s.value;
            return acc;
        }, {})
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/settings');
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="General Settings" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                        <p className="text-muted-foreground">Configure your store's global parameters and API integrations.</p>
                    </div>
                    <Button type="submit" disabled={processing}>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>

                <Tabs defaultValue="General" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                            {Object.keys(settings).map((group) => (
                                <TabsTrigger 
                                    key={group} 
                                    value={group}
                                    className="justify-start px-4 py-2 h-10 w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border"
                                >
                                    {getIconForGroup(group)}
                                    <span className="ml-2 font-medium">{group}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        
                        <div className="md:col-span-3">
                            {Object.entries(settings).map(([group, groupSettings]) => (
                                <TabsContent key={group} value={group} className="m-0">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{group} Settings</CardTitle>
                                            <CardDescription>Manage your {group.toLowerCase()} preferences.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {groupSettings.map((setting) => (
                                                <div key={setting.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b pb-6 last:border-0 last:pb-0">
                                                    <div className="space-y-1">
                                                        <Label className="capitalize text-base">{setting.key.replace(/_/g, ' ')}</Label>
                                                        <p className="text-xs text-muted-foreground">Key: {setting.key}</p>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        {typeof data[setting.key] === 'object' && data[setting.key] !== null ? (
                                                            <div className="space-y-4 border p-4 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
                                                                {Object.entries(data[setting.key]).map(([subKey, subValue]) => (
                                                                    <div key={subKey} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                                                        <Label className="text-sm font-medium text-muted-foreground capitalize">
                                                                            {subKey.replace(/_/g, ' ')}
                                                                        </Label>
                                                                        <Input 
                                                                            value={subValue as string || ''} 
                                                                            onChange={(e) => {
                                                                                const newData = { ...data[setting.key], [subKey]: e.target.value };
                                                                                setData(setting.key, newData);
                                                                            }}
                                                                            className="h-9 bg-white dark:bg-slate-950"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <Input 
                                                                value={data[setting.key] || ''} 
                                                                onChange={(e) => setData(setting.key, e.target.value)}
                                                                className="max-w-md"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </div>
                    </div>
                </Tabs>
            </form>
        </AdminLayout>
    );
}

function getIconForGroup(group: string) {
    const normalizedGroup = group.toLowerCase();
    switch (normalizedGroup) {
        case 'general': return <Globe className="h-4 w-4" />;
        case 'shipping': return <CreditCard className="h-4 w-4" />;
        case 'contact': return <Mail className="h-4 w-4" />;
        case 'seo': return <Shield className="h-4 w-4" />;
        case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-500" />;
        case 'footer': return <PanelBottom className="h-4 w-4" />;
        default: return <Settings className="h-4 w-4" />;
    }
}
