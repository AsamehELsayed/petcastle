import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Show({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Home', href: '/' },
        { title: 'Blog', href: '/blog' },
        { title: post.title, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{`${post.title} - PetCastle Blog`}</title>
                <meta name="description" content={post.excerpt} />
            </Head>

            {/* Article Header */}
            <header className="relative py-24 bg-muted/30 overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-6">
                        Pet Tips & Care
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{post.author.name}</span>
                        </div>
                        <div className="w-px h-4 bg-border hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
                <div className="container mx-auto px-4 -mt-12 mb-16 max-w-5xl">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-background">
                        <img 
                            src={`/storage/${post.featured_image}`} 
                            className="w-full h-full object-cover" 
                            alt={post.title} 
                        />
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
                    
                    {/* Sticky Social Share */}
                    <div className="lg:w-20 hidden lg:block">
                        <div className="sticky top-32 flex flex-col gap-4 items-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-2 [writing-mode:vertical-lr]">Share</span>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <LinkIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <article className="lg:flex-1 max-w-3xl">
                        {/* Excerpt/Lead */}
                        {post.excerpt && (
                            <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-12 italic leading-relaxed border-l-4 border-primary pl-8">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Rich Text Body */}
                        <div 
                            className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                            prose-headings:font-extrabold prose-headings:tracking-tight
                            prose-p:leading-relaxed prose-p:text-muted-foreground
                            prose-img:rounded-3xl prose-img:shadow-lg
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground"
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />

                        {/* Footer / Tags */}
                        <div className="mt-20 pt-12 border-t flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Written by</p>
                                    <p className="font-bold text-lg">{post.author.name}</p>
                                </div>
                            </div>
                            <Button variant="outline" className="gap-2 rounded-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                Back to top
                            </Button>
                        </div>
                    </article>

                    {/* Sidebar: Related Posts */}
                    <aside className="lg:w-80 space-y-12">
                        <div className="bg-card border rounded-3xl p-8 sticky top-32">
                            <h3 className="text-xl font-bold mb-6">Related Stories</h3>
                            <div className="space-y-8">
                                {relatedPosts.map((rp: any) => (
                                    <Link key={rp.id} href={route('blog.show', rp.slug)} className="group block">
                                        <div className="aspect-video bg-muted rounded-xl mb-3 overflow-hidden">
                                            {rp.featured_image && (
                                                <img src={`/storage/${rp.featured_image}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            )}
                                        </div>
                                        <h4 className="font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {rp.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {new Date(rp.published_at).toLocaleDateString()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            
                            <Button variant="link" asChild className="p-0 mt-8 font-bold text-primary">
                                <Link href={route('blog.index')} className="flex items-center gap-2">
                                    View all posts <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Link>
                            </Button>
                        </div>
                    </aside>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-24">
                <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Have a story to share about your pet?</h2>
                        <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto">
                            We love hearing from our community. Join our platform and share your experience with other pet parents.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-10 h-14">
                                Join the Community
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
