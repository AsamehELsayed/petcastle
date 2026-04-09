import { motion } from "framer-motion";
import { Heart, ShoppingBag, Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useCart } from "@/ecommerce/store/useCart";

declare const route: any;

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  
  const imageUrl = product.main_image || product.imageUrl;
  const brandName = product.brand?.name || product.brand || "Premium Choice";
  const isSoldOut = product.status === 'sold' || product.isSoldOut;
  
  const discount = product.original_price || product.originalPrice
    ? Math.round(((Number(product.original_price || product.originalPrice) - Number(product.price)) / Number(product.original_price || product.originalPrice)) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-[2rem] border border-border/40 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* Premium Header Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isSoldOut && (
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg border border-white/10">
            Out of Stock
          </div>
        )}
        {discount > 0 && !isSoldOut && (
          <div className="bg-accent text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg shadow-accent/20 border border-white/10">
            -{discount}% OFF
          </div>
        )}
      </div>

      {/* Wishlist Floating Button */}
      <button className="absolute top-4 right-4 z-10 p-2.5 rounded-2xl bg-white/60 backdrop-blur-xl text-muted-foreground hover:text-accent hover:bg-white transition-all shadow-xl shadow-black/5 active:scale-90 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Concept - Minimalist & Focused */}
      <Link 
        href={route('products.show', product.id)} 
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FAFAFB] to-[#F3F4F6] p-4 sm:p-8 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <motion.img
          src={imageUrl}
          alt={product.name}
          className="object-contain w-full h-full mix-blend-multiply transition-all duration-700 ease-out z-10 scale-90 group-hover:scale-105"
        />
        
        {/* Quick Add Overlay on Image */}
        {!isSoldOut && (
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <button 
                  onClick={(e) => { e.preventDefault(); addItem(product); }}
                  className="w-full bg-primary/90 backdrop-blur-md text-white py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-primary transition-colors"
                >
                    <Plus className="w-3 h-3" /> Quick Add
                </button>
            </div>
        )}
      </Link>

      {/* Content Area - Refined Spacing */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">{brandName}</span>
            <div className="h-0.5 w-0.5 rounded-full bg-primary/20" />
            <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{product.type || 'Essentials'}</span>
        </div>
        
        <Link href={route('products.show', product.id)}>
          <h3 className="font-bold text-[#1E293B] text-base sm:text-lg line-clamp-1 mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
            {product.name}
          </h3>
        </Link>

        {/* Pricing & Cart Action */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {(product.original_price || product.originalPrice) && (
              <span className="text-[11px] text-muted-foreground/40 line-through font-bold mb-[-2px]">
                {Number(product.original_price || product.originalPrice).toFixed(2)} JD
              </span>
            )}
            <span className={`text-lg sm:text-xl font-black tracking-tighter ${isSoldOut ? "text-muted-foreground/40" : "text-[#1E293B]"}`}>
              {isSoldOut ? "—" : `${Number(product.price).toFixed(2)}`} <span className="text-xs ml-1">JD</span>
            </span>
          </div>

          <button
            onClick={() => !isSoldOut && addItem(product)}
            disabled={isSoldOut}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative group/btn ${
              isSoldOut
                ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                : "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-90"
            }`}
            aria-label={isSoldOut ? "Sold out" : "Add to cart"}
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-hover/btn:scale-100 transition-transform duration-500" />
            <ShoppingBag className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
