import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash, Edit, Tags, Target, Dog, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taxonomy',
        href: '/admin/categories',
    },
];

export default function Index({ categories, brands, species }: { categories: any[], brands: any[], species: any[] }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [activeType, setActiveType] = useState<string>('category');

    const handleAdd = (type: string) => {
        setActiveType(type);
        setEditingItem(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (type: string, item: any) => {
        setActiveType(type);
        setEditingItem(item);
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Taxonomy Management" />
            
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Taxonomy
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl text-balance">
                        Manage your store's classification systems, from product brands to biological species and breeds.
                    </p>
                </div>

                <Tabs defaultValue="categories" className="w-full" onValueChange={v => setActiveType(v as string)}>
                    <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted/50 p-1 text-muted-foreground w-full max-w-2xl border border-border/50">
                        <TabsTrigger value="categories" className="rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Tags className="mr-2 h-4 w-4" /> Categories</TabsTrigger>
                        <TabsTrigger value="brands" className="rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Award className="mr-2 h-4 w-4" /> Brands</TabsTrigger>
                        <TabsTrigger value="species" className="rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Dog className="mr-2 h-4 w-4" /> Species</TabsTrigger>
                        <TabsTrigger value="breeds" className="rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Target className="mr-2 h-4 w-4" /> Breeds</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="categories" className="mt-8 focus-visible:outline-none">
                        <TaxonomyTable 
                            title="Categories" 
                            items={categories} 
                            species={species} 
                            type="category" 
                            onAdd={() => handleAdd('category')} 
                            onEdit={(item) => handleEdit('category', item)} 
                        />
                    </TabsContent>
                    
                    <TabsContent value="brands" className="mt-8 focus-visible:outline-none">
                        <TaxonomyTable 
                            title="Brands" 
                            items={brands} 
                            species={species} 
                            type="brand" 
                            onAdd={() => handleAdd('brand')} 
                            onEdit={(item) => handleEdit('brand', item)} 
                        />
                    </TabsContent>
                    
                    <TabsContent value="species" className="mt-8 focus-visible:outline-none">
                        <TaxonomyTable 
                            title="Species" 
                            items={species} 
                            species={species} 
                            type="species" 
                            onAdd={() => handleAdd('species')} 
                            onEdit={(item) => handleEdit('species', item)} 
                        />
                    </TabsContent>
                    
                    <TabsContent value="breeds" className="mt-8 focus-visible:outline-none">
                        <TaxonomyTable 
                            title="Breeds" 
                            items={species.flatMap((s: any) => s.breeds.map((b: any) => ({ ...b, species_name: s.name })))} 
                            species={species}
                            type="breed" 
                            extraColumns={['Species']}
                            onAdd={() => handleAdd('breed')} 
                            onEdit={(item) => handleEdit('breed', item)} 
                        />
                    </TabsContent>
                </Tabs>
            </div>

            <TaxonomyDialog 
                type={activeType} 
                item={editingItem} 
                species={species} 
                isOpen={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
            />
        </AdminLayout>
    );
}

function TaxonomyDialog({ 
    type, 
    item, 
    species, 
    isOpen, 
    onOpenChange 
}: { 
    type: string, 
    item?: any, 
    species: any[], 
    isOpen: boolean, 
    onOpenChange: (open: boolean) => void 
}) {
    const isEditing = !!item;
    const { data, setData, post, put, processing, errors, reset, transform } = useForm({
        id: item?.id || null,
        name: item?.name || '',
        species_id: item?.species_id || '',
        type: type,
        image: null as File | null,
    });

    useEffect(() => {
        if (isOpen) {
            setData({
                id: item?.id || null,
                name: item?.name || '',
                species_id: item?.species_id?.toString() || '',
                type: type,
                image: null,
            });
        } else {
            // Keep the type even on reset to ensure we submit to the right model
            reset();
            setData('type', type);
        }
    }, [isOpen, item, type]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
            forceFormData: true,
        };

        if (isEditing && data.id) {
            // Use post with _method put for file uploads in Laravel
            transform((data) => ({
                ...data,
                _method: 'put',
            }));
            post(`/admin/categories/${data.id}`, options);
        } else if (!isEditing) {
            post('/admin/categories', options);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border border-border shadow-2xl bg-white rounded-2xl">
                <form onSubmit={onSubmit}>
                    <div className="p-8 space-y-8">
                        <DialogHeader className="space-y-3">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                                {isEditing ? <Edit className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                            </div>
                            <DialogTitle className="text-3xl font-extrabold tracking-tight">
                                {isEditing ? 'Edit' : 'New'} {type.charAt(0).toUpperCase() + type.slice(1)}
                            </DialogTitle>
                            <DialogDescription className="text-base text-muted-foreground/70 leading-relaxed">
                                {isEditing 
                                    ? `Refine the details for this ${type.toLowerCase()} system below.` 
                                    : `Configure a new ${type.toLowerCase()} to expand your store catalog.`}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-sm font-bold text-foreground/80 ml-1 uppercase tracking-wider">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder={`e.g., ${type === 'brand' ? 'Purina' : type === 'species' ? 'Canine' : 'German Shepherd'}`}
                                    className="h-12 px-4 bg-background/50 border-border/40 rounded-xl focus:ring-primary/20 transition-all text-base"
                                />
                                {errors.name && (
                                    <p className="text-sm font-semibold text-destructive ml-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {type === 'breed' && (
                                <div className="space-y-3">
                                    <Label htmlFor="species_id" className="text-sm font-bold text-foreground/80 ml-1 uppercase tracking-wider">Associated Species</Label>
                                    <Select 
                                        value={data.species_id} 
                                        onValueChange={(v) => setData('species_id', v)}
                                    >
                                        <SelectTrigger className="h-12 px-4 bg-background/50 border-border/40 rounded-xl focus:ring-primary/20 transition-all text-base">
                                            <SelectValue placeholder="Select the species category" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/40">
                                            {species.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()} className="rounded-lg py-2.5">
                                                    {s.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.species_id && (
                                        <p className="text-sm font-semibold text-destructive ml-1">
                                            {errors.species_id}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-3">
                                <Label htmlFor="image" className="text-sm font-bold text-foreground/80 ml-1 uppercase tracking-wider">Photo</Label>
                                <div className="flex items-center gap-4">
                                    {item?.image_url && !data.image && (
                                        <div className="h-12 w-12 rounded-lg overflow-hidden border border-border/50 shadow-sm flex-shrink-0">
                                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className="h-12 px-4 bg-background/50 border-border/40 rounded-xl focus:ring-primary/20 transition-all text-base file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                    />
                                </div>
                                {errors.image && (
                                    <p className="text-sm font-semibold text-destructive ml-1">
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 p-6 bg-muted/30 border-t border-border/30">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => onOpenChange(false)}
                            className="h-12 px-6 rounded-xl font-bold text-muted-foreground hover:text-foreground transition-all"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all min-w-[140px]"
                        >
                            {isEditing ? 'Save Changes' : `Create ${type}`}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function TaxonomyTable({ 
    title, 
    items, 
    species, 
    type, 
    extraColumns = [], 
    onAdd, 
    onEdit 
}: { 
    title: string, 
    items: any[], 
    species: any[], 
    type: string, 
    extraColumns?: string[], 
    onAdd: () => void, 
    onEdit: (item: any) => void 
}) {
    const { delete: destroy, processing } = useForm();
    
    const handleDelete = (id: number) => {
        if (!id) return;
        if (confirm(`Are you sure you want to permanently remove this ${type.toLowerCase()}?`)) {
            destroy(`/admin/categories/${id}?type=${type}`);
        }
    };

    return (
        <Card className="border-none shadow-xl bg-card/60 backdrop-blur-sm overflow-hidden ring-1 ring-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8 pb-4">
                <div className="space-y-1.5">
                    <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground/70">
                        Total of {items.length} {title.toLowerCase()} configured.
                    </CardDescription>
                </div>
                <Button 
                    onClick={onAdd}
                    className="h-11 px-6 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20 transition-all"
                >
                    <Plus className="h-4 w-4" /> Add {type}
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="px-8 pb-8 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead className="w-16"></TableHead>
                                <TableHead className="h-14 font-bold text-foreground text-sm uppercase tracking-wider">Name</TableHead>
                                {extraColumns.map(col => (
                                    <TableHead key={col} className="h-14 font-bold text-foreground text-sm uppercase tracking-wider">{col}</TableHead>
                                ))}
                                <TableHead className="h-14 font-bold text-foreground text-sm uppercase tracking-wider text-right pr-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={extraColumns.length + 3} className="h-32 text-center text-muted-foreground italic">
                                        No {title.toLowerCase()} found in the system.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item, idx) => (
                                    <tr 
                                        key={item.id}
                                        className="group h-16 border-border/40 hover:bg-muted/30 transition-colors cursor-default"
                                    >
                                        <TableCell className="w-16 pl-4">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden border border-border/50 bg-muted/50 shadow-sm flex items-center justify-center">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="text-muted-foreground/30">
                                                        {type === 'category' ? <Tags className="h-4 w-4" /> : 
                                                         type === 'brand' ? <Award className="h-4 w-4" /> : 
                                                         type === 'species' ? <Dog className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-foreground/90 text-base">{item.name}</TableCell>
                                        {extraColumns.includes('Species') && (
                                            <TableCell>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                                    {item.species_name}
                                                </span>
                                            </TableCell>
                                        )}
                                        <TableCell className="text-right pr-4">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    onClick={() => onEdit(item)}
                                                    className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={processing}
                                                    className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </tr>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
