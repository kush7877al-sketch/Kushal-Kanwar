import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Calendar, 
  UtensilsCrossed, 
  Sparkles,
  Languages,
  Database
} from 'lucide-react';
import { Language } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAdminPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAdminPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', hindiLabel: 'मुखपृष्ठ' },
    { href: '#about', label: 'Our Story', hindiLabel: 'हमारी कहानी' },
    { href: '#menu', label: 'Menu', hindiLabel: 'शाही मेनू' },
    { href: '#reserve', label: 'Table Booking', hindiLabel: 'टेबल बुकिंग' },
    { href: '#gallery', label: 'Ambience', hindiLabel: 'माहौल व गैलरी' },
    { href: '#reviews', label: 'Reviews', hindiLabel: 'प्रशंसा' },
    { href: '#contact', label: 'Contact', hindiLabel: 'संपर्क' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro bar for phone, timing & quick actions */}
      <div className={`bg-stone-950/95 border-b border-amber-900/30 text-xs text-stone-300 py-1.5 px-4 transition-all duration-300 ${isScrolled ? 'hidden md:block' : 'block'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-stone-700">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'प्रतिदिन: सुबह 11:30 - रात 11:30' : 'Daily: 11:30 AM - 11:30 PM'}</span>
            </div>
            <span className="hidden lg:inline text-stone-700">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Connaught Place, New Delhi</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-200 hover:border-amber-500/50 hover:text-amber-400 transition-colors text-xs font-medium cursor-pointer"
              title="Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Staff & Database Portal Trigger */}
            {onOpenAdminPortal && (
              <button
                onClick={onOpenAdminPortal}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900 border border-amber-500/30 text-amber-400 hover:bg-stone-850 hover:border-amber-400 text-xs font-medium cursor-pointer transition-colors"
                title="Supabase Database & Staff Bookings"
              >
                <Database className="w-3.5 h-3.5" />
                <span>DB & Staff</span>
              </button>
            )}

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Royal Zaika! I would like to inquire about table availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`px-4 sm:px-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-stone-950/90 backdrop-blur-md border-b border-amber-900/40 py-3 shadow-2xl shadow-black/80' 
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/60 to-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Crest */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-amber-100 flex items-center gap-2">
                <span>{RESTAURANT_INFO.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-sans border border-amber-500/30 font-medium">
                  रॉयल
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-amber-500 font-medium">
                {language === 'hi' ? 'शाही भारतीय व अवधी व्यंजन' : 'Fine Indian & Mughlai Cuisine'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-300 hover:text-amber-400 text-sm font-medium tracking-wide transition-colors relative py-1 group"
              >
                <span>{language === 'hi' ? link.hindiLabel : link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Pre-order Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-200 hover:border-amber-500/60 hover:text-amber-400 transition-all cursor-pointer"
              title="Order Cart"
              aria-label="View pre-order cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reservation CTA Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-semibold text-sm tracking-wide shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-600 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>{language === 'hi' ? 'टेबल बुक करें' : 'Reserve Table'}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 hover:text-amber-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 border-b border-amber-900/40 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
                {language === 'hi' ? 'नेविगेशन' : 'Navigation Menu'}
              </span>
              <button
                onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/30 text-xs text-amber-400 font-medium"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'हिन्दी में देखें' : 'View English'}</span>
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-200 hover:text-amber-400 text-base font-medium py-1.5 border-b border-stone-900/60 transition-colors"
              >
                {language === 'hi' ? link.hindiLabel : link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/25"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'hi' ? 'टेबल बुक करें' : 'Reserve a Table'}</span>
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Royal Zaika, I would like to place an order or ask a question.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-colors"
              >
                <span>WhatsApp Us Direct</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
