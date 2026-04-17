import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Pagination from '@/components/Pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
];

export default function Index({ posts }: { posts: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Our Blog - PetCastle" />

            {/* Hero Section */}
            <div className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl animate-pulse" />
                </div>
                
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">The PetCastle Journal</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Your daily source for expert pet care tips, breed highlights, and heartwarming stories from our animal lovers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.data.map((post: any) => (
                        <Link 
                            key={post.id} 
                            href={route('blog.show', post.slug)}
                            className="group flex flex-col bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                {post.featured_image ? (
                                    <img 
                                        src={`/storage/${post.featured_image}`} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        alt={post.title} 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-muted/80 transition-colors">
                                        PetCastle
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                                        Pet Care
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.published_at).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {post.author.name}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                    {post.excerpt || 'Read more about this interesting topic on our blog...'}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary">
                                    Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.data.length === 0 && (
                    <div className="text-center py-24 border rounded-3xl bg-muted/20">
                        <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
                    </div>
                )}

                <div className="mt-16 flex justify-center">
                    <Pagination links={posts.links} />
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-muted/30 py-24 border-t">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Paws-itively Informed</h2>
                    <p className="text-muted-foreground mb-8">Get the latest pet tips and treats delivered right to your inbox weekly.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 bg-background border rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
