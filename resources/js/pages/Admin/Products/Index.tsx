import AdminLayout from '@/layouts/admin-layout';
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Upload, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

import Pagination from '@/components/Pagination';
import ProductFilters from '@/components/admin/ProductFilters';
import ProductCard from '@/components/admin/ProductCard';

interface Product {
    id: number;
    name: string;
    type: string;
    price: number;
    stock: number;
    status: string;
    main_image: string | null;
    categories?: { name: string }[];
}

interface PaginatedProducts {
    data: Product[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
];

export default function Index({ 
    products, 
    filters, 
    categories, 
    brands 
}: { 
    products: PaginatedProducts, 
    filters: any,
    categories: { id: number, name: string }[],
    brands: { id: number, name: string }[]
}) {
    const { post, processing } = useForm({
        file: null as File | null,
    });

    const handleImportClick = () => {
        document.getElementById('import-file-input')?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            postImport(file);
        }
    };

    const postImport = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                            {processing ? 'Importing...' : 'Import'}
                        </Button>
                        <Button asChild>
                            <Link href="/admin/products/create">
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-6 border shadow-sm space-y-4">
                    <ProductFilters 
                        filters={filters} 
                        categories={categories} 
                        brands={brands} 
                    />

                    {products.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground mb-4">No products found.</p>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                Go Back
                            </Button>
                        </div>
                    )}

                    <div className="pt-4">
                        <Pagination links={products.links} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

