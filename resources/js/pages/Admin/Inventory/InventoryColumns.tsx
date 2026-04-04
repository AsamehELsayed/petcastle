import { ColumnDef } from '@tanstack/react-table';
import { Boxes, Edit, AlertCircle, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'name',
        header: 'Product',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue('name')}</span>
                <span className="text-xs text-muted-foreground">{row.original.categories?.[0]?.name}</span>
            </div>
        ),
    },
    {
        accessorKey: 'stock',
        header: 'Current Stock',
        cell: ({ row }) => {
            const stock = parseInt(row.getValue('stock'));
            const isLow = stock <= 5;
            
            return (
                <div className="flex items-center gap-2">
                    <span className={`font-bold ${isLow ? 'text-destructive' : 'text-green-600'}`}>
                        {stock}
                    </span>
                    {isLow && <AlertCircle className="h-4 w-4 text-destructive" />}
                </div>
            );
        },
    },
    {
        id: 'update',
        header: 'Quick Adjust',
        cell: ({ row }) => {
            const product = row.original;
            const { setData, put, processing } = useForm({
                stock: product.stock,
                action: 'adjustment'
            });

            const handleUpdate = (e: any) => {
                e.preventDefault();
                put(`/admin/inventory/${product.id}`);
            };

            return (
                <form onSubmit={handleUpdate} className="flex items-center gap-2">
                    <Input 
                        type="number" 
                        defaultValue={product.stock}
                        onChange={(e) => setData('stock', parseInt(e.target.value))}
                        className="w-20 h-8"
                    />
                    <Button size="sm" type="submit" disabled={processing} variant="secondary" className="h-8">
                        Update
                    </Button>
                </form>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/products/${row.original.id}/edit`}>
                    <Edit className="h-4 w-4" />
                </Link>
            </Button>
        ),
    },
];
