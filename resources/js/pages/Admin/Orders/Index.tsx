import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { type BreadcrumbItem } from '@/types';
import { columns } from './Columns';

interface Order {
    id: number;
    total_price: number;
    status: string;
    user?: { name: string, email: string };
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/admin/orders',
    },
];

export default function Index({ orders, filters }: { orders: { data: Order[] }, filters: any }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">Manage and track your customer orders.</p>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={orders.data} 
                        searchKey="id"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
