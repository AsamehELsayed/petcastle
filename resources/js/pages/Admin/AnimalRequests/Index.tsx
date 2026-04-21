import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { type BreadcrumbItem } from '@/types';
import { columns } from './Columns';
import Pagination from '@/components/Pagination';

interface AnimalRequest {
    id: number;
    name: string;
    contact: string;
    animal_type: string;
    status: string;
    created_at: string;
}

interface PaginatedRequests {
    data: AnimalRequest[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animal Requests',
        href: '/admin/animal-requests',
    },
];

export default function Index({ requests }: { requests: PaginatedRequests }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Animal Requests" />
            
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Animal Requests</h1>
                        <p className="text-muted-foreground">Manage and respond to pet sourcing requests.</p>
                    </div>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm space-y-4">
                    <DataTable 
                        columns={columns} 
                        data={requests.data} 
                        searchKey="name"
                    />
                    
                    <div className="pt-4">
                        <Pagination links={requests.links} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
