import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type BreadcrumbItem } from '@/types';
import { ChevronLeft, Edit, Trash2, Package, Dog, CheckCircle2, XCircle, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    product: any;
}

export default function Show({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: '/admin/products',
        },
        {
            title: product.name,
            href: `/admin/products/${product.id}`,
        },
    ];

    const isAnimal = product.type === 'animal';
    const [activeImage, setActiveImage] = useState(product.images?.find((img: any) => img.is_primary)?.path || product.main_image || (product.images?.[0]?.path) || null);

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Product: ${product.name}`} />

            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/admin/products">
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                                <Badge variant={isAnimal ? 'default' : 'secondary'} className="capitalize">
                                    {isAnimal ? <Dog className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                                    {product.type}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">ID: {product.id} • Status: <span className="capitalize font-medium text-foreground">{product.status}</span></p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/admin/products/${product.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </Button>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 flex flex-col gap-6">
                        {/* Image Gallery */}
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col">
                                    <div className="aspect-[16/9] w-full bg-muted flex items-center justify-center relative group">
                                        {activeImage ? (
                                            <img
                                                src={`/storage/${activeImage}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <ImageIcon className="w-12 h-12 opacity-20" />
                                                <span>No image available</span>
                                            </div>
                                        )}
                                        {product.images?.length > 1 && (
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                                                {product.images.map((img: any) => (
                                                    <button
                                                        key={img.id}
                                                        onClick={() => setActiveImage(img.path)}
                                                        className={`w-3 h-3 rounded-full transition-all ${activeImage === img.path ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {product.images?.length > 0 && (
                                        <div className="p-4 bg-muted/30 border-t">
                                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                                {product.images.map((img: any) => (
                                                    <button
                                                        key={img.id}
                                                        onClick={() => setActiveImage(img.path)}
                                                        className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImage === img.path ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'}`}
                                                    >
                                                        <img
                                                            src={`/storage/${img.path}`}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {img.is_primary && (
                                                            <div className="absolute top-1 right-1 bg-primary text-[10px] text-primary-foreground px-1 rounded-sm font-bold uppercase">
                                                                Main
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                    {product.description || 'No description provided for this item.'}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{isAnimal ? 'Animal Details' : 'Product Specifications'}</CardTitle>
                                <CardDescription>Specific biological or structural information.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {isAnimal ? (
                                    <>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Species</span>
                                            <span className="font-medium">{product.animal_detail?.species?.name || product.animalDetail?.species?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Breed</span>
                                            <span className="font-medium">{product.animal_detail?.breed?.name || product.animalDetail?.breed?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gender</span>
                                            <span className="font-medium capitalize">{product.animal_detail?.gender || product.animalDetail?.gender || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Age</span>
                                            <span className="font-medium text-foreground">{product.animal_detail?.age || product.animalDetail?.age || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weight</span>
                                            <span className="font-medium">{product.animal_detail?.weight || product.animalDetail?.weight || product.product_detail?.weight || product.productDetail?.weight ? `${product.animal_detail?.weight || product.animalDetail?.weight || product.product_detail?.weight || product.productDetail?.weight} kg` : 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Color</span>
                                            <span className="font-medium">{product.animal_detail?.color || product.animalDetail?.color || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            {product.animal_detail?.vaccinated || product.animalDetail?.vaccinated ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                            <span className="text-sm font-medium">Vaccinated</span>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            {product.animal_detail?.trained || product.animalDetail?.trained ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                            <span className="text-sm font-medium">Trained</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manufacturer</span>
                                            <span className="font-medium">{product.product_detail?.manufacturer || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weight</span>
                                            <span className="font-medium">{product.product_detail?.weight ? `${product.product_detail.weight} kg` : 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dimensions</span>
                                            <span className="font-medium">{product.product_detail?.dimensions || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expiration Date</span>
                                            <span className="font-medium">{product.product_detail?.expiration_date || 'N/A'}</span>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory & Price</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Price</span>
                                    <span className="text-2xl font-bold">${parseFloat(product.price).toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Stock Level</span>
                                    <Badge variant={product.stock <= 5 ? 'destructive' : 'outline'} className="text-sm">
                                        {product.stock} units
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Brand</span>
                                    <span className="font-medium">{product.brand?.name || 'N/A'}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Categorization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {product.categories && product.categories.length > 0 ? (
                                        product.categories.map((cat: any) => (
                                            <Badge key={cat.id} variant="secondary">
                                                {cat.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground italic">No categories assigned.</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>


                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
