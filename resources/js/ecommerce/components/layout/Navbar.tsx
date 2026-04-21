import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Search, ShoppingCart, User, Heart, MapPin, Menu, X, PawPrint, BookText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/ecommerce/store/useCart";

const logoImg = `/images/logo.jpg`;

export function Navbar({ categories: propCategories, items: propItems }: { categories?: any[], items?: any[] }) {
  const { auth, global_categories = [], global_items = [] } = usePage().props as any;
  const user = auth?.user;
  const dbCategories = propCategories || global_categories;
  const dbItems = propItems || global_items;

  const getUserRedirect = () => {
    if (!user) return "/login";
    return user.role === 'admin' ? "/admin" : "/portal";
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { items, setIsOpen } = useCart();
  
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : dbItems.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4);

  const categories = dbCategories.length > 0 ? dbCategories.map((c: any) => c.name) : ["Products", "Collections"];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-blue-700 text-white max-w-full overflow-x-hidden">
      {/* Top Promo Bar */}
     

      {/* Main Navbar */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "border-b border-border"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src={logoImg}
                alt="Castle Pets Logo"
                className="h-12 w-12 md:h-14 md:w-14 rounded-xl object-cover shadow-sm"
              />
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for toys, food, brands..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  className="w-full h-11 pl-5 pr-12 rounded-full bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium"
                />
                <button className="absolute right-1 top-1 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-full hover:bg-accent transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Search Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50">
                  {searchResults.map((product: any) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-secondary/50 cursor-pointer border-b border-border last:border-0 transition-colors">
                      <div className="w-12 h-12 bg-white rounded-md p-1 border border-border shrink-0">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{product.name}</h4>
                        <p className="text-xs text-primary font-bold">{product.price.toFixed(2)} JD</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              <button className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
                Deliver to 110001
              </button>
              
              <button className="p-2 text-foreground hover:text-primary transition-colors relative hidden sm:block">
                <Heart className="w-6 h-6" />
              </button>
              
              <Link 
                href={getUserRedirect()}
                className="p-2 text-foreground hover:text-primary transition-colors relative hidden sm:block"
              >
                <User className="w-6 h-6" />
              </Link>
              
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                <ShoppingCart className="w-6 h-6 relative z-10" />
                {cartItemCount > 0 && (
                  <span className="absolute 0 right-0 -translate-y-1 translate-x-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm z-20">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar (Mobile) */}
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-4 pr-10 rounded-full bg-secondary/50 border border-border focus:border-primary outline-none text-sm"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Categories Nav (Desktop) */}
        <div className="hidden md:block border-t border-border bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center gap-8 h-12">
              {categories.map((cat: any) => (
                <li key={cat}>
                  <Link 
                    href={`/products?category=${cat.toLowerCase()}`}
                    className="text-sm font-bold text-primary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/blog"
                  className="text-sm font-bold text-primary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1"
                >
                  <BookText className="w-4 h-4" />
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/request-animal"
                  className="text-sm font-bold text-primary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1 text-accent"
                >
                  <PawPrint className="w-4 h-4" />
                  Request a Pet
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[101] shadow-2xl md:hidden p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <img src={logoImg} alt="Logo" className="h-10 w-10 rounded-xl object-cover" />
                    <span className="font-display font-black text-xl text-primary tracking-tighter">Pet Castle</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-2xl bg-secondary/50 text-primary hover:bg-secondary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-4">Navigation</p>
                  <div className="space-y-1">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-5 rounded-2xl text-lg font-bold text-foreground hover:bg-primary/5 hover:text-primary transition-all">Home</Link>
                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-5 rounded-2xl text-lg font-bold text-foreground hover:bg-primary/5 hover:text-primary transition-all">All Collections</Link>
                    <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-5 rounded-2xl text-lg font-bold text-foreground hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-2">
                        <BookText className="w-5 h-5 text-primary" />
                        Blog
                    </Link>
                    <Link href="/request-animal" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-5 rounded-2xl text-lg font-bold text-accent hover:bg-primary/5 transition-all flex items-center gap-2">
                        <PawPrint className="w-5 h-5" />
                        Request a Pet
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 mt-8 px-4">Departments</p>
                  <div className="space-y-1">
                    {categories.map((cat: any) => (
                        <Link 
                          key={cat}
                          href={`/products?category=${cat.toLowerCase()}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-4 px-5 rounded-2xl text-lg font-bold text-primary hover:bg-primary/5 transition-all"
                        >
                          {cat}
                        </Link>
                      ))}
                  </div>
                </div>
              </nav>

              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-4 mb-6 px-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                     <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-foreground">Royal Member</p>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Join for rewards</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all uppercase">
                    Connect Account
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
