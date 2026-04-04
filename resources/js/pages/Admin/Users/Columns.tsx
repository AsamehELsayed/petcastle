import { ColumnDef } from '@tanstack/react-table';
import { ShieldCheck, User as UserIcon, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react';
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
import { Link, useForm } from '@inertiajs/react';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue('name')}</span>
                <span className="text-xs text-muted-foreground">{row.original.email}</span>
            </div>
        ),
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <Badge variant={row.getValue('role') === 'Admin' ? 'default' : 'secondary'} className="flex w-fit items-center gap-1">
                {row.getValue('role') === 'Admin' ? <ShieldCheck className="h-3 w-3" /> : <UserIcon className="h-3 w-3" />}
                {row.getValue('role')}
            </Badge>
        ),
    },
    {
        accessorKey: 'orders_count',
        header: 'Orders',
        cell: ({ row }) => row.getValue('orders_count') || 0,
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original;
            const { patch } = useForm();

            const toggleStatus = () => {
                patch(`/admin/users/${user.id}`);
            };

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
                            <Link href={`/admin/users/${user.id}`}>
                                <UserIcon className="mr-2 h-4 w-4" /> View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={toggleStatus}>
                            <ShieldCheck className="mr-2 h-4 w-4" /> Change Status
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
