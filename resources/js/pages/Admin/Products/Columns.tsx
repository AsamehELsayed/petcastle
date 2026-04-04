import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'name',
        header: 'Product Name',
        cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
            <Badge variant={row.getValue('type') === 'animal' ? 'default' : 'secondary'}>
                {row.getValue('type')}
            </Badge>
        ),
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => `$${parseFloat(row.getValue('price')).toFixed(2)}`,
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
            const stock = parseInt(row.getValue('stock'));
            return (
                <span className={stock <= 5 ? 'text-destructive font-bold' : ''}>
                    {stock}
                </span>
            );
        },
    },
    {
        id: 'category',
        header: 'Category',
        cell: ({ row }) => row.original.categories?.[0]?.name || 'N/A',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}`}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
