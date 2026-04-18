import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    Ticket, 
    MessageSquare, 
    Boxes, 
    Tags, 
    FileText, 
    Activity, 
    Settings,
    AlertCircle,
    PawPrint
} from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems = [
    {
        title: 'Dashboard',
        url: '/admin',
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        url: '/admin/products',
        icon: Package,
    },
    {
        title: 'Orders',
        url: '/admin/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Users',
        url: '/admin/users',
        icon: Users,
    },
    {
        title: 'Inventory',
        url: '/admin/inventory',
        icon: Boxes,
    },
    {
        title: 'Coupons',
        url: '/admin/coupons',
        icon: Ticket,
    },

    {
        title: 'Taxonomy',
        url: '/admin/categories',
        icon: Tags,
    },
    {
        title: 'CMS',
        url: '/admin/cms',
        icon: FileText,
    },
    {
        title: 'Blog',
        url: '/admin/blog',
        icon: MessageSquare,
    },
    {
        title: 'Animal Requests',
        url: '/admin/animal-requests',
        icon: PawPrint,
    },
    {
        title: 'Activity Logs',
        url: '/admin/logs/activity',
        icon: Activity,
    },
    {
        title: 'Error Logs',
        url: '/admin/logs/errors',
        icon: AlertCircle,
    },
    {
        title: 'Settings',
        url: '/admin/settings',
        icon: Settings,
    },
];

export function AdminSidebar() {
    const { pending_animal_requests_count } = usePage().props as any;

    const navItems = adminNavItems.map(item => {
        if (item.title === 'Animal Requests' && pending_animal_requests_count > 0) {
            return { ...item, count: pending_animal_requests_count };
        }
        return item;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
