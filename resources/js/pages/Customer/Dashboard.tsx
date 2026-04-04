import CustomerLayout from '@/layouts/customer-layout';
import { BreadcrumbItem, User as UserType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, Heart, Package, Star, ArrowRight, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Dashboard({ user, orderCount, recentOrders }: { user: UserType; orderCount: number; recentOrders: any[] }) {
    return (
        <CustomerLayout breadcrumbs={[{ title: 'Dashboard', href: route('portal.dashboard') }]}>
            <Head title="Customer Dashboard" />

            <section className="space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Welcome back, {user.name}! 🐾
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your orders, profile and preferences from your dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard 
                        title="Total Orders" 
                        value={orderCount} 
                        icon={Package} 
                        color="bg-blue-500/10 text-blue-500" 
                    />
                    <StatsCard 
                        title="Wishlist Items" 
                        value="0" 
                        icon={Heart} 
                        color="bg-pink-500/10 text-pink-500" 
                    />
                    <StatsCard 
                        title="Active Subscriptions" 
                        value="0" 
                        icon={Star} 
                        color="bg-amber-500/10 text-amber-500" 
                    />
                    <StatsCard 
                        title="Cart Items" 
                        value="0" 
                        icon={ShoppingBag} 
                        color="bg-emerald-500/10 text-emerald-500" 
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-primary/10 shadow-xl shadow-primary/5">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>Your most recent activity at PetStore</CardDescription>
                            </div>
                            <Button variant="ghost" className="gap-2 group">
                                View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.length > 0 ? (
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl border border-border/50 hover:border-primary/20 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Order #{order.id}</p>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3" /> {new Date(order.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="font-bold">${order.total_amount}</p>
                                                    <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">Details</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 grayscale">📦</div>
                                    <h3 className="text-lg font-semibold">No orders yet</h3>
                                    <p className="text-muted-foreground mb-6">Looks like you haven't placed any orders yet.</p>
                                    <Button asChild className="gap-2">
                                        <Link href="/">Start Shopping <ArrowRight className="h-4 w-4" /></Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-primary/10 shadow-xl shadow-primary/5 bg-gradient-to-br from-primary/[0.03] to-transparent">
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                            <CardDescription>Get where you need to go</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <QuickLink href={route('portal.profile.edit')} label="Edit Profile" description="Change your name, email and phone" />
                            <QuickLink href="#" label="Track Package" description="Check the status of your current delivery" />
                            <QuickLink href="#" label="Refer a Friend" description="Invite someone and get $10 off" />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </CustomerLayout>
    );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
    return (
        <Card className="border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                    </div>
                    <div className={cn("p-4 rounded-2xl", color)}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function QuickLink({ href, label, description }: any) {
    return (
        <Link href={href} className="group block p-4 rounded-2xl border border-border/50 hover:bg-background hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </div>
        </Link>
    );
}
