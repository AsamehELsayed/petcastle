import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'sonner';
import Pagination from '@/components/Pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Blog', href: '/admin/blog' },
];

export default function Index({ posts, filters }: { posts: any, filters: any }) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('admin.blog.destroy', id), {
                onSuccess: () => toast.success('Post deleted successfully')
            });
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Management" />
            
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                        <p className="text-muted-foreground">Create and manage your blog content.</p>
                    </div>
                    <Button asChild className="gap-2">
                        <Link href={route('admin.blog.create')}>
                            <Plus className="h-4 w-4" /> New Post
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search posts..." 
                                    className="pl-9"
                                    defaultValue={filters.search}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            router.get(route('admin.blog.index'), { search: e.currentTarget.value }, { preserveState: true });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto rounded-lg border">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Post</th>
                                        <th className="px-6 py-4 font-medium text-center">Status</th>
                                        <th className="px-6 py-4 font-medium">Published At</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {posts.data.map((post: any) => (
                                        <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {post.featured_image ? (
                                                        <img 
                                                            src={`/storage/${post.featured_image}`} 
                                                            className="h-10 w-16 object-cover rounded border" 
                                                            alt={post.title} 
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-16 bg-muted flex items-center justify-center rounded border text-muted-foreground">
                                                            NO IMG
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-foreground">{post.title}</p>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                            <User className="h-3 w-3" />
                                                            {post.author?.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant={post.is_published ? 'default' : 'secondary'}>
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {post.is_published && (
                                                        <Button variant="ghost" size="icon" asChild title="View Publicly">
                                                            <a href={route('blog.show', post.slug)} target="_blank" rel="noopener noreferrer">
                                                                <Eye className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={route('admin.blog.edit', post.id)}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(post.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.data.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                No blog posts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6">
                            <Pagination links={posts.links} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
