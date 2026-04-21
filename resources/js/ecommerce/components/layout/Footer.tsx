import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { CrownLogo } from "@/ecommerce/components/ui/SVGIcons";

interface Category {
  id: number;
  name: string;
}

export function Footer() {
  const { global_categories = [], footer_settings } = usePage().props as any;
  
  const categories = global_categories.length > 0 ? global_categories : [{ id: 1, name: "Dogs" }, { id: 2, name: "Cats" }, { id: 3, name: "Small Pets" }, { id: 4, name: "Birds" }];
  
  const branding = footer_settings?.branding || {
    logo_text: "Pet Castle",
    description: "Premium care for your royal companions. The ultimate destination for top-quality pet food, accessories, and healthcare products."
  };

  const social = footer_settings?.social || {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#"
  };

  const contact = footer_settings?.contact || {
    address: "123 Pet Castle Avenue, Royal Pet District, New Delhi 110001",
    phone: "+91 98765 43210",
    email: "support@petcastle.com"
  };

  const copyright = footer_settings?.copyright || `© ${new Date().getFullYear()} Pet Castle. All rights reserved. Built with love for pets.`;

  const socialIcons = [
    { Icon: Facebook, link: social.facebook },
    { Icon: Instagram, link: social.instagram },
    { Icon: Twitter, link: social.twitter },
    { Icon: Youtube, link: social.youtube },
  ];

  return (
    <footer className="bg-[#0F172A] pt-16 pb-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <CrownLogo className="w-6 h-6" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight">
                {branding.logo_text}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {branding.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialIcons.map(({Icon, link}, i) => (
                <a key={i} href={link || "#"} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:-translate-y-1 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "Track Order", "Returns Policy", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-white hover:underline transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Shop Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat: Category) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.name.toLowerCase()}`} className="text-muted-foreground text-sm hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            {copyright}
          </p>
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <span>Powered by</span>
            <span className="font-display font-bold text-white/50">Replit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
