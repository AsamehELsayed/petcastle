import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { Layout, Type, Star, ShoppingBag, Ticket, PawPrint, LayoutGrid, CreditCard, Play, Grid, ShieldCheck, Code } from "lucide-react";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    pageId: number | null;
}

const sectionTypes = [
    { type: 'hero', label: 'Hero Section', description: 'Large headline with background image and CTA buttons', icon: Layout },
    { type: 'ecommerce_hero', label: 'Ecommerce Hero', description: 'Premium gradient hero with product feature and badges', icon: ShoppingBag },
    { type: 'coupon_strip', label: 'Coupon Strip', description: 'Highlight a promo code with a dashed border strip', icon: Ticket },
    { type: 'shop_by_pet', label: 'Shop by Pet', description: 'Grid of pet species/species categories', icon: PawPrint },
    { type: 'shop_by_category', label: 'Shop by Category', description: 'Visual grid of product categories', icon: LayoutGrid },
    { type: 'promo_cards', label: 'Promo Cards', description: 'Two large side-by-side promotional cards', icon: CreditCard },
    { type: 'deals_slider', label: 'Deals Slider', description: 'Horizontal scroller for flash deals with countdown', icon: Play },
    { type: 'trending_grid', label: 'Trending Grid', description: 'Grid of best-selling products with filters', icon: Grid },
    { type: 'trust_banner', label: 'Trust Banner', description: 'Core value propositions (Free shipping, etc.)', icon: ShieldCheck },
    { type: 'features', label: 'Features Grid', description: 'Showcase key benefits or services in a grid', icon: Star },
    { type: 'text', label: 'Rich Text', description: 'Free-form content with text, links, and formatting', icon: Type },
    { type: 'animal_request_hero', label: 'Animal Request Hero', description: 'Premium section to showcase animal sourcing services', icon: PawPrint },
    { type: 'html', label: 'Custom HTML', description: 'Directly inject custom HTML/Embed codes', icon: Code },
];

export default function SectionCreator({ isOpen, onClose, pageId }: Props) {
    const handleCreate = (type: string) => {
        if (!pageId) {
            toast.error("Please select a page first");
            return;
        }

        router.post(route('admin.cms.sections.store'), {
            page_id: pageId,
            type: type,
            is_deletable: true
        }, {
            onSuccess: () => {
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} section added`);
                onClose();
            },
            onError: () => {
                toast.error('Failed to add section');
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                    <DialogDescription>
                        Choose a section type to add to this page. You can customize the content after adding.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4 max-h-[60vh] overflow-y-auto pr-2">
                    {sectionTypes.map((item) => (
                        <button
                            key={item.type}
                            type="button"
                            onClick={() => handleCreate(item.type)}
                            className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-left group border-border/50"
                        >
                            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                <item.icon className="h-4 w-4" />
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="font-semibold text-sm truncate">{item.label}</h4>
                                <p className="text-[10px] text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <DialogFooter className="border-t pt-4">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
