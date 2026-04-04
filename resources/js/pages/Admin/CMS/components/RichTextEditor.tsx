import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Link } from '@tiptap/extension-link';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Link as LinkIcon, Palette } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'min-h-[150px] p-3 focus:outline-none prose prose-sm sm:prose-base dark:prose-invert max-w-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-shadow">
            <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/30 rounded-t-lg">
                <ToggleGroup type="multiple" className="justify-start">
                    <ToggleGroupItem 
                        value="bold" 
                        aria-label="Toggle bold"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        data-state={editor.isActive('bold') ? 'on' : 'off'}
                        className="h-8 w-8 p-0"
                    >
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                        value="italic" 
                        aria-label="Toggle italic"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        data-state={editor.isActive('italic') ? 'on' : 'off'}
                        className="h-8 w-8 p-0"
                    >
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                        value="strike" 
                        aria-label="Toggle strike"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        data-state={editor.isActive('strike') ? 'on' : 'off'}
                        className="h-8 w-8 p-0"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
                
                <div className="w-px h-4 bg-border mx-1" />
                
                <ToggleGroup type="single" className="justify-start">
                    <ToggleGroupItem 
                        value="h1" 
                        aria-label="Toggle H1"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        data-state={editor.isActive('heading', { level: 1 }) ? 'on' : 'off'}
                        className="h-8 w-8 p-0 font-bold"
                    >
                        H1
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                        value="h2" 
                        aria-label="Toggle H2"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
                        className="h-8 w-8 p-0 font-bold"
                    >
                        H2
                    </ToggleGroupItem>
                </ToggleGroup>
                
                <div className="w-px h-4 bg-border mx-1" />
                
                <ToggleGroup type="multiple" className="justify-start">
                    <ToggleGroupItem 
                        value="bulletList" 
                        aria-label="Toggle bullet list"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        data-state={editor.isActive('bulletList') ? 'on' : 'off'}
                        className="h-8 w-8 p-0"
                    >
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                        value="orderedList" 
                        aria-label="Toggle ordered list"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        data-state={editor.isActive('orderedList') ? 'on' : 'off'}
                        className="h-8 w-8 p-0"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
                
                <div className="w-px h-4 bg-border mx-1" />
                
                <button 
                    type="button"
                    onClick={setLink} 
                    className={`inline-flex items-center justify-center rounded-sm h-8 w-8 hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring ${editor.isActive('link') ? 'bg-primary/20 text-primary' : ''}`}
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
                
                <Popover>
                    <PopoverTrigger asChild>
                        <button type="button" className="inline-flex items-center justify-center rounded-sm h-8 w-8 hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring">
                            <Palette className="h-4 w-4" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2" align="start">
                        <div className="flex gap-1">
                            {['#000000', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'].map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className="w-6 h-6 rounded-full border border-border shadow-sm"
                                    style={{ backgroundColor: color }}
                                    onClick={() => editor.chain().focus().setColor(color).run()}
                                />
                            ))}
                            <button
                                type="button"
                                className="w-6 h-6 rounded-full border border-border shadow-sm flex items-center justify-center bg-muted text-[10px]"
                                onClick={() => editor.chain().focus().unsetColor().run()}
                            >
                                ✕
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <EditorContent editor={editor} className="overflow-hidden bg-background rounded-b-lg" />
            <style dangerouslySetInnerHTML={{__html: `
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: hsl(var(--muted-foreground));
                    pointer-events: none;
                    height: 0;
                }
            `}} />
        </div>
    );
}
