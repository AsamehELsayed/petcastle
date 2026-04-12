import { ColumnDef } from '@tanstack/react-table';
import { Ticket, MoreHorizontal, Trash, Edit, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useForm } from '@inertiajs/react';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'code',
        header: 'Coupon Code',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono font-bold uppercase tracking-wider">{row.getValue('code')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize">
                {row.getValue('type') === 'percentage' ? 'Percentage (%)' : 'Fixed Amount ($)'}
            </Badge>
        ),
    },
    {
        accessorKey: 'value',
        header: 'Discount',
        cell: ({ row }) => {
            const value = row.getValue('value') as number;
            const type = row.getValue('type') as string;
            return type === 'percentage' ? `${value}%` : `$${value.toFixed(2)}`;
        },
    },
    {
        accessorKey: 'limit',
        header: 'Usage',
        cell: ({ row }) => {
            const limit = row.getValue('limit');
            const used = row.original.used_count || 0;
            return (
                <div className="flex flex-col text-xs">
                    <span className="font-medium">{used} / {limit || '∞'}</span>
                    <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div 
                            className="bg-primary h-full" 
                            style={{ width: limit ? `${(used / limit) * 100}%` : '0%' }}
                        />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'expires_at',
        header: 'Expiry',
        cell: ({ row }) => {
            const date = row.getValue('expires_at');
            return date ? new Date(date as string).toLocaleDateString() : 'Never';
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const coupon = row.original;
            const { delete: destroy } = useForm();

            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this coupon?')) {
                    destroy(`/admin/coupons/${coupon.id}`);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Info className="mr-2 h-4 w-4" /> Usage Stats
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
