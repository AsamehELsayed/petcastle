import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { AlertCircle, Terminal, FileCode, Clock } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Error Logs',
        href: '/admin/logs/errors',
    },
];

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'message',
        header: 'Error Message',
        cell: ({ row }) => (
            <div className="flex flex-col gap-1 max-w-[400px]">
                <span className="font-mono text-xs font-bold text-destructive truncate">{row.getValue('message')}</span>
                <span className="text-[10px] text-muted-foreground truncate">{row.original.file}:{row.original.line}</span>
            </div>
        ),
    },
    {
        accessorKey: 'user.name',
        header: 'User',
        cell: ({ row }) => (
            <span className="text-xs">{row.original.user?.name || 'Guest'}</span>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Occurred At',
        cell: ({ row }) => <span className="text-xs whitespace-nowrap">{new Date(row.getValue('created_at')).toLocaleString()}</span>,
    },
    {
        id: 'details',
        header: 'Stack Trace',
        cell: ({ row }) => (
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trace" className="border-b-0">
                    <AccordionTrigger className="p-0 hover:no-underline font-normal text-xs text-blue-600">
                        View Trace
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-zinc-900 text-zinc-100 rounded-md mt-2 font-mono text-[10px] overflow-x-scroll whitespace-pre">
                        {row.original.stack_trace}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ),
    },
];

export default function ErrorLogs({ logs, filters }: { logs: { data: any[] }, filters: any }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="System Errors" />
            
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Errors</h1>
                    <p className="text-muted-foreground">Detailed reports of all exceptions and errors occurring in production.</p>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={logs.data} 
                        searchKey="message"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
