import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Plus, Ticket, Trash, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { type BreadcrumbItem } from '@/types';
import { columns } from './Columns';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Coupons',
        href: '/admin/coupons',
    },
];

export default function Index({ coupons }: { coupons: { data: any[] } }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Coupons" />
            
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
                        <p className="text-muted-foreground">Create and manage discount codes for your store.</p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Coupon
                    </Button>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={coupons.data} 
                        searchKey="code"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
