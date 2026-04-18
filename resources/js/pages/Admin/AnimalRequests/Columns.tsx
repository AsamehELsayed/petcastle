import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash, CheckCircle, Mail, Clock } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'name',
        header: 'Client Name',
    },
    {
        accessorKey: 'contact',
        header: 'Contact Info',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {row.original.contact}
            </div>
        )
    },
    {
        accessorKey: 'animal_type',
        header: 'Animal Requested',
        cell: ({ row }) => (
            <Badge variant="outline" className="font-bold border-accent/30 text-accent">
                {row.original.animal_type}
            </Badge>
        )
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge 
                    className={
                        status === 'pending' ? 'bg-orange-500 hover:bg-orange-600' :
                        status === 'contacted' ? 'bg-blue-500 hover:bg-blue-600' :
                        'bg-green-600 hover:bg-green-700'
                    }
                >
                    {status.toUpperCase()}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const request = row.original;

            const updateStatus = (status: string) => {
                router.put(route('admin.animal-requests.update', request.id), { status }, {
                    onSuccess: () => toast.success(`Status updated to ${status}`),
                });
            };

            const deleteRequest = () => {
                if (confirm('Are you sure you want to delete this request?')) {
                    router.delete(route('admin.animal-requests.destroy', request.id), {
                        onSuccess: () => toast.success('Request deleted'),
                    });
                }
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateStatus('pending')}>
                            <Clock className="mr-2 h-4 w-4" /> Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus('contacted')}>
                            <Mail className="mr-2 h-4 w-4" /> Mark as Contacted
                        </MenuItem>
                        <DropdownMenuItem onClick={() => updateStatus('resolved')}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={deleteRequest} className="text-destructive focus:text-destructive">
                            <Trash className="mr-2 h-4 w-4" /> Delete Request
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
