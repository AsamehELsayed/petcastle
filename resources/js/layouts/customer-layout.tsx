import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, User, ShoppingBag, Heart, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    const { url } = usePage();

    const navItems = [
        { label: 'Dashboard', href: route('portal.dashboard'), icon: LayoutDashboard },
        { label: 'Personal Information', href: route('portal.profile.edit'), icon: User },
        { label: 'My Orders', href: '#', icon: ShoppingBag }, // Placeholder for now
        { label: 'Wishlist', href: '#', icon: Heart }, // Placeholder for now
    ];

    return (
        <AppShell variant="sidebar">
            <aside className="w-64 border-r bg-card/50 backdrop-blur-xl flex flex-col h-screen sticky top-0">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        PetStore
                    </Link>
                </div>
                
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href) && item.href !== '#' || (url === '/portal' && item.href === '/portal');
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive 
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors duration-200"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </aside>

            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <main className="p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </main>
            </AppContent>
            <Toaster position="top-right" />
        </AppShell>
    );
}
