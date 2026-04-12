import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: LinkItem[];
    className?: string;
}

export default function Pagination({ links, className }: PaginationProps) {
    if (links.length <= 3) return null; // Don't show if only 1 page

    return (
        <div className={cn("flex flex-wrap justify-center items-center gap-1 py-4", className)}>
            {links.map((link, index) => {
                if (link.url === null) {
                    return (
                        <span
                            key={index}
                            className="px-4 py-2 text-sm text-muted-foreground border rounded-md cursor-not-allowed opacity-50 bg-background"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                const isPrev = link.label.includes('Previous');
                const isNext = link.label.includes('Next');

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={cn(
                            "px-4 py-2 text-sm border rounded-md transition-colors hover:bg-accent",
                            link.active ? "bg-primary text-primary-foreground border-primary pointer-events-none" : "bg-background",
                            (isPrev || isNext) && "flex items-center gap-1"
                        )}
                        preserveScroll
                        dangerouslySetInnerHTML={{ 
                            __html: isPrev ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m15 18-6-6 6-6"/></svg> Previous` : 
                                     isNext ? `Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m9 18 6-6-6-6"/></svg>` : 
                                     link.label 
                        }}
                    />
                );
            })}
        </div>
    );
}
