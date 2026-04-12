import React, { Suspense, lazy } from 'react';

// Lazy load section components for better performance
const components = {
    hero: lazy(() => import('@/components/cms/sections/HeroSection')),
    navbar: lazy(() => import('@/components/cms/sections/Navbar')),
    footer: lazy(() => import('@/components/cms/sections/Footer')),
    text: lazy(() => import('@/components/cms/sections/TextBlock')),
};

interface SectionProps {
    id: number;
    type: string;
    key: string;
    data: any;
}

interface CmsRendererProps {
    sections: SectionProps[];
}

const CmsRenderer: React.FC<CmsRendererProps> = ({ sections }) => {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="cms-content">
            {sections.map((section) => {
                const Component = components[section.type as keyof typeof components];
                
                if (!Component) {
                    console.warn(`CMS Component not found for type: ${section.type}`);
                    return null;
                }

                return (
                    <Suspense key={section.key || section.id} fallback={<div className="h-20 animate-pulse bg-gray-100 rounded-md m-4" />}>
                        <Component data={section.data} />
                    </Suspense>
                );
            })}
        </div>
    );
};

export default CmsRenderer;
