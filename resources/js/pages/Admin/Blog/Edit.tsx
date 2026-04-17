import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { type BreadcrumbItem } from '@/types';
import RichTextEditor from '../CMS/components/RichTextEditor';
import { toast } from 'sonner';

export default function Edit({ post }: { post: any }) {
    const isEditing = !!post;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Blog', href: '/admin/blog' },
        { title: isEditing ? 'Edit Post' : 'New Post', href: '#' },
    ];

    const { data, setData, post: postReq, put, processing, errors } = useForm({
        _method: isEditing ? 'PUT' : 'POST',
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        featured_image: null as File | null,
        is_published: post?.is_published || false,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(post?.featured_image ? `/storage/${post.featured_image}` : null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditing) {
            // Using POST with _method PUT because of file upload issues in some PHP versions with PUT
             router.post(route('admin.blog.update', post.id), {
                ...data,
                _method: 'PUT'
            }, {
                onSuccess: () => toast.success('Post updated successfully'),
                 forceFormData: true,
            });
        } else {
            postReq(route('admin.blog.store'), {
                onSuccess: () => toast.success('Post created successfully'),
            });
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Blog Post' : 'Create Blog Post'} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route('admin.blog.index')}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
                            <p className="text-muted-foreground">Fill in the details for your blog post.</p>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing} className="gap-2">
                        <Save className="h-4 w-4" /> {isEditing ? 'Update Post' : 'Create Post'}
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Details</CardTitle>
                                <CardDescription>Primary information about your post.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Post Title</Label>
                                    <Input 
                                        id="title" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)} 
                                        placeholder="Enter a catchy title..."
                                        className={errors.title ? 'border-destructive' : ''}
                                    />
                                    {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt / Summary</Label>
                                    <Textarea 
                                        id="excerpt" 
                                        value={data.excerpt} 
                                        onChange={e => setData('excerpt', e.target.value)} 
                                        placeholder="A brief summary for the list view..."
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground">Keep it under 160 characters for best SEO results.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Main Content</Label>
                                    <div className={errors.content ? 'border border-destructive rounded-md' : ''}>
                                        <RichTextEditor 
                                            value={data.content} 
                                            onChange={val => setData('content', val)} 
                                        />
                                    </div>
                                    {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar / Settings */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Published Status</Label>
                                        <p className="text-xs text-muted-foreground">Mark as draft or public.</p>
                                    </div>
                                    <Switch 
                                        checked={data.is_published} 
                                        onCheckedChange={val => setData('is_published', val)} 
                                    />
                                </div>

                                <div className="pt-4 border-t">
                                    <Label className="block mb-2 text-sm font-medium">Featured Image</Label>
                                    <div className="relative group aspect-video bg-muted rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                                        {imagePreview ? (
                                            <>
                                                <img src={imagePreview} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button variant="secondary" size="sm" type="button" onClick={() => document.getElementById('image-upload')?.click()}>
                                                        Change Image
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-6">
                                                <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                <p className="text-xs text-muted-foreground mb-4">Recommended: 1200x630 (1.91:1)</p>
                                                <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById('image-upload')?.click()}>
                                                    Upload Image
                                                </Button>
                                            </div>
                                        )}
                                        <input 
                                            id="image-upload" 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    {errors.featured_image && <p className="text-xs text-destructive mt-2">{errors.featured_image}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Status Icons</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    {data.title ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
                                    Title provided
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    {data.content.length > 50 ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
                                    Content length okay
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    {imagePreview ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
                                    Featured image set
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

// Helper needed because useForm's put doesn't handle files well sometimes
import { router } from '@inertiajs/react';
