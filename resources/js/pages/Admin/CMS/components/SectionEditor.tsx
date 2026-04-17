import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import { Plus, Trash2, Layout, Palette, Settings, AlignLeft, AlignCenter, AlignRight, Type as TypeIcon, Image as ImageIcon, Upload, X as ClearIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    section: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function SectionEditor({ section, isOpen, onClose }: Props) {
    const [data, setData] = useState<any>({});
    const [isActive, setIsActive] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [previews, setPreviews] = useState<Record<string, string>>({});

    useEffect(() => {
        if (section && isOpen) {
            setData(section.data || {});
            setIsActive(section.is_active ?? true);
            setPreviews({});
        }
    }, [section, isOpen]);

    const handleSave = () => {
        if (!section) return;

        setIsSaving(true);
        
        // We use router.post with _method: 'PUT' to support file uploads (FormData)
        router.post(route('admin.cms.sections.update', section.id), {
            _method: 'PUT',
            data,
            is_active: isActive
        }, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Section updated successfully');
                onClose();
            },
            onError: (err) => {
                console.error(err);
                toast.error('Failed to update section');
            },
            onFinish: () => setIsSaving(false)
        });
    };

    const updateData = (key: string, value: any) => {
        setData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (key: string, file: File | null) => {
        if (file) {
            updateData(key, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [key]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            updateData(key, null);
            setPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[key];
                return newPreviews;
            });
        }
    };

    const renderImageField = (key: string, label: string) => {
        const currentValue = data[key];
        const preview = previews[key] || (typeof currentValue === 'string' ? currentValue : null);

        return (
            <div className="space-y-2">
                <Label>{label}</Label>
                <div className="flex flex-col gap-3">
                    {preview && (
                        <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted group">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                type="button"
                                onClick={() => handleFileChange(key, null)}
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ClearIcon className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <label className="flex-1">
                            <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent hover:border-accent-foreground/50 transition-all">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Upload Image</span>
                            </div>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(key, e.target.files?.[0] || null)} 
                            />
                        </label>
                        <Input 
                            value={typeof currentValue === 'string' ? currentValue : ''} 
                            onChange={(e) => updateData(key, e.target.value)} 
                            placeholder="Or paste image URL..."
                            className="flex-1"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderHeroEditor = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                    id="title" 
                    value={data.title || ''} 
                    onChange={(e) => updateData('title', e.target.value)} 
                    placeholder="Main headline"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input 
                    id="subtitle" 
                    value={data.subtitle || ''} 
                    onChange={(e) => updateData('subtitle', e.target.value)} 
                    placeholder="Supporting text"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="button_text">Button Text</Label>
                    <Input 
                        id="button_text" 
                        value={data.button_text || ''} 
                        onChange={(e) => updateData('button_text', e.target.value)} 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="button_link">Button Link</Label>
                    <Input 
                        id="button_link" 
                        value={data.button_link || ''} 
                        onChange={(e) => updateData('button_link', e.target.value)} 
                    />
                </div>
            </div>
            {renderImageField('image', 'Hero Image')}
        </div>
    );

    const renderFeaturesEditor = () => {
        const features = data.features || [];
        
        const addFeature = () => {
            updateData('features', [...features, { title: 'New Feature', description: 'Description' }]);
        };

        const updateFeature = (index: number, field: string, value: string) => {
            const newFeatures = [...features];
            newFeatures[index] = { ...newFeatures[index], [field]: value };
            updateData('features', newFeatures);
        };

        const removeFeature = (index: number) => {
            updateData('features', features.filter((_: any, i: number) => i !== index));
        };

        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="feat_title">Section Title</Label>
                    <Input 
                        id="feat_title" 
                        value={data.title || ''} 
                        onChange={(e) => updateData('title', e.target.value)} 
                    />
                </div>
                
                <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                        <Label>Features List</Label>
                        <Button type="button" size="sm" variant="outline" onClick={addFeature}>
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add
                        </Button>
                    </div>
                    
                    {features.map((pkg: any, index: number) => (
                        <div key={index} className="p-3 border rounded-md space-y-3 relative group bg-muted/20">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="absolute top-1 right-1 h-7 w-7 p-0 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeFeature(index)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Feature Title</Label>
                                <Input 
                                    className="h-8 text-sm bg-background"
                                    value={pkg.title || ''} 
                                    onChange={(e) => updateFeature(index, 'title', e.target.value)} 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Description</Label>
                                <Input 
                                    className="h-8 text-sm bg-background"
                                    value={pkg.description || ''} 
                                    onChange={(e) => updateFeature(index, 'description', e.target.value)} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTextEditor = () => (
        <div className="space-y-4">
            <Label>Content</Label>
            <RichTextEditor 
                value={data.content || ''} 
                onChange={(content) => updateData('content', content)} 
            />
        </div>
    );

    const renderEcommerceHeroEditor = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Title (HTML supported)</Label>
                <Input value={data.title || ''} onChange={(e) => updateData('title', e.target.value)} placeholder="Title" />
            </div>
            <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={data.subtitle || ''} onChange={(e) => updateData('subtitle', e.target.value)} placeholder="Subtitle" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Promo Badge</Label>
                    <Input value={data.promo_badge || ''} onChange={(e) => updateData('promo_badge', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Banner Badge</Label>
                    <Input value={data.banner_badge || ''} onChange={(e) => updateData('banner_badge', e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Button 1 Text</Label>
                    <Input value={data.btn1_text || ''} onChange={(e) => updateData('btn1_text', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Button 1 Link</Label>
                    <Input value={data.btn1_link || ''} onChange={(e) => updateData('btn1_link', e.target.value)} />
                </div>
            </div>
            {renderImageField('image', 'Hero Image')}
        </div>
    );

    const renderCouponStripEditor = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                    <Label>Title Start</Label>
                    <Input value={data.title_start || ''} onChange={(e) => updateData('title_start', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Highlight</Label>
                    <Input value={data.promo_highlight || ''} onChange={(e) => updateData('promo_highlight', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Title End</Label>
                    <Input value={data.title_end || ''} onChange={(e) => updateData('title_end', e.target.value)} />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input value={data.code || ''} onChange={(e) => updateData('code', e.target.value)} />
            </div>
        </div>
    );

    const renderCollectionEditor = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Title</Label>
                <Input value={data.title || ''} onChange={(e) => updateData('title', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={data.subtitle || ''} onChange={(e) => updateData('subtitle', e.target.value)} />
            </div>
        </div>
    );

    const renderPromoCardsEditor = () => (
        <div className="space-y-6">
            {[1, 2].map((i) => (
                <div key={i} className="space-y-3 p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-bold text-sm">Promo Card {i}</h4>
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={data[`card${i}_title`] || ''} onChange={(e) => updateData(`card${i}_title`, e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Label</Label>
                        <Input value={data[`card${i}_label`] || ''} onChange={(e) => updateData(`card${i}_label`, e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Promo text</Label>
                        <Input value={data[`card${i}_promo`] || ''} onChange={(e) => updateData(`card${i}_promo`, e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Link</Label>
                        <Input value={data[`card${i}_link`] || ''} onChange={(e) => updateData(`card${i}_link`, e.target.value)} />
                    </div>
                    {renderImageField(`card${i}_image`, `Card ${i} Image`)}
                </div>
            ))}
        </div>
    );

    const renderTrustBannerEditor = () => (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2 p-3 border rounded-lg bg-muted/10">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] uppercase">Item {i} Title</Label>
                            <Input value={data[`item${i}_title`] || ''} onChange={(e) => updateData(`item${i}_title`, e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] uppercase">Item {i} Desc</Label>
                            <Input value={data[`item${i}_desc`] || ''} onChange={(e) => updateData(`item${i}_desc`, e.target.value)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderHtmlEditor = () => (
        <div className="space-y-4">
            <Label>Custom HTML</Label>
            <textarea 
                className="w-full min-h-[200px] p-3 rounded-md border bg-background font-mono text-sm"
                value={data.html || ''} 
                onChange={(e) => updateData('html', e.target.value)}
                placeholder="<div>...</div>"
            />
        </div>
    );

    const renderDesignTab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label className="text-base font-bold flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Background Styling
                </Label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Background Type</Label>
                        <Select 
                            value={data.bgColor?.startsWith('#') ? 'custom' : (data.bgColor || 'default')} 
                            onValueChange={(val) => val !== 'custom' && updateData('bgColor', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="bg-white">Solid White</SelectItem>
                                <SelectItem value="bg-muted">Light Gray</SelectItem>
                                <SelectItem value="bg-primary/5">Subtle Primary</SelectItem>
                                <SelectItem value="bg-secondary">Secondary</SelectItem>
                                <SelectItem value="bg-[#1E3A8A]">Deep Blue</SelectItem>
                                <SelectItem value="custom">Custom HEX</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>HEX Color</Label>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded border" style={{ backgroundColor: data.bgColor || '#ffffff' }} />
                            <Input 
                                value={data.bgColor || ''} 
                                onChange={(e) => updateData('bgColor', e.target.value)} 
                                placeholder="#FFFFFF"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-base font-bold flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Layout & Spacing
                </Label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Top Padding ({data.paddingTop || 6})</Label>
                        <Input 
                            type="number" 
                            value={data.paddingTop || 6} 
                            onChange={(e) => updateData('paddingTop', e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Bottom Padding ({data.paddingBottom || 6})</Label>
                        <Input 
                            type="number" 
                            value={data.paddingBottom || 6} 
                            onChange={(e) => updateData('paddingBottom', e.target.value)} 
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Text Alignment</Label>
                    <div className="flex bg-muted p-1 rounded-lg w-fit">
                        <Button 
                            variant={data.textAlign === 'left' || !data.textAlign ? 'secondary' : 'ghost'} 
                            size="sm"
                            onClick={() => updateData('textAlign', 'left')}
                            className="h-8 w-8 p-0"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant={data.textAlign === 'center' ? 'secondary' : 'ghost'} 
                            size="sm"
                            onClick={() => updateData('textAlign', 'center')}
                            className="h-8 w-8 p-0"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant={data.textAlign === 'right' ? 'secondary' : 'ghost'} 
                            size="sm"
                            onClick={() => updateData('textAlign', 'right')}
                            className="h-8 w-8 p-0"
                        >
                            <AlignRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-0.5">
                        <Label>Only Photo Mode</Label>
                        <p className="text-[10px] text-muted-foreground">Removes all text and containers.</p>
                    </div>
                    <Switch 
                        checked={data.only_photo || false} 
                        onCheckedChange={(val) => updateData('only_photo', val)} 
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label>Advanced: Custom CSS Classes</Label>
                <Input value={data.customClasses || ''} onChange={(e) => updateData('customClasses', e.target.value)} placeholder="e.g. shadow-xl rounded-2xl" />
            </div>
        </div>
    );

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-[500px] flex flex-col h-full p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        Edit Section: <span className="uppercase text-primary text-sm font-bold bg-primary/10 px-2 py-0.5 rounded">{section?.type}</span>
                    </SheetTitle>
                    <SheetDescription>
                        Make changes to the content of this visual section.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-hidden">
                    <Tabs defaultValue="content" className="h-full flex flex-col">
                        <div className="px-6 border-b">
                            <TabsList className="w-full justify-start rounded-none bg-transparent h-12 gap-6">
                                <TabsTrigger 
                                    value="content" 
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <TypeIcon className="h-4 w-4" /> Content
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="design"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <Palette className="h-4 w-4" /> Design
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="content" className="flex-1 overflow-y-auto p-6 mt-0 space-y-8 max-h-[calc(100vh-220px)]">
                                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Active Status</Label>
                                        <p className="text-sm text-muted-foreground">Toggle visibility on the page.</p>
                                    </div>
                                    <Switch 
                                        id="is_active" 
                                        checked={isActive} 
                                        onCheckedChange={setIsActive} 
                                    />
                                </div>

                                <div className="space-y-6">
                                    {section?.type === 'hero' && renderHeroEditor()}
                                    {section?.type === 'features' && renderFeaturesEditor()}
                                    {section?.type === 'text' && renderTextEditor()}
                                    {section?.type === 'ecommerce_hero' && renderEcommerceHeroEditor()}
                                    {section?.type === 'coupon_strip' && renderCouponStripEditor()}
                                    {(section?.type === 'shop_by_pet' || section?.type === 'shop_by_category' || section?.type === 'deals_slider' || section?.type === 'trending_grid') && renderCollectionEditor()}
                                    {section?.type === 'promo_cards' && renderPromoCardsEditor()}
                                    {section?.type === 'trust_banner' && renderTrustBannerEditor()}
                                </div>
                            </TabsContent>

                            <TabsContent value="design" className="flex-1 overflow-y-auto p-6 mt-0 max-h-[calc(100vh-220px)]">
                                {renderDesignTab()}
                            </TabsContent>
                    </Tabs>
                </div>

                <SheetFooter className="p-6 border-t bg-muted/20">
                    <div className="flex w-full gap-3">
                        <Button variant="outline" onClick={onClose} disabled={isSaving} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
