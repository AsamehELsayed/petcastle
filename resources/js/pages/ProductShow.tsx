import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check,
  Plus,
  Minus,
  Package,
  Info,
  ArrowLeft,
  ArrowRight,
  Settings2,
  Sparkles,
  Award,
  Zap
} from "lucide-react";
import { Navbar } from "@/ecommerce/components/layout/Navbar";
import { Footer } from "@/ecommerce/components/layout/Footer";
import { ProductCard } from "@/ecommerce/components/ui/ProductCard";
import { CartDrawer } from "@/ecommerce/components/cart/CartDrawer";
import { useCart } from "@/ecommerce/store/useCart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare const route: any;

const queryClient = new QueryClient();

interface Props {
  product: any;
  relatedProducts: any[];
}

export default function ProductShow({ product, relatedProducts }: Props) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(product.main_image || product.imageUrl);

  const images = product.images && product.images.length > 0
    ? product.images.map((img: any) => img.url)
    : [product.main_image || product.imageUrl || "/images/logo.jpg"];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const discount = product.original_price
    ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
    : 0;

  const brandName = product.brand?.name || product.product_detail?.brand || "Premium Choice";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#FAFAFB] selection:bg-primary/10 selection:text-primary">
        <Head title={`${product.name} - Prestige Collection - Castle Pets`} />
        <Navbar />

        {/* Dynamic Background */}
        <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full opacity-50" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full opacity-50" />
        </div>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          
          {/* Refined Navigation & Breadcrumbs */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-3 text-sm font-bold tracking-tight">
                <Link href={route('home')} className="text-muted-foreground/60 hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-muted-foreground/20" />
                <Link href={route('products.index')} className="text-muted-foreground/60 hover:text-primary transition-colors uppercase text-[10px] tracking-widest">Collections</Link>
                <ChevronRight className="w-3 h-3 text-muted-foreground/20" />
                <span className="text-primary bg-primary/5 px-3 py-1 rounded-lg">Product Details</span>
            </div>
            
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 text-xs font-black text-primary/40 hover:text-primary transition-all uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return To Gallery
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
            
            {/* LEFT: IMMERSIVE GALLERY (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-blue-900/5 group border border-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={selectedImage}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-contain p-12 md:p-20"
                    />
                </AnimatePresence>

                {/* Badge Overlay */}
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                  {discount > 0 && (
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-accent text-white px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-accent/30 flex items-center gap-2"
                    >
                        <Zap className="w-4 h-4 fill-white" />
                        SPECIAL OFFER -{discount}%
                    </motion.div>
                  )}
                  {product.status === 'new' && (
                    <div className="bg-primary text-white px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        NEW ARRIVAL
                    </div>
                  )}
                </div>

                {/* Interaction Buttons */}
                <div className="absolute bottom-8 right-8 flex flex-col gap-4">
                    <button className="p-4 rounded-3xl bg-white/80 backdrop-blur-xl text-muted-foreground hover:text-accent hover:scale-110 transition-all shadow-xl border border-white">
                        <Heart className="w-6 h-6" />
                    </button>
                    <button className="p-4 rounded-3xl bg-white/80 backdrop-blur-xl text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-xl border border-white">
                        <Share2 className="w-6 h-6" />
                    </button>
                </div>
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-4 p-2 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/50 w-fit mx-auto md:mx-0 overflow-x-auto no-scrollbar">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 h-24 rounded-[1.8rem] overflow-hidden bg-white border-4 transition-all duration-300 group shrink-0 ${
                      selectedImage === img ? "border-primary shadow-2xl scale-105" : "border-transparent hover:border-primary/20"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: SELECTIVE INFO (Cols 8-12) */}
            <div className="lg:col-span-5 flex flex-col pt-4">
              
              <div className="mb-10">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <Award className="w-3 h-3" />
                        {brandName}
                    </div>
                    {product.stock > 0 || product.product_detail?.stock > 0 ? (
                        <div className="px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Secure Stock
                        </div>
                    ) : (
                        <div className="px-4 py-1.5 rounded-full bg-red-500/5 border border-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">
                            Sold Out
                        </div>
                    )}
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-display font-black text-[#1E293B] leading-[1.1] tracking-tighter mb-6"
                >
                  {product.name}
                </motion.h1>
                


                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-baseline gap-4"
                >
                  <span className="text-6xl font-black text-primary tracking-tighter leading-none">
                    {Number(product.price).toFixed(2)} <span className="text-2xl ml-1">JD</span>
                  </span>
                  {product.original_price && (
                    <span className="text-2xl text-muted-foreground/30 line-through font-bold">
                      {Number(product.original_price).toFixed(2)} JD
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Purchase Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-[2.5rem] p-8 border border-white shadow-2xl shadow-blue-900/10 mb-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex items-center justify-between bg-secondary/30 rounded-2xl p-2 border border-border/40">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-accent transition-all active:scale-90 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-lg text-primary">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-primary transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="md:col-span-8">
                    <button 
                        onClick={handleAddToCart}
                        className="group w-full h-14 bg-primary text-white rounded-2xl font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all"
                    >
                        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        ACQUIRE NOW
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-between px-2">
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><Truck className="w-5 h-5" /></div>
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center">Fast <br/> Transit</span>
                    </div>
                    <div className="h-8 w-[1px] bg-border" />
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><ShieldCheck className="w-5 h-5" /></div>
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center">Quality <br/> Assured</span>
                    </div>
                    <div className="h-8 w-[1px] bg-border" />
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><RotateCcw className="w-5 h-5" /></div>
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center">Easy <br/> Return</span>
                    </div>
                </div>
              </motion.div>

              {/* Brief Intro */}
              <p className="text-xl text-muted-foreground/80 leading-relaxed font-medium pl-2 border-l-4 border-primary/20 italic">
                "{product.description || "A masterpiece of pet fulfillment, designed to bring unparalleled comfort and joy to your loyal companion."}"
              </p>
            </div>
          </div>

          {/* Detailed Content Tabs - Ultra Clean UI */}
          <div className="mt-32">
            <div className="flex justify-center md:justify-start gap-2 md:gap-4 p-2 bg-white/40 backdrop-blur-md rounded-3xl border border-white width-fit mx-auto md:mx-0 mb-12 overflow-x-auto no-scrollbar">
              {[
                { id: "description", label: "Overview", icon: Info },
                { id: "specs", label: "Specifications", icon: Settings2 },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shrink-0 ${
                    activeTab === tab.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-muted-foreground/60 hover:text-primary hover:bg-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-white shadow-2xl shadow-blue-900/5 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="max-w-4xl mx-auto"
                  >
                    <h3 className="text-3xl font-display font-black text-primary mb-8">Crafting Perfection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground leading-relaxed">
                        <div>
                            <p className="text-lg font-medium mb-6">
                                {product.description || "We believe that every pet deserves the finest care. This product represents our commitment to excellence, combining traditional durability with modern pet psychology to create an item that is as functional as it is beautiful."}
                            </p>
                            <p className="font-medium">
                                Sourced from sustainable environments and rigorously tested by independent veterinarians, ensuring safety for all species and sizes.
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Hypoallergenic & Non-Toxic",
                                "Eco-Friendly Sourcing",
                                "Lifetime Structure Warranty",
                                "Professionally Vetted Design"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 py-3 border-b border-border/50">
                                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600"><Check className="w-4 h-4" /></div>
                                    <span className="font-black text-sm text-[#1E293B] uppercase tracking-wider">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "specs" && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {[
                      { label: "Identifier", value: product.product_detail?.sku || "Castle-PR-102" },
                      { label: "Net Weight", value: product.product_detail?.weight ? `${product.product_detail.weight} kg` : "Premium Grade" },
                      { label: "Collection", value: brandName },
                      { label: "Category", value: product.type.charAt(0).toUpperCase() + product.type.slice(1) },
                      { label: "Availability", value: "Priority Stock" },
                      { label: "Origin", value: "Verified Source" },
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col p-8 rounded-[2rem] bg-secondary/20 border border-white hover:border-primary/20 transition-colors">
                        <span className="font-black text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-4 opacity-50">{spec.label}</span>
                        <span className="font-black text-xl text-primary tracking-tight">{spec.value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}


              </AnimatePresence>
            </div>
          </div>

          {/* Related Collections */}
          {relatedProducts.length > 0 && (
            <section className="mt-40">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-[#1E293B] tracking-tighter mb-2">Similar Treasures</h2>
                    <p className="text-muted-foreground/60 font-bold uppercase text-[10px] tracking-[0.2em]">Based on your current inspiration</p>
                </div>
                <Link href={route('products.index')} className="group flex items-center gap-3 text-xs font-black text-primary uppercase tracking-[0.2em] border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">
                  Browse Full Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((rel, i) => (
                    <motion.div
                        key={rel.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <ProductCard product={rel} />
                    </motion.div>
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </QueryClientProvider>
  );
}
