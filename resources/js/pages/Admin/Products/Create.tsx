import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type BreadcrumbItem } from '@/types';
import { ChevronLeft, Save, X, Image as ImageIcon } from 'lucide-react';

interface Props {
    categories: any[];
    brands: any[];
    species: any[];
    breeds: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
    {
        title: 'Create',
        href: '/admin/products/create',
    },
];

export default function Create({ categories, brands, species, breeds }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'product',
        price: '',
        stock: '',
        status: 'available',
        brand_id: '',
        categories: [] as string[],
        description: '',
        details: {
            // common animal details
            species_id: '',
            breed_id: '',
            sku: '',
            barcode: '',
            gender: 'unknown',
            age_months: '',
            vaccinated: false as boolean,
            trained: false as boolean,
            weight: '',
            color: '',
            // common product details
            brand: '',
            size: '',
            expiration_date: '',
        },
        images: [] as File[],
    });

    const [previews, setPreviews] = React.useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    const toggleCategory = (id: string) => {
        const newCategories = data.categories.includes(id)
            ? data.categories.filter((c) => c !== id)
            : [...data.categories, id];
        setData('categories', newCategories);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImages = [...data.images, ...files];
            setData('images', newImages);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        setData('images', newImages);

        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        
        // Revoke the URL to avoid memory leaks
        URL.revokeObjectURL(previews[index]);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/admin/products">
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Add New Item</h1>
                            <p className="text-muted-foreground">Create a new product or animal entry.</p>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing} className="gap-2">
                        <Save className="h-4 w-4" /> Save Item
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Enter the primary details for this item.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Item Name</Label>
                                    <Input 
                                        id="name" 
                                        value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)} 
                                        placeholder="e.g., Golden Retriever Puppy or Royal Canin Dog Food"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea 
                                        id="description" 
                                        value={data.description} 
                                        onChange={(e) => setData('description', e.target.value)} 
                                        rows={5}
                                        placeholder="Describe the item's features, benefits, or characteristics..."
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Photos</CardTitle>
                                <CardDescription>Add images of the item. The first image will be the primary one.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {previews.map((preview, index) => (
                                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border bg-muted group">
                                            <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                            {index === 0 && (
                                                <div className="absolute bottom-0 inset-x-0 bg-primary/80 text-[10px] text-primary-foreground text-center py-0.5">
                                                    Primary
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground mb-2" />
                                        <span className="text-xs text-muted-foreground">Add Photo</span>
                                        <input 
                                            type="file" 
                                            multiple 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
                                {Object.keys(errors).filter(k => k.startsWith('images.')).map(k => (
                                    <p key={k} className="text-sm text-red-500">{errors[k as keyof typeof errors]}</p>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Type & Specific Details</CardTitle>
                                <CardDescription>Select whether this is an animal or a product.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="product" value={data.type} onValueChange={(v) => setData('type', v)}>
                                    <TabsList className="grid w-full grid-cols-2 mb-6">
                                        <TabsTrigger value="product">Product</TabsTrigger>
                                        <TabsTrigger value="animal">Animal</TabsTrigger>
                                    </TabsList>
                                    
                                    <TabsContent value="product" className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="sku">SKU</Label>
                                                <Input 
                                                    id="sku" 
                                                    value={data.details.sku} 
                                                    onChange={(e) => setData('details', { ...data.details, sku: e.target.value })} 
                                                    placeholder="Product SKU"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="barcode">Barcode</Label>
                                                <Input 
                                                    id="barcode" 
                                                    value={data.details.barcode} 
                                                    onChange={(e) => setData('details', { ...data.details, barcode: e.target.value })} 
                                                    placeholder="UPC/EAN Barcode"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="detail_brand">Product Brand</Label>
                                                <Input 
                                                    id="detail_brand" 
                                                    value={data.details.brand} 
                                                    onChange={(e) => setData('details', { ...data.details, brand: e.target.value })} 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="prod_weight">Weight (kg)</Label>
                                                <Input 
                                                    id="prod_weight" 
                                                    type="number"
                                                    step="0.01"
                                                    value={data.details.weight} 
                                                    onChange={(e) => setData('details', { ...data.details, weight: e.target.value })} 
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="size">Size / Dimensions</Label>
                                            <Input 
                                                id="size" 
                                                value={data.details.size} 
                                                onChange={(e) => setData('details', { ...data.details, size: e.target.value })} 
                                                placeholder="e.g., 50x40x30 cm"
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="animal" className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Species</Label>
                                                <Select value={data.details.species_id} onValueChange={(v) => setData('details', { ...data.details, species_id: v })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select species" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {species.map((s) => (
                                                            <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Breed</Label>
                                                <Select value={data.details.breed_id} onValueChange={(v) => setData('details', { ...data.details, breed_id: v })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select breed" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {breeds.filter(b => !data.details.species_id || b.species_id.toString() === data.details.species_id).map((b) => (
                                                            <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                <Select value={data.details.gender} onValueChange={(v) => setData('details', { ...data.details, gender: v })}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="unknown">Unknown</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age (Months)</Label>
                                                <Input 
                                                    id="age" 
                                                    type="number"
                                                    value={data.details.age_months} 
                                                    onChange={(e) => setData('details', { ...data.details, age_months: e.target.value })} 
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-6 pt-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="vaccinated" 
                                                    checked={data.details.vaccinated}
                                                    onCheckedChange={(checked) => setData('details', { ...data.details, vaccinated: !!checked })}
                                                />
                                                <Label htmlFor="vaccinated" className="cursor-pointer">Vaccinated</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="trained" 
                                                    checked={data.details.trained}
                                                    onCheckedChange={(checked) => setData('details', { ...data.details, trained: !!checked })}
                                                />
                                                <Label htmlFor="trained" className="cursor-pointer">Trained</Label>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory & Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input 
                                        id="price" 
                                        type="number" 
                                        step="0.01" 
                                        value={data.price} 
                                        onChange={(e) => setData('price', e.target.value)} 
                                    />
                                    {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stock Quantity</Label>
                                    <Input 
                                        id="stock" 
                                        type="number" 
                                        value={data.stock} 
                                        onChange={(e) => setData('stock', e.target.value)} 
                                    />
                                    {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Brand</Label>
                                    <Select value={data.brand_id} onValueChange={(v) => setData('brand_id', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem key={brand.id} value={brand.id.toString()}>{brand.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.brand_id && <p className="text-sm text-red-500">{errors.brand_id}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`cat-${cat.id}`} 
                                                checked={data.categories.includes(cat.id.toString())}
                                                onCheckedChange={() => toggleCategory(cat.id.toString())}
                                            />
                                            <Label htmlFor={`cat-${cat.id}`} className="cursor-pointer">{cat.name}</Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.categories && <p className="text-sm text-red-500 mt-2">{errors.categories}</p>}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="unavailable">Unavailable</SelectItem>
                                        <SelectItem value="backordered">Backordered</SelectItem>
                                        <SelectItem value="sold">Sold (Animal)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
