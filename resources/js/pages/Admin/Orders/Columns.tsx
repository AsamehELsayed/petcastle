import { ColumnDef } from '@tanstack/react-table';
import { Eye, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
    pending: { label: 'Pending', variant: 'outline', icon: Clock },
    paid: { label: 'Paid', variant: 'secondary', icon: CheckCircle },
    shipped: { label: 'Shipped', variant: 'secondary', icon: Truck },
    delivered: { label: 'Delivered', variant: 'default', icon: CheckCircle },
    cancelled: { label: 'Cancelled', variant: 'destructive', icon: XCircle },
};

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'id',
        header: 'Order #',
        cell: ({ row }) => <span className="font-mono font-medium">#{row.getValue('id')}</span>,
    },
    {
        accessorKey: 'user.name',
        header: 'Customer',
        cell: ({ row }) => row.original.user?.name || 'Guest',
    },
    {
        accessorKey: 'total_price',
        header: 'Total',
        cell: ({ row }) => `$${parseFloat(row.getValue('total_price')).toFixed(2)}`,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            const config = statusMap[status] || { label: status, variant: 'outline', icon: Clock };
            const Icon = config.icon;

            return (
                <Badge variant={config.variant} className="flex w-fit items-center gap-1">
                    <Icon className="h-3 w-3" />
                    {config.label}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orders/${row.original.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View
                    </Link>
                </Button>
            );
        },
    },
];
