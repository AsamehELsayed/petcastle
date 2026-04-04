import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Type, Image as ImageIcon, LayoutList, Mail, AlignLeft } from 'lucide-react';
import { useForm } from '@inertiajs/react';

const sectionTypes = [
    { id: 'hero', title: 'Hero Section', description: 'Large prominent text and call to action.', icon: ImageIcon },
    { id: 'features', title: 'Features Grid', description: 'Display a list of features with icons.', icon: LayoutList },
    { id: 'text', title: 'Rich Text', description: 'Standard text content block.', icon: AlignLeft },
    { id: 'html', title: 'Custom HTML', description: 'Raw HTML and Tailwind CSS code.', icon: Type },
    { id: 'ecommerce_hero', title: 'WOW Sale Hero', description: 'Dynamic Ecommerce WOW SALE banner.', icon: ImageIcon },
    { id: 'coupon_strip', title: 'Coupon Strip', description: 'Dynamic full-width promo coupon bar.', icon: LayoutList },
    { id: 'shop_by_pet', title: 'Shop By Pet', description: 'Dynamic species grid loader.', icon: LayoutList },
    { id: 'shop_by_category', title: 'Shop By Category', description: 'Dynamic supplies grid loader.', icon: LayoutList },
    { id: 'promo_cards', title: 'Promo Cards', description: 'Dynamic 2-column brand promos.', icon: LayoutList },
    { id: 'deals_slider', title: 'Deals Slider', description: 'Deals of the day with countdown.', icon: LayoutList },
    { id: 'trending_grid', title: 'Trending Grid', description: 'Live trending products grid.', icon: LayoutList },
    { id: 'trust_banner', title: 'Trust Banner', description: 'Free delivery / Vet approved bar.', icon: LayoutList },
];

interface SectionCreatorProps {
    isOpen: boolean;
    onClose: () => void;
    pageId: number | null;
}

export default function SectionCreator({ isOpen, onClose, pageId }: SectionCreatorProps) {
    const { data, setData, post, processing, reset } = useForm({
        type: '',
        page_id: pageId,
    });

    // Update page_id if it changes
    if (data.page_id !== pageId) {
        setData('page_id', pageId);
    }

    const handleCreate = (typeId: string) => {
        data.type = typeId; // sync mutation for immediate post
        post(route('admin.cms.sections.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                    <DialogDescription>
                        Choose a section type to add to your page.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    {sectionTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <button
                                key={type.id}
                                disabled={processing}
                                onClick={() => handleCreate(type.id)}
                                className="flex flex-col items-start gap-2 p-4 text-left border rounded-lg hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <Icon className="h-6 w-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold text-sm">{type.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
