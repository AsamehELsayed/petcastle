import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/ecommerce/store/useCart";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotals } = useCart();
  const { subtotal, savings, total, count } = getTotals();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-display font-bold text-foreground">Your Cart</h2>
                <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-primary mb-6">
                    <ShoppingBag className="w-10 h-10 opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-border bg-white shadow-sm">
                      <div className="w-20 h-20 bg-secondary/30 rounded-xl p-2 shrink-0">
                        <img src={item.main_image || item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-semibold text-sm text-foreground line-clamp-2">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(String(item.id))}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(String(item.id), item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-foreground shadow-sm hover:text-primary"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(String(item.id), item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-foreground shadow-sm hover:text-primary"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            {(item.original_price || item.originalPrice) && (
                              <p className="text-[10px] text-muted-foreground line-through">
                                {((Number(item.original_price || item.originalPrice)) * item.quantity).toFixed(2)} JD
                              </p>
                            )}
                            <p className="font-bold text-primary">
                              {(item.price * item.quantity).toFixed(2)} JD
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} JD</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-{savings.toFixed(2)} JD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="font-display font-bold text-lg text-foreground">Total</span>
                    <span className="font-display font-bold text-2xl text-primary">
                      {total.toFixed(2)} JD
                    </span>
                  </div>
                </div>

                <button className="w-full py-4 bg-accent text-white rounded-xl font-bold text-lg hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
