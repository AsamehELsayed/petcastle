import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Loader2, Plus, Trash, Paintbrush, FileText, Code2, Database } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

interface SectionEditorProps {
    section: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function SectionEditor({ section, isOpen, onClose }: SectionEditorProps) {
    const { data, setData, put, processing, reset } = useForm({
        data: section?.data || {},
        is_active: section?.is_active ?? true,
    });

    // Reset form when section changes
    useEffect(() => {
        if (section) {
            setData({
                data: {
                    ...section.data,
                    bgColor: section.data?.bgColor || '',
                    paddingTop: section.data?.paddingTop || '12',
                    paddingBottom: section.data?.paddingBottom || '12',
                    textAlign: section.data?.textAlign || 'left',
                    customClasses: section.data?.customClasses || '',
                    customCss: section.data?.customCss || '',
                },
                is_active: section.is_active ?? true,
            });
        }
    }, [section]);

    const handleJsonUpdate = (val: string) => {
        try {
            const parsed = JSON.parse(val);
            setData('data', parsed);
        } catch (e) {
            // Silence parse errors while typing
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!section) return;

        put(route('admin.cms.sections.update', section.id), {
            onSuccess: () => {
                onClose();
            },
            preserveScroll: true,
        });
    };

    if (!section) return null;

    const renderContentFields = () => {
        switch (section.type) {
            case 'hero':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.data.title || ''}
                                onChange={(e) => setData('data', { ...data.data, title: e.target.value })}
                                placeholder="Hero Title"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Textarea
                                id="subtitle"
                                value={data.data.subtitle || ''}
                                onChange={(e) => setData('data', { ...data.data, subtitle: e.target.value })}
                                placeholder="Hero Subtitle"
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="button_text">Button Text</Label>
                                <Input
                                    id="button_text"
                                    value={data.data.button_text || ''}
                                    onChange={(e) => setData('data', { ...data.data, button_text: e.target.value })}
                                    placeholder="Shop Now"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="button_link">Button Link</Label>
                                <Input
                                    id="button_link"
                                    value={data.data.button_link || ''}
                                    onChange={(e) => setData('data', { ...data.data, button_link: e.target.value })}
                                    placeholder="/products"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Background Image URL</Label>
                            <Input
                                id="image"
                                value={data.data.image || ''}
                                onChange={(e) => setData('data', { ...data.data, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label>Rich Text Content</Label>
                            <RichTextEditor
                                value={data.data.content || ''}
                                onChange={(content) => setData('data', { ...data.data, content })}
                            />
                        </div>
                    </div>
                );
            case 'html':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="html">Raw HTML / Tailwind CSS</Label>
                            <Textarea
                                id="html"
                                className="font-mono text-xs bg-muted/30"
                                rows={16}
                                value={data.data.html || ''}
                                onChange={(e) => setData('data', { ...data.data, html: e.target.value })}
                                placeholder="<div class='bg-red-500 p-4 text-white'>\n  <h2 class='text-xl font-bold'>Custom Block</h2>\n</div>"
                            />
                        </div>
                    </div>
                );
            case 'features':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="features_title">Section Title</Label>
                            <Input
                                id="features_title"
                                value={data.data.title || ''}
                                onChange={(e) => setData('data', { ...data.data, title: e.target.value })}
                                placeholder="Our Features"
                            />
                        </div>
                        <div className="space-y-4 pt-4 border-t mt-4">
                            <div className="flex items-center justify-between">
                                <Label>Features List</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const features = [...(data.data.features || []), { title: 'New Feature', description: '' }];
                                        setData('data', { ...data.data, features });
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-1" /> Add Feature
                                </Button>
                            </div>
                            {(data.data.features || []).map((feature: any, index: number) => (
                                <div key={index} className="grid gap-3 p-4 border rounded relative group bg-muted/10">
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => {
                                                const features = data.data.features.filter((_: any, i: number) => i !== index);
                                                setData('data', { ...data.data, features });
                                            }}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-1 pr-8">
                                        <Label className="text-xs">Feature Title</Label>
                                        <Input
                                            value={feature.title}
                                            onChange={(e) => {
                                                const features = [...data.data.features];
                                                features[index].title = e.target.value;
                                                setData('data', { ...data.data, features });
                                            }}
                                            placeholder="Feature Name"
                                        />
                                    </div>
                                    <div className="space-y-1 pr-8">
                                        <Label className="text-xs">Description</Label>
                                        <Textarea
                                            value={feature.description}
                                            onChange={(e) => {
                                                const features = [...data.data.features];
                                                features[index].description = e.target.value;
                                                setData('data', { ...data.data, features });
                                            }}
                                            placeholder="Feature Description"
                                            rows={2}
                                            className="text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'ecommerce_hero':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label>Banner Small Badge</Label>
                            <Input
                                value={data.data.banner_badge || ''}
                                onChange={(e) => setData('data', { ...data.data, banner_badge: e.target.value })}
                                placeholder="BIGGEST SALE OF THE YEAR"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Main Title (Use <br /> for breaks)</Label>
                            <Input
                                value={data.data.title || ''}
                                onChange={(e) => setData('data', { ...data.data, title: e.target.value })}
                                placeholder="WOW <br /> SALE"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Promo Badge (e.g. 70% OFF)</Label>
                                <Input
                                    value={data.data.promo_badge || ''}
                                    onChange={(e) => setData('data', { ...data.data, promo_badge: e.target.value })}
                                    placeholder="UP TO 70% OFF"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Sub-Banner Text</Label>
                                <Input
                                    value={data.data.subtitle || ''}
                                    onChange={(e) => setData('data', { ...data.data, subtitle: e.target.value })}
                                    placeholder="MAR 28 - APR 5 • ALL TOP BRANDS"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pb-2 border-b">
                            <div className="space-y-2">
                                <Label>Button 1 Text</Label>
                                <Input
                                    value={data.data.btn1_text || ''}
                                    onChange={(e) => setData('data', { ...data.data, btn1_text: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Button 1 Link</Label>
                                <Input
                                    value={data.data.btn1_link || ''}
                                    onChange={(e) => setData('data', { ...data.data, btn1_link: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Button 2 Text</Label>
                                <Input
                                    value={data.data.btn2_text || ''}
                                    onChange={(e) => setData('data', { ...data.data, btn2_text: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Button 2 Link</Label>
                                <Input
                                    value={data.data.btn2_link || ''}
                                    onChange={(e) => setData('data', { ...data.data, btn2_link: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'coupon_strip':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Promo Highlight (e.g. 15% OFF)</Label>
                                <Input
                                    value={data.data.promo_highlight || ''}
                                    onChange={(e) => setData('data', { ...data.data, promo_highlight: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Coupon Code</Label>
                                <Input
                                    value={data.data.code || ''}
                                    onChange={(e) => setData('data', { ...data.data, code: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Full Sentence Title</Label>
                            <Input
                                value={data.data.title || ''}
                                onChange={(e) => setData('data', { ...data.data, title: e.target.value })}
                                placeholder="GET 15% OFF ON YOUR FIRST ORDER"
                            />
                        </div>
                    </div>
                );
            case 'shop_by_pet':
            case 'shop_by_category':
            case 'deals_slider':
            case 'trending_grid':
                return (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label>Section Title</Label>
                            <Input
                                value={data.data.title || ''}
                                onChange={(e) => setData('data', { ...data.data, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Subheader / Description</Label>
                            <Input
                                value={data.data.subtitle || ''}
                                onChange={(e) => setData('data', { ...data.data, subtitle: e.target.value })}
                            />
                        </div>
                    </div>
                );
            case 'promo_cards':
                return (
                    <div className="space-y-6 pt-2">
                        <div className="p-4 border rounded bg-muted/20 space-y-3">
                            <h4 className="font-bold text-sm border-b pb-1">Card 1</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <Input placeholder="Label" value={data.data.card1_label || ''} onChange={(e) => setData('data', { ...data.data, card1_label: e.target.value })} />
                                <Input placeholder="Title" value={data.data.card1_title || ''} onChange={(e) => setData('data', { ...data.data, card1_title: e.target.value })} />
                            </div>
                            <Input placeholder="Promo Text" value={data.data.card1_promo || ''} onChange={(e) => setData('data', { ...data.data, card1_promo: e.target.value })} />
                            <Input placeholder="Image URL" value={data.data.card1_image || ''} onChange={(e) => setData('data', { ...data.data, card1_image: e.target.value })} />
                        </div>
                        <div className="p-4 border rounded bg-muted/20 space-y-3">
                            <h4 className="font-bold text-sm border-b pb-1">Card 2</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <Input placeholder="Label" value={data.data.card2_label || ''} onChange={(e) => setData('data', { ...data.data, card2_label: e.target.value })} />
                                <Input placeholder="Title" value={data.data.card2_title || ''} onChange={(e) => setData('data', { ...data.data, card2_title: e.target.value })} />
                            </div>
                            <Input placeholder="Promo Text" value={data.data.card2_promo || ''} onChange={(e) => setData('data', { ...data.data, card2_promo: e.target.value })} />
                            <Input placeholder="Image URL" value={data.data.card2_image || ''} onChange={(e) => setData('data', { ...data.data, card2_image: e.target.value })} />
                        </div>
                    </div>
                );
            case 'trust_banner':
                return (
                    <div className="space-y-4 pt-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="grid grid-cols-2 gap-4 p-3 border rounded">
                                <Input placeholder={`Item ${i} Title`} value={data.data[`item${i}_title`] || ''} onChange={(e) => setData('data', { ...data.data, [`item${i}_title`]: e.target.value })} />
                                <Input placeholder={`Item ${i} Desc`} value={data.data[`item${i}_desc`] || ''} onChange={(e) => setData('data', { ...data.data, [`item${i}_desc`]: e.target.value })} />
                            </div>
                        ))}
                    </div>
                );
            default:
                return (
                    <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded text-sm mt-4">
                        Unsupported section type: {section.type}
                    </div>
                );
        }
    };

    const renderStylingFields = () => {
        return (
            <div className="space-y-6 pt-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="bgColor">Background Color (Hex/Tailwind class)</Label>
                        <div className="flex gap-2">
                            <Input
                                id="bgColor"
                                type="text"
                                value={data.data.bgColor || ''}
                                onChange={(e) => setData('data', { ...data.data, bgColor: e.target.value })}
                                placeholder="#ffffff or bg-slate-50"
                            />
                            {data.data.bgColor?.startsWith('#') && (
                                <div 
                                    className="w-10 h-10 rounded border shrink-0" 
                                    style={{ backgroundColor: data.data.bgColor }} 
                                />
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="textAlign">Global Text Alignment</Label>
                        <Select 
                            value={data.data.textAlign || 'left'} 
                            onValueChange={(val) => setData('data', { ...data.data, textAlign: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Left" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="paddingTop">Padding Top (Tailwind spacing: 0-32)</Label>
                        <Input
                            id="paddingTop"
                            type="number"
                            min="0"
                            max="64"
                            value={data.data.paddingTop || '12'}
                            onChange={(e) => setData('data', { ...data.data, paddingTop: e.target.value })}
                        />
                         <p className="text-[10px] text-muted-foreground mr-1">eg. 12 = py-12 / 3rem</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paddingBottom">Padding Bottom (Tailwind spacing: 0-32)</Label>
                        <Input
                            id="paddingBottom"
                            type="number"
                            min="0"
                            max="64"
                            value={data.data.paddingBottom || '12'}
                            onChange={(e) => setData('data', { ...data.data, paddingBottom: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="customClasses">Custom Container Classes (Tailwind)</Label>
                    <Input
                        id="customClasses"
                        value={data.data.customClasses || ''}
                        onChange={(e) => setData('data', { ...data.data, customClasses: e.target.value })}
                        placeholder="border-b shadow-sm max-w-5xl mx-auto"
                        className="font-mono text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="customCss">Raw Developer CSS</Label>
                    <Textarea
                        id="customCss"
                        className="font-mono text-xs bg-muted/30"
                        rows={8}
                        value={data.data.customCss || ''}
                        onChange={(e) => setData('data', { ...data.data, customCss: e.target.value })}
                        placeholder=".section-inside {\n  filter: grayscale(1);\n}"
                    />
                </div>
            </div>
        );
    };

    const renderJsonTab = () => {
        return (
            <div className="space-y-4 pt-2 h-full flex flex-col">
                <Label>Direct JSON State Editor</Label>
                <Textarea
                    className="font-mono text-xs bg-muted/30 flex-1 min-h-[300px]"
                    value={JSON.stringify(data.data, null, 2)}
                    onChange={(e) => handleJsonUpdate(e.target.value)}
                />
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                <form onSubmit={handleSubmit} className="flex flex-col h-full border-0">
                    <DialogHeader className="p-6 pb-2 border-b">
                        <DialogTitle className="flex flex-row items-center justify-between">
                            <span className="flex items-center gap-2">
                                Edit Section: <span className="uppercase text-primary">{section.type}</span>
                            </span>
                            <div className="flex items-center gap-2 text-sm font-normal">
                                <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer mt-0.5"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            Configure the block content and visual style.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="overflow-y-auto px-6 py-4 flex-1">
                        <Tabs defaultValue="content" className="w-full h-full flex flex-col">
                            <TabsList className="grid w-full grid-cols-3 mb-4 shrink-0">
                                <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2" /> Content</TabsTrigger>
                                <TabsTrigger value="styling"><Paintbrush className="w-4 h-4 mr-2" /> Styling & Layout</TabsTrigger>
                                <TabsTrigger value="json"><Database className="w-4 h-4 mr-2" /> Dev: JSON</TabsTrigger>
                            </TabsList>
                            <div className="flex-1 overflow-y-auto min-h-0">
                                <TabsContent value="content" className="focus:outline-none focus:ring-0 mt-0">
                                    {renderContentFields()}
                                </TabsContent>
                                <TabsContent value="styling" className="focus:outline-none focus:ring-0 mt-0">
                                    {renderStylingFields()}
                                </TabsContent>
                                <TabsContent value="json" className="focus:outline-none focus:ring-0 mt-0 h-full">
                                    {renderJsonTab()}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    <DialogFooter className="p-4 border-t bg-muted/30 shrink-0">
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Section
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
