import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Headphones, Tag, UtensilsCrossed, Shirt, Stethoscope, Scissors } from "lucide-react";
import { ProductCard } from "@/ecommerce/components/ui/ProductCard";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";

const logoImg = `/images/logo.jpg`;

// MAIN RENDERER
export default function EcommerceHome({ 
    page,
    slug = "home",
    categories = [],
    brands = [],
    species = [],
    items = [],
    animals = [],
    deals = [],
    bestSellers = []
}: { 
    page?: any,
    slug?: string,
    categories?: any[],
    brands?: any[],
    species?: any[],
    items?: any[],
    animals?: any[],
    deals?: any[],
    bestSellers?: any[]
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [timeLeft, setTimeLeft] = useState({ hours: 12, mins: 34, secs: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hours > 0) hours--;
            else { hours = 23; }
          }
        }
        return { hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const baseProducts = bestSellers || [];

  const filteredBestSellers = activeFilter === "All"
    ? baseProducts.slice(0, 8)
    : activeFilter === "Animals"
    ? baseProducts.filter((p: any) => p.type === 'animal').slice(0, 8)
    : baseProducts.filter((p: any) => 
        p.categories?.some((c: any) => c.name.toLowerCase() === activeFilter.toLowerCase()) ||
        p.species?.some((s: any) => s.name.toLowerCase() === activeFilter.toLowerCase())
    ).slice(0, 8);

  const filters = ["All", 
    ...(animals?.length > 0 ? ["Animals"] : []),
    ...new Set([
    ...(species?.map((s: any) => s.name) || []),
    ...(categories?.map((c: any) => c.name) || [])
  ])].slice(0, 6);

  return (
    <>
        <Head title={page?.title || "Castle Pets - CMS Page"} />
        
        <main className="flex-1 w-full overflow-x-hidden bg-background">
          {page?.active_sections && page.active_sections.length > 0 ? (
              page.active_sections.map((section: any) => (
                  <SectionRenderer 
                      key={section.id} 
                      section={section} 
                      context={{ items, animals, species, categories, brands, deals, bestSellers: filteredBestSellers, filters, activeFilter, setActiveFilter, timeLeft }} 
                  />
              ))
          ) : (
              <div className="py-32 text-center w-full flex flex-col items-center justify-center space-y-4 px-4">
                  <h2 className="text-3xl font-display font-black text-primary">No Content Found</h2>
                  <p className="text-muted-foreground text-lg max-w-md">
                      {slug === 'home' 
                          ? "Welcome to Castle Pets! To design your homepage, please navigate to the Admin Dashboard > CMS and create a page with the slug 'home'."
                          : `The page '${slug}' is currently empty or does not exist.`}
                  </p>
                  <Button asChild className="mt-4"><a href="/portal/admin/cms">Go to Admin CMS</a></Button>
              </div>
          )}
        </main>
    </>
  );
}

EcommerceHome.layout = (page: React.ReactNode) => <GuestLayout children={page} />;

// SECTION RENDERER ENGINE
function SectionRenderer({ section, context }: { section: any, context: any }) {
    const { data } = section;
    const isHexColor = (c: string) => c?.startsWith('#') || c?.startsWith('rgb');
    
    const style: React.CSSProperties = {
        backgroundColor: isHexColor(data?.bgColor) ? data.bgColor : undefined,
        paddingTop: data?.paddingTop ? `${parseInt(data.paddingTop) * 0.25}rem` : undefined,
        paddingBottom: data?.paddingBottom ? `${parseInt(data.paddingBottom) * 0.25}rem` : undefined,
        textAlign: data?.textAlign as any || 'left',
    };

    const wrapperClasses = [
        !isHexColor(data?.bgColor) ? data?.bgColor : '',
        data?.customClasses || '',
        'w-full relative section-cms-wrapper'
    ].filter(Boolean).join(' ');

    let BlockComponent = null;
    let isFullWidthLayout = false; 
    
    switch (section.type) {
        case 'hero': BlockComponent = <HeroBlock data={data} />; break;
        case 'features': BlockComponent = <FeaturesBlock data={data} />; break;
        case 'text': BlockComponent = <TextBlock data={data} />; break;
        case 'html': BlockComponent = <HtmlBlock data={data} />; break;
        
        case 'ecommerce_hero': BlockComponent = <EcommerceHeroBlock data={data} items={context.items} animals={context.animals} />; isFullWidthLayout = true; break;
        case 'coupon_strip': BlockComponent = <CouponStripBlock data={data} />; isFullWidthLayout = true; break;
        case 'shop_by_pet': BlockComponent = <ShopByPetBlock data={data} species={context.species} items={context.items} animals={context.animals} />; isFullWidthLayout = true; break;
        case 'shop_by_category': BlockComponent = <ShopByCategoryBlock data={data} categories={context.categories} items={context.items} />; isFullWidthLayout = true; break;
        case 'promo_cards': BlockComponent = <PromoCardsBlock data={data} items={context.items} />; isFullWidthLayout = true; break;
        case 'deals_slider': BlockComponent = <DealsSliderBlock data={data} deals={context.deals} timeLeft={context.timeLeft} />; isFullWidthLayout = true; break;
        case 'trending_grid': BlockComponent = <TrendingGridBlock data={data} bestSellers={context.bestSellers} filters={context.filters} activeFilter={context.activeFilter} setActiveFilter={context.setActiveFilter} />; isFullWidthLayout = true; break;
        case 'trust_banner': BlockComponent = <TrustBannerBlock data={data} />; isFullWidthLayout = true; break;
        default: return null;
    }

    return (
        <section className={wrapperClasses} style={style} id={`section-${section.id}`}>
            {data?.customCss && (
                <style dangerouslySetInnerHTML={{ __html: `
                    #section-${section.id} { ${data.customCss} }
                `}} />
            )}
            <div className={isFullWidthLayout ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6"}>
                {BlockComponent}
            </div>
            {section.type === 'hero' && data?.image && (
                 <div className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20" style={{ backgroundImage: `url(${data.image})` }} />
            )}
        </section>
    );
}

// ============================================
// STANDARD CMS BLOCKS
// ============================================
export function HeroBlock({ data }: { data: any }) {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-6">
            {data.title && <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground" dangerouslySetInnerHTML={{ __html: data.title }} />}
            {data.subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.subtitle}</p>}
            {data.button_text && <Button size="lg" asChild className="mt-4"><a href={data.button_link || '#'}>{data.button_text}</a></Button>}
        </div>
    );
}
export function FeaturesBlock({ data }: { data: any }) {
    return (
        <div className="space-y-12">
            {data.title && <h2 className="text-3xl font-bold tracking-tight">{data.title}</h2>}
            {data.features && data.features.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {data.features.map((feature: any, i: number) => (
                        <div key={i} className="bg-card border rounded-xl p-6 shadow-sm"><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-muted-foreground">{feature.description}</p></div>
                    ))}
                </div>
            )}
        </div>
    );
}
export function TextBlock({ data }: { data: any }) {
    return <div className="prose dark:prose-invert max-w-none text-current" dangerouslySetInnerHTML={{ __html: data.content || '' }} />;
}
export function HtmlBlock({ data }: { data: any }) {
    return <div dangerouslySetInnerHTML={{ __html: data.html || '' }} />;
}

// ============================================
// ECOMMERCE SPECIFIC BLOCKS
// ============================================

export function EcommerceHeroBlock({ data, items, animals }: { data: any, items: any[], animals: any[] }) {
  const featuredItem = animals[0] || items[0];
  
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="absolute inset-0 checkerboard-pattern opacity-30 mix-blend-overlay" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1 text-center md:text-left pt-8 md:pt-0">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 text-white text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> {data?.banner_badge || 'NEW ARRIVAL'}
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-none tracking-tighter mb-4 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: data?.title || featuredItem?.name || 'Exclusive Pet Care' }} />
            <div className="bg-accent text-white px-6 py-2 rounded-xl inline-block transform -rotate-2 mb-6 shadow-xl"><p className="text-2xl md:text-4xl font-black">{data?.promo_badge || (featuredItem?.price ? `${Number(featuredItem.price).toFixed(2)} JD` : 'SHOP NOW')}</p></div>
            <p className="text-xl text-white/90 font-medium mb-8">{data?.subtitle || (featuredItem?.description ? featuredItem.description.slice(0, 100) + '...' : 'Premium quality for your pets')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href={data?.btn1_link || (featuredItem ? `/products/${featuredItem.id}` : '/products')} className="w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:bg-accent/90 hover:scale-105 transition-all">{data?.btn1_text || 'View Details'}</Link>
              <Link href={data?.btn2_link || '/products'} className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">{data?.btn2_text || 'Browse Catalog'}</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex-1 relative w-full max-w-sm mx-auto flex items-center justify-center">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
                { (data?.image || featuredItem?.main_image) ? (
                    <img src={data?.image || featuredItem?.main_image} alt="Hero" className="max-w-full h-auto rounded-3xl object-contain shadow-2xl border-4 border-white/20" />
                ) : (
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center border-4 border-white/20">
                        <img src={logoImg} alt="Logo" className="w-40 h-40 object-contain opacity-50" />
                    </div>
                )}
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/20 blur-3xl rounded-full -z-10" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-20 h-20 border-4 border-dashed border-accent/40 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function CouponStripBlock({ data }: { data: any }) {
  return (
    <div className="bg-[#EDE9FE] py-4 md:py-6 border-b border-[#DDD6FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-black text-primary text-center md:text-left">
              {data?.title_start || 'GET'} <span className="text-accent">{data?.promo_highlight || '15% OFF'}</span> {data?.title_end || 'ON YOUR FIRST ORDER'}
          </h3>
          <div className="flex items-center bg-white border-2 border-dashed border-primary rounded-xl px-6 py-3 shadow-sm relative overflow-hidden group hover:border-accent transition-colors">
            <span className="font-bold text-muted-foreground mr-3">CODE:</span>
            <span className="font-black text-xl text-primary group-hover:text-accent transition-colors">{data?.code || 'NEW15'}</span>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#EDE9FE] rounded-full border-r-2 border-primary" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#EDE9FE] rounded-full border-l-2 border-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopByPetBlock({ data, species, items, animals }: { data: any, species: any[], items: any[], animals: any[] }) {
  return (
    <div className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-black text-[#1E3A8A]">{data?.title || 'Shop by Pet'}</h2>
            <p className="text-muted-foreground mt-1">{data?.subtitle || 'Choose your furry, feathered or finned friend'}</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline">View All <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {species?.slice(0, 5).map((pet: any, i) => {
            // Try to find an image from the pet model or from an animal of this species
            const speciesImage = pet.image_url || items?.find((item: any) => 
                item.species?.some((s: any) => s.id === pet.id) || 
                item.name.toLowerCase().includes(pet.name.toLowerCase())
            )?.main_image;

            return (
              <Link key={pet.name} href={`/products?category=${pet.name.toLowerCase()}`} className="group cursor-pointer">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-sm group-hover:shadow-xl transition-all border border-border bg-muted">
                    {speciesImage ? (
                        <img src={speciesImage} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-2xl">{pet.name[0]}</div>
                    )}
                  </div>
                  <p className="text-center font-bold text-foreground group-hover:text-primary transition-colors mt-3">{pet.name}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ShopByCategoryBlock({ data, categories, items }: { data: any, categories: any[], items: any[] }) {
  return (
    <div className="py-16 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-black text-primary">{data?.title || 'Shop by Category'}</h2>
          <p className="text-muted-foreground mt-1">{data?.subtitle || 'Everything your pet needs — food, toys, grooming & more'}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories?.slice(0, 5).map((cat: any, i) => {
            const CategoryIcon = (() => {
              const n = cat.name.toLowerCase();
              if (n.includes('food')) return UtensilsCrossed;
              if (n.includes('toy')) return Tag;
              if (n.includes('groom')) return Scissors;
              if (n.includes('wear') || n.includes('access')) return Shirt;
              if (n.includes('health') || n.includes('med')) return Stethoscope;
              return Tag;
            })();
            
            const categoryImage = cat.image_url || items?.find((item: any) => 
                item.categories?.some((c: any) => c.id === cat.id) ||
                item.name.toLowerCase().includes(cat.name.toLowerCase())
            )?.main_image;

            const color = cat.color || (i % 5 === 0 ? "from-orange-400 to-orange-500" : i % 5 === 1 ? "from-blue-400 to-blue-600" : i % 5 === 2 ? "from-purple-400 to-purple-600" : i % 5 === 3 ? "from-green-400 to-green-600" : "from-red-400 to-red-500");
            return (
              <Link key={cat.name} href="/products" className="group cursor-pointer">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
                  <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm group-hover:shadow-xl transition-all h-full">
                    {categoryImage ? (
                        <img src={categoryImage} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center p-8">
                            <CategoryIcon className="w-full h-full text-muted-foreground/20" />
                        </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center"><CategoryIcon className="w-8 h-8 text-white mb-2 drop-shadow-lg" /></div>
                  </div>
                  <p className="text-center font-bold text-foreground group-hover:text-primary transition-colors mt-3 text-sm">{cat.name}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PromoCardsBlock({ data, items }: { data: any, items: any[] }) {
  const brandsWithItems = Array.from(new Set(items?.map(i => i.brand?.name).filter(Boolean) || []));
  
  return (
    <div className="py-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => {
            const brand = brandsWithItems[i-1];
            const item = items?.find(it => it.brand?.name === brand);
            
            const cardData = {
                name: data?.[`card${i}_title`] || brand || (i === 1 ? "Pet Specialties" : "Shop Premium"),
                image_url: data?.[`card${i}_image`] || item?.main_image || (i === 1 ? logoImg : null), 
                promo: data?.[`card${i}_promo`] || (i === 1 ? "Recent Deals" : "Explore Range"), 
                label: data?.[`card${i}_label`] || (i === 1 ? "EXPERT CHOICE" : "CURATED"),
                link: data?.[`card${i}_link`] || (brand ? `/products?brand=${brand}` : "/products")
            };
            const color = i === 1 ? "from-orange-500/90 to-orange-400/60" : "from-[#1E3A8A]/90 to-[#3B82F6]/60";
            
            return (
              <Link key={i} href={cardData.link}>
                <motion.div whileHover={{ y: -5 }} className="relative rounded-3xl overflow-hidden h-52 shadow-md cursor-pointer group">
                  {cardData.image_url ? (
                      <img src={cardData.image_url} alt={cardData.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-[#334155] flex items-center justify-center">
                        <img src={logoImg} alt="Logo" className="w-24 h-24 object-contain opacity-20" />
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-r ${color}`} />
                  <div className="absolute inset-0 p-8 flex flex-col justify-center">
                    <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-white text-xs font-bold mb-3 border border-white/30">{cardData.label}</div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-2">{cardData.name}</h3>
                    <p className="text-white/90 font-bold mb-4">{cardData.promo}</p>
                    <button className="w-fit bg-white text-primary font-bold px-6 py-2.5 rounded-xl hover:shadow-lg transition-shadow">Shop Now</button>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DealsSliderBlock({ data, deals, timeLeft }: { data: any, deals: any[], timeLeft: any }) {
  return (
    <div className="py-16 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-display font-extrabold text-primary">{data?.title || 'Deals of the Day'}</h2>
              <div className="bg-accent text-white px-3 py-1 rounded-lg font-mono font-bold tracking-wider flex items-center gap-1 shadow-sm text-sm">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                <span>{String(timeLeft.mins).padStart(2, '0')}</span>:
                <span>{String(timeLeft.secs).padStart(2, '0')}</span>
              </div>
            </div>
            <p className="text-muted-foreground font-medium">{data?.subtitle || 'Grab them before they\'re gone!'}</p>
          </div>
          <Link href="/products" className="text-primary font-bold hover:underline flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {deals?.map((product) => (
            <div key={product.id} className="min-w-[260px] w-[260px] md:min-w-[280px] md:w-[280px] snap-start shrink-0"><ProductCard product={product} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrendingGridBlock({ data, bestSellers, filters, activeFilter, setActiveFilter }: any) {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-display font-extrabold text-[#1E3A8A]">{data?.title || 'Trending Now'}</h2>
            <p className="text-muted-foreground mt-1">{data?.subtitle || 'Our most loved products this week'}</p>
          </div>
          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border overflow-x-auto max-w-full">
            {filters?.map((f: string) => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeFilter === f ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers?.map((product: any) => (<ProductCard key={product.id} product={product} />))}
        </motion.div>
        <div className="mt-12 text-center">
          <Link href="/products" className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Explore All Products</Link>
        </div>
      </div>
    </div>
  );
}

export function TrustBannerBlock({ data }: { data: any }) {
  const items = [
    { icon: Truck, title: data?.item1_title || "Free Delivery", desc: data?.item1_desc || "Above 20 JD" },
    { icon: ShieldCheck, title: data?.item2_title || "Vet Approved", desc: data?.item2_desc || "100% Genuine" },
    { icon: RotateCcw, title: data?.item3_title || "Easy Returns", desc: data?.item3_desc || "7 Days Return" },
    { icon: Headphones, title: data?.item4_title || "24/7 Support", desc: data?.item4_desc || "Expert Help" },
  ];

  return (
    <div className="py-12 bg-[#1E3A8A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center text-white">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-3"><feature.icon className="w-7 h-7 text-accent" /></div>
              <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
              <p className="text-white/70 text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
