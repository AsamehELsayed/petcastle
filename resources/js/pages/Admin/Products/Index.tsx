import AdminLayout from '@/layouts/admin-layout';
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { type BreadcrumbItem } from '@/types';
import { columns } from './Columns';

interface Product {
    id: number;
    name: string;
    type: string;
    price: number;
    stock: number;
    status: string;
    categories?: { name: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
];

export default function Index({ products, filters }: { products: { data: Product[] }, filters: any }) {
    const { setData, post, processing } = useForm({
        file: null as File | null,
    });

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
            // Need to manually trigger post because setData is async and doesn't update 'data' immediately in the same tick for post
            const formData = new FormData();
            formData.append('file', file);
            // Actually inertia post handles it better if we pass it directly
        }
    };

    // Better way with useForm: watch file change and submit
    React.useEffect(() => {
        // @ts-ignore - access private data if needed or just use a handler
    }, []);

    const handleImportClick = () => {
        document.getElementById('import-file-input')?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // We use a direct Inertia.post or use the form's post
            // But since setData is async, it's safer to use local state or pass directly if using manual post
            // However, useForm is preferred. Let's use a separate function.
            postImport(file);
        }
    };

    const postImport = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        
        // Using Inertia directly for simplicity since it's a one-off upload
        // or just use the hook correctly
        post('/admin/products/import', {
            forceFormData: true,
            onSuccess: () => {
                // Success
            }
        });
    };
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">Manage your animal and product inventory.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="file" 
                            id="import-file-input" 
                            className="hidden" 
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileChange}
                        />
                        <Button 
                            variant="outline" 
                            onClick={handleImportClick} 
                            disabled={processing}
                        >
                            <Upload className="mr-2 h-4 w-4" /> 
                            {processing ? 'Importing...' : 'Import Products'}
                        </Button>
                        <Button asChild>
                            <Link href="/admin/products/create">
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm">
                    <DataTable 
                        columns={columns} 
                        data={products.data} 
                        searchKey="name"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
