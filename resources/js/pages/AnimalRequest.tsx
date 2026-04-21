import { Head } from "@inertiajs/react";
import GuestLayout from "@/layouts/guest-layout";
import { AnimalRequestHero } from "@/ecommerce/components/sections/AnimalRequestHero";
import { AnimalRequestForm } from "@/ecommerce/components/sections/AnimalRequestForm";

export default function AnimalRequest({ page }: { page?: any }) {
    return (
        <>
            <Head title="Request a Pet - Castle Pets" />
            <main className="flex-1 w-full overflow-x-hidden bg-background">
                <AnimalRequestHero data={page?.active_sections?.find((s: any) => s.type === 'animal_request_hero')?.data || {}} />
                <div className="mt-8">
                    <AnimalRequestForm />
                </div>
            </main>
        </>
    );
}

AnimalRequest.layout = (page: React.ReactNode) => <GuestLayout children={page} />;
