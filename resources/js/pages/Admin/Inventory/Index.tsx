import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Boxes, History, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type BreadcrumbItem } from '@/types';
import { columns as inventoryColumns } from './InventoryColumns';

import Pagination from '@/components/Pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/admin/inventory',
    },
];

interface PaginatedStock {
    data: any[];
    links: any[];
}

export default function Index({ stock, filters }: { stock: PaginatedStock, filters: any }) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory Management" />
            
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                        <p className="text-muted-foreground">Monitor stock levels and view adjustment logs.</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/admin/inventory/logs">
                            <History className="mr-2 h-4 w-4" /> View History
                        </Link>
                    </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="all">Current Stock</TabsTrigger>
                        <TabsTrigger value="low">
                            <AlertTriangle className="mr-2 h-4 w-4 text-destructive" /> Low Stock
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="pt-6">
                        <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm space-y-4">
                            <DataTable 
                                columns={inventoryColumns} 
                                data={stock.data} 
                                searchKey="name"
                            />
                            <Pagination links={stock.links} />
                        </div>
                    </TabsContent>
                    <TabsContent value="low" className="pt-6">
                         <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm space-y-4">
                            <DataTable 
                                columns={inventoryColumns} 
                                data={stock.data.filter(i => i.stock <= (i.stock_threshold || 5))} 
                                searchKey="name"
                            />
                            <Pagination links={stock.links} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
