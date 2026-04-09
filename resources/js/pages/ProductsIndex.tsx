import { useState, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Filter, 
  Search, 
  X, 
  SlidersHorizontal, 
  LayoutGrid, 
  List,
  Dog,
  Cat,
  Bird,
  Fish,
  Settings2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Navbar } from "@/ecommerce/components/layout/Navbar";
import { Footer } from "@/ecommerce/components/layout/Footer";
import { ProductCard } from "@/ecommerce/components/ui/ProductCard";
import { CartDrawer } from "@/ecommerce/components/cart/CartDrawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare const route: any;

const queryClient = new QueryClient();

interface Props {
  items: {
    data: any[];
    links: any[];
    meta: any;
    current_page: number;
    last_page: number;
  };
  categories: any[];
  filters: {
    category?: string;
    search?: string;
    sort?: string;
  };
}

export default function ProductsIndex({ items, categories = [], filters = {} }: Props) {
  const [search, setSearch] = useState(filters.search || "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('products.index'), { ...filters, search }, { preserveState: true });
  };

  const handleSort = (sort: string) => {
    router.get(route('products.index'), { ...filters, sort }, { preserveState: true });
  };

  const handleCategory = (categorySlug: string | null) => {
    router.get(route('products.index'), { ...filters, category: categorySlug || undefined }, { preserveState: true });
  };

  const activeCategory = categories.find(c => c.slug === filters.category) || 
                         categories.flatMap(c => c.children || []).find(c => c.slug === filters.category);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#FDFDFF] selection:bg-primary/10 selection:text-primary">
        <Head title="Premium Pet Supplies - Castle Pets" />
        <Navbar />

        {/* Global Design System Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        </div>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          
          {/* Enhanced Header Section */}
          <div className="relative mb-16 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Premium Collection 2026</span>
            </motion.div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1E293B] leading-[0.9] tracking-tighter mb-6"
                >
                  {activeCategory ? activeCategory.name : (
                    <>
                      Curated <br /> Supplies
                    </>
                  )}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-muted-foreground/80 font-medium"
                >
                  Discover our world-class selection of pet essentials, vetted by professionals and loved by animals everywhere.
                </motion.p>
              </div>

              {/* Advanced Search Bar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full md:w-96"
              >
                <form onSubmit={handleSearch} className="group relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors" />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search our collection..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="relative w-full pl-14 pr-6 py-5 bg-transparent border-none rounded-2xl focus:ring-0 text-foreground font-semibold placeholder:text-muted-foreground/50 transition-all placeholder:font-medium"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Premium Breadcrumbs */}
            <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-sm font-bold tracking-wide">
                <Link href={route('home')} className="text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">Home</Link>
                <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
                <span className="text-primary bg-primary/5 px-3 py-1 rounded-lg">All Collections</span>
                {activeCategory && (
                  <>
                    <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
                    <span className="text-foreground">{activeCategory.name}</span>
                  </>
                )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Desktop - Ultra Premium Glass Design */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-32 space-y-10">
                
                {/* Collection Categories */}
                <div className="bg-white/40 backdrop-blur-xl border border-white p-2 rounded-[2rem] shadow-xl shadow-blue-900/5">
                  <div className="p-6">
                    <h3 className="text-xs font-black text-primary tracking-[0.2em] uppercase mb-6 opacity-60">Departments</h3>
                    <div className="space-y-1">
                        <button
                        onClick={() => handleCategory(null)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                            !filters.category ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" : "text-muted-foreground hover:bg-white hover:text-primary hover:shadow-lg hover:shadow-black/5"
                        }`}
                        >
                        <div className={`p-2 rounded-xl ${!filters.category ? "bg-white/20" : "bg-primary/5"}`}>
                            <LayoutGrid className="w-4 h-4" />
                        </div>
                        All Products
                        </button>

                        {categories.map(cat => (
                        <div key={cat.id} className="group/cat">
                            <button
                            onClick={() => handleCategory(cat.slug)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                                filters.category === cat.slug ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" : "text-muted-foreground hover:bg-white hover:text-primary hover:shadow-lg hover:shadow-black/5"
                            }`}
                            >
                            <div className={`p-2 rounded-xl transition-colors overflow-hidden ${filters.category === cat.slug ? "bg-white/20 text-white" : "bg-primary/5 text-primary group-hover/cat:bg-primary group-hover/cat:text-white"}`}>
                                {cat.image_url ? (
                                    <img src={cat.image_url} alt={cat.name} className="w-4 h-4 object-cover" />
                                ) : (
                                    cat.name === 'Dogs' ? <Dog className="w-4 h-4" /> : cat.name === 'Cats' ? <Cat className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />
                                )}
                            </div>
                            {cat.name}
                            </button>
                            
                            {cat.children && cat.children.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="ml-4 space-y-1 mt-1 border-l-2 border-primary/10 pl-4 py-2"
                            >
                                {cat.children.map((sub: any) => (
                                <button
                                    key={sub.id}
                                    onClick={() => handleCategory(sub.slug)}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-bold transition-all ${
                                    filters.category === sub.slug ? "text-primary bg-primary/5" : "text-muted-foreground/60 hover:text-primary hover:bg-primary/5"
                                    }`}
                                >
                                    {sub.name}
                                </button>
                                ))}
                            </motion.div>
                            )}
                        </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Refined Filter Group */}
                <div className="bg-[#1E3A8A] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                        <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-2xl font-display font-black leading-tight mb-2">Member <br /> Exclusive</h4>
                    <p className="text-white/60 text-sm font-medium mb-6 leading-relaxed">Join our club and get up to 20% off on your first recurring order.</p>
                    <button className="w-full bg-accent text-white py-4 rounded-2xl font-black text-sm tracking-wider shadow-lg shadow-accent/20 hover:scale-105 transition-transform">JOIN THE CLUB</button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/20 rounded-full blur-[60px]" />
                </div>
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1">
              
              {/* Refined Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 p-2 bg-white rounded-[1.5rem] border border-border/50 shadow-xl shadow-black/5">
                <div className="flex items-center gap-1 bg-secondary/30 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-white text-primary font-black text-[10px] sm:text-xs shadow-sm whitespace-nowrap"><LayoutGrid className="w-4 h-4" /> Grid</button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-muted-foreground font-bold text-[10px] sm:text-xs hover:bg-white mt-0 whitespace-nowrap"><List className="w-4 h-4" /> List</button>
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-primary font-bold text-[10px] sm:text-xs hover:bg-white whitespace-nowrap"
                  >
                    <Filter className="w-4 h-4" /> Filters
                  </button>
                </div>
                
                <div className="flex items-center gap-3 pr-4 w-full sm:w-auto justify-end">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Refine By</span>
                  <div className="relative group">
                    <select 
                        value={filters.sort || "newest"}
                        onChange={(e) => handleSort(e.target.value)}
                        className="bg-primary/5 border-none rounded-xl focus:ring-0 text-[13px] font-black text-primary py-2.5 pl-4 pr-10 appearance-none cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                        <option value="newest">Latest Arrivals</option>
                        <option value="price_low">Budget Friendly</option>
                        <option value="price_high">Luxury Choice</option>

                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active Filter Tags */}
              <AnimatePresence>
                {(filters.category || filters.search) && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-wrap gap-2 mb-10"
                    >
                    {filters.category && (
                        <div className="inline-flex items-center gap-3 bg-white border border-primary/20 pl-4 pr-2 py-2 rounded-2xl shadow-lg shadow-primary/5 group">
                        <span className="text-xs font-black text-primary/60 uppercase tracking-widest leading-none">Group:</span>
                        <span className="text-sm font-black text-primary leading-none uppercase">{activeCategory?.name}</span>
                        <button onClick={() => handleCategory(null)} className="p-1.5 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all"><X className="w-3 h-3" /></button>
                        </div>
                    )}
                    {filters.search && (
                        <div className="inline-flex items-center gap-3 bg-white border border-accent/20 pl-4 pr-2 py-2 rounded-2xl shadow-lg shadow-accent/5 group">
                        <span className="text-xs font-black text-accent/60 uppercase tracking-widest leading-none">Search:</span>
                        <span className="text-sm font-black text-accent leading-none">"{filters.search}"</span>
                        <button onClick={() => router.get(route('products.index'), { ...filters, search: undefined })} className="p-1.5 rounded-lg bg-accent/5 text-accent hover:bg-accent hover:text-white transition-all"><X className="w-3 h-3" /></button>
                        </div>
                    )}
                    </motion.div>
                )}
              </AnimatePresence>

              {/* Ultra High Fidelity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {items.data.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        delay: i * 0.04, 
                        type: "spring", 
                        damping: 25, 
                        stiffness: 200,
                        duration: 0.6
                      }}
                      className="h-full"
                    >
                      <ProductCard product={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Enhanced Empty State */}
              {items.data.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-32 text-center flex flex-col items-center bg-white rounded-[3rem] border border-dashed border-border/60"
                >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                    <div className="relative w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
                        <Search className="w-10 h-10 text-primary/20" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-display font-black text-[#1E293B] mb-4">No Matches Found</h3>
                  <p className="text-lg text-muted-foreground/60 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                    We couldn't find any products matching your specific selection at this time.
                  </p>
                  <button 
                    onClick={() => router.get(route('products.index'))}
                    className="group flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
                  >
                    RESET ALL DIALS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Premium Pagination */}
              {items.last_page > 1 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-3">
                    {Array.from({ length: items.last_page }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => router.get(route('products.index'), { ...filters, page }, { preserveState: true })}
                        className={`relative w-14 h-14 rounded-2xl font-black text-sm transition-all duration-300 group ${
                          items.current_page === page 
                            ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-110" 
                            : "bg-white border border-border/40 text-muted-foreground hover:border-primary hover:text-primary hover:shadow-xl hover:shadow-black/5"
                        }`}
                      >
                        {page}
                        {items.current_page === page && (
                            <motion.div layoutId="page-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full blur-[2px]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Discover More</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
        <CartDrawer />

        {/* Mobile Filter Sheet Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-md"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                className="fixed inset-x-0 bottom-0 max-h-[90vh] bg-white z-[101] md:hidden rounded-t-[3rem] p-8 shadow-2xl overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-display font-black text-primary tracking-tighter">Collection Filter</h2>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-3 rounded-2xl bg-secondary/50 text-primary hover:bg-secondary transition-colors"><X className="w-6 h-6" /></button>
                </div>
                
                <div className="space-y-12 pb-12">
                   {/* Mobile Specific Filtering Logic */}
                   <div className="space-y-4">
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">By Species</p>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => { handleCategory(cat.slug); setIsSidebarOpen(false); }}
                                    className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${
                                        filters.category === cat.slug ? "border-primary bg-primary/5 text-primary" : "border-border/40 text-muted-foreground"
                                    }`}
                                >
                                    <div className="w-12 h-12 mb-2 rounded-xl overflow-hidden flex items-center justify-center bg-primary/5">
                                        {cat.image_url ? (
                                            <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                                        ) : (
                                            cat.name === 'Dogs' ? <Dog className="w-8 h-8" /> : cat.name === 'Cats' ? <Cat className="w-8 h-8" /> : <Settings2 className="w-8 h-8" />
                                        )}
                                    </div>
                                    <span className="font-black text-sm">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                   </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </QueryClientProvider>
  );
}
