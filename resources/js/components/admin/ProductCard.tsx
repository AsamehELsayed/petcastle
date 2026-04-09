import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash, Eye, MoreVertical, Package, Dog } from 'lucide-react';
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
    id: number;
    name: string;
    type: string;
    price: string | number;
    stock: number;
    main_image: string | null;
    categories?: { name: string }[];
}

export default function ProductCard({ product }: { product: Product }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${product.id}`);
        }
    };

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(product.price));

    return (
        <Card className="overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative aspect-square bg-muted">
                {product.main_image ? (
                    <img
                        src={product.main_image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        {product.type === 'animal' ? <Dog size={48} /> : <Package size={48} />}
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge variant={product.type === 'animal' ? 'secondary' : 'default'} className="capitalize">
                        {product.type}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}`}>
                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={handleDelete}
                            >
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex flex-wrap gap-1 mb-2">
                    {product.categories?.slice(0, 2).map((cat, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">
                            {cat.name}
                        </Badge>
                    ))}
                    {(product.categories?.length || 0) > 2 && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            +{(product.categories?.length || 0) - 2}
                        </Badge>
                    )}
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-primary">
                        {formattedPrice}
                    </span>
                    <span className={`text-xs ${product.stock > 0 ? 'text-muted-foreground' : 'text-destructive font-semibold'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                        Edit
                    </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/admin/products/${product.id}`}>
                        View
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
