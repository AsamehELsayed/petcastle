import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/ecommerce/components/layout/Navbar";
import { Footer } from "@/ecommerce/components/layout/Footer";
import { CartDrawer } from "@/ecommerce/components/cart/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function GuestLayout({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="ecommerce-body guest-layout flex flex-col min-h-screen">
                <Navbar />
                {children}
                <Footer />
                <CartDrawer />
                <Toaster position="top-right" />
            </div>
        </QueryClientProvider>
    );
}
