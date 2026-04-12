import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Activity, Search, Filter, Calendar, User, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Activity Logs',
        href: '/admin/logs/activity',
    },
];

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'user.name',
        header: 'User',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{row.original.user?.name || 'System'}</span>
            </div>
        ),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
            <Badge variant="secondary" className="capitalize">
                {row.getValue('action').toString().replace(/_/g, ' ')}
            </Badge>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <span className="text-sm italic">{row.getValue('description')}</span>,
    },
    {
        accessorKey: 'created_at',
        header: 'Timestamp',
        cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleString(),
    },
];

export default function ActivityLogs({ logs, filters }: { logs: { data: any[] }, filters: any }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Logs" />
            
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
                    <p className="text-muted-foreground">Audit trail for all user actions and system events.</p>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={logs.data} 
                        searchKey="description"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
