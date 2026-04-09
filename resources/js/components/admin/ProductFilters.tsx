import React from 'react';
import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce';

interface FilterProps {
    filters: {
        search?: string;
        type?: string;
        category_id?: string | number;
        brand_id?: string | number;
    };
    categories: { id: number; name: string }[];
    brands: { id: number; name: string }[];
}

export default function ProductFilters({ filters, categories, brands }: FilterProps) {
    const [search, setSearch] = React.useState(filters.search || '');
    const debouncedSearch = useDebounce(search, 500);

    const updateFilters = (newFilters: any) => {
        router.get(
            '/admin/products',
            { ...filters, ...newFilters },
            { preserveState: true, replace: true }
        );
    };

    React.useEffect(() => {
        if (debouncedSearch !== (filters.search || '')) {
            updateFilters({ search: debouncedSearch });
        }
    }, [debouncedSearch]);

    const handleTypeChange = (value: string) => {
        updateFilters({ type: value === 'all' ? null : value });
    };

    const handleCategoryChange = (value: string) => {
        updateFilters({ category_id: value === 'all' ? null : value });
    };

    const handleBrandChange = (value: string) => {
        updateFilters({ brand_id: value === 'all' ? null : value });
    };

    const clearFilters = () => {
        router.get('/admin/products', {}, { preserveState: true });
        setSearch('');
    };

    const hasFilters = filters.search || filters.type || filters.category_id || filters.brand_id;

    return (
        <div className="flex flex-wrap items-center gap-4 py-4">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            <Select value={filters.type || 'all'} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="animal">Animals</SelectItem>
                    <SelectItem value="product">Products</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.category_id?.toString() || 'all'} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={filters.brand_id?.toString() || 'all'} onValueChange={handleBrandChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                            {brand.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {hasFilters && (
                <Button variant="ghost" onClick={clearFilters} className="h-10 px-2 lg:px-3">
                    Reset
                    <X className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
