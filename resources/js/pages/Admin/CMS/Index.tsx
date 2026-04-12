import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash, Edit, FileText, GripVertical, Settings, ChevronRight, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import SectionCreator from './components/SectionCreator';
import SectionEditor from './components/SectionEditor';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'CMS', href: '/admin/cms' },
];

export default function Index({ pages }: { pages: any[] }) {
    const [selectedPageId, setSelectedPageId] = useState<number | null>(pages[0]?.id || null);
    const [isCreatorOpen, setIsCreatorOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<any | null>(null);

    const selectedPage = pages.find((p) => p.id === selectedPageId) || null;

    // Use local state for sorting so it's snappy
    const [sections, setSections] = useState<any[]>([]);

    useEffect(() => {
        if (selectedPage) {
            // Sort sections by order
            const sorted = [...(selectedPage.sections || [])].sort((a, b) => a.order - b.order);
            setSections(sorted);
        } else {
            setSections([]);
        }
    }, [selectedPage]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        
        if (sourceIndex === destinationIndex) return;

        const newSections = Array.from(sections);
        const [reorderedItem] = newSections.splice(sourceIndex, 1);
        newSections.splice(destinationIndex, 0, reorderedItem);

        // Update local state immediately for visual snappiness
        setSections(newSections);

        // Formulate backend payload
        const orders = newSections.map((sec, index) => ({
            id: sec.id,
            order: index
        }));

        // Send to API
        router.post(route('admin.cms.sections.reorder'), { orders }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sections reordered successfully');
            },
            onError: () => {
                toast.error('Failed to reorder sections');
                // Revert to original if failed
                setSections([...(selectedPage?.sections || [])].sort((a, b) => a.order - b.order));
            }
        });
    };

    const handleDelete = (sectionId: number) => {
        if (!confirm('Are you sure you want to delete this section?')) return;
        
        router.delete(route('admin.cms.sections.destroy', sectionId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Section deleted successfully');
            }
        });
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="CMS Management" />
            
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">CMS Management</h1>
                        <p className="text-muted-foreground">Visually manage your page sections and content.</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-5">
                    {/* Left Sidebar: Pages */}
                    <div className="md:col-span-1 lg:col-span-1 space-y-4">
                        <Card className="border-border">
                            <CardHeader className="py-4">
                                <CardTitle className="text-sm">Store Pages</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/50">
                                    {pages.map((page) => (
                                        <button 
                                            key={page.id} 
                                            onClick={() => setSelectedPageId(page.id)}
                                            className={`w-full flex items-center justify-between p-4 text-left transition-colors focus:outline-none ${
                                                selectedPageId === page.id 
                                                ? 'bg-primary/10 border-r-2 border-r-primary' 
                                                : 'hover:bg-muted/50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className={`h-4 w-4 ${selectedPageId === page.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <div className="overflow-hidden">
                                                    <p className={`text-sm font-medium leading-none truncate ${selectedPageId === page.id ? 'text-primary' : ''}`}>
                                                        {page.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1 truncate">/{page.slug}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className={`h-4 w-4 ${selectedPageId === page.id ? 'text-primary opacity-100' : 'opacity-0'}`} />
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Main Area: Sections */}
                    <div className="md:col-span-3 lg:col-span-4 h-full">
                        {selectedPage ? (
                            <Card className="h-full border-border shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-muted/20">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            {selectedPage.title} <Badge variant="secondary">{sections.length}</Badge>
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Drag and drop to reorder visual sections on this page.
                                        </CardDescription>
                                    </div>
                                    <Button size="sm" onClick={() => setIsCreatorOpen(true)} className="gap-2 shrink-0">
                                        <Plus className="h-4 w-4" /> Add Section
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {sections.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-muted/10">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                <LayoutList className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-lg">No sections yet</h3>
                                            <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-4">
                                                This page is currently empty. Start building it by adding your first section.
                                            </p>
                                            <Button variant="outline" onClick={() => setIsCreatorOpen(true)}>
                                                <Plus className="mr-2 h-4 w-4" /> Add First Section
                                            </Button>
                                        </div>
                                    ) : (
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <Droppable droppableId="sections-list">
                                                {(provided) => (
                                                    <div 
                                                        {...provided.droppableProps} 
                                                        ref={provided.innerRef}
                                                        className="space-y-3"
                                                    >
                                                        {sections.map((section, index) => (
                                                            <Draggable key={section.id} draggableId={String(section.id)} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        className={`flex items-center justify-between p-4 bg-card border rounded-lg transition-all ${
                                                                            snapshot.isDragging ? 'shadow-lg border-primary/50 scale-[1.02] z-50' : 'hover:border-border/80'
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            <div 
                                                                                {...provided.dragHandleProps}
                                                                                className="p-1 rounded cursor-grab hover:bg-muted text-muted-foreground"
                                                                            >
                                                                                <GripVertical className="h-5 w-5" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-bold uppercase text-primary tracking-wider">{section.type}</p>
                                                                                <p className="text-xs text-muted-foreground max-w-md truncate">
                                                                                    {JSON.stringify(section.data).substring(0, 100)}...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge variant={section.is_active ? 'default' : 'secondary'} className="mr-4">
                                                                                {section.is_active ? 'Active' : 'Hidden'}
                                                                            </Badge>
                                                                            <Button 
                                                                                size="sm" 
                                                                                variant="outline" 
                                                                                className="h-8"
                                                                                onClick={() => setEditingSection(section)}
                                                                            >
                                                                                <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                                                                            </Button>
                                                                            {section.is_deletable && (
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="ghost" 
                                                                                    className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                                    onClick={() => handleDelete(section.id)}
                                                                                >
                                                                                  <Trash className="h-3.5 w-3.5" />
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="h-full flex items-center justify-center p-8 border rounded-lg bg-card text-muted-foreground shadow-sm">
                                <p>Select a page from the sidebar to manage its sections.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SectionCreator 
                isOpen={isCreatorOpen} 
                onClose={() => setIsCreatorOpen(false)} 
                pageId={selectedPageId} 
            />
            
            <SectionEditor 
                section={editingSection} 
                isOpen={!!editingSection} 
                onClose={() => setEditingSection(null)} 
            />
        </AdminLayout>
    );
}
