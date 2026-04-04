import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { type BreadcrumbItem } from '@/types';
import { columns } from './Columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
];

export default function Index({ users, filters }: { users: { data: any[] }, filters: any }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage roles, permissions, and customer accounts.</p>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={users.data} 
                        searchKey="name"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
