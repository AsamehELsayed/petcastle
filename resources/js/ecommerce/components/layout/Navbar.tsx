import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Search, ShoppingCart, User, Heart, MapPin, Menu, X } from "lucide-react";
import { useCart } from "@/ecommerce/store/useCart";

const logoImg = `/images/logo.jpg`;

export function Navbar({ categories: propCategories, items: propItems }: { categories?: any[], items?: any[] }) {
  const { global_categories = [], global_items = [] } = usePage().props as any;
  const dbCategories = propCategories || global_categories;
  const dbItems = propItems || global_items;

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
    <header className="sticky top-0 z-50 w-full flex flex-col bg-blue-700 text-white">
      {/* Top Promo Bar */}
      <div className="bg-primary text-primary-foreground text-xs font-medium py-1.5 px-4 overflow-hidden relative flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full flex justify-center text-center">
          <p className="animate-pulse">🎉 WOW Sale — Up to 70% OFF | Use code <span className="text-accent font-bold">PETS10</span> for extra 10% off | Free delivery above 20 JD</p>
        </div>
      </div>

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
              
              <button className="p-2 text-foreground hover:text-primary transition-colors relative hidden sm:block">
                <User className="w-6 h-6" />
              </button>
              
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
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
