import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  Check, 
  Heart,
  Sparkles
} from 'lucide-react';
import { Language } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { subscribeNewsletterApi } from '../services/api';

interface FooterProps {
  language: Language;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenAdminPortal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    try {
      await subscribeNewsletterApi(newsletterEmail.trim());
    } catch (e) {
      console.warn('Newsletter API', e);
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-amber-950/40 text-stone-400 text-xs pt-16 pb-12 relative overflow-hidden">
      {/* Decorative top accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-amber-100 block">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-medium">
                  {RESTAURANT_INFO.hindiName}
                </span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs">
              {language === 'hi'
                ? 'अवधी नवाबी पाक-परंपरा का प्रामाणिक केंद्र। 36 घंटे धीमी आंच पर पकी दाल ज़ायका, मिट्टी के तंदूर में सुलगते कबाब और शुद्ध देसी घी में पकी खुशबूदार दम बिरयानी।'
                : 'Preserving the heritage of North Indian & Awadhi royal cuisine with charcoal slow-cooking, heirloom 32-spice hand-ground formulas, and gracious Indian hospitality.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/60 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/60 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900 transition-colors font-medium text-[11px]"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-200 uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'मुखपृष्ठ' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'हमारी कहानी' : 'Chef Heritage'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'डिजिटल मेनू' : 'Digital Menu'}
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'टेबल आरक्षण' : 'Table Booking'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'परिवेश गैलरी' : 'Ambience Gallery'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'ग्राहक समीक्षाएं' : 'Diner Reviews'}
                </a>
              </li>
            </ul>
          </div>

          {/* Special Experience (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-200 uppercase tracking-wider">
              {language === 'hi' ? 'शाही अनुभव' : 'Experiences'}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">★</span>
                <span>Grand Charcoal Live Tandoor & Kebabs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">★</span>
                <span>Starlight Rooftop Candlelight Dinners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">★</span>
                <span>Private Dining Room (PDR) for 10-25 Guests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">★</span>
                <span>Outdoor Royal Catering & Corporate Banquets</span>
              </li>
            </ul>
          </div>

          {/* VIP Privilege Club (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'रॉयल प्रिविलेज क्लब' : 'Privilege Club'}</span>
            </h4>
            <p className="text-stone-400 leading-relaxed text-xs">
              {language === 'hi'
                ? 'अपने प्रथम डाइनिंग आरक्षण पर 10% छूट एवं शेफ़ की ओर से विशेष डेज़र्ट कॉम्प्लिमेंटरी प्राप्त करें।'
                : 'Join our patron circle to receive 10% privilege discount on your first table reservation + complimentary chef dessert.'}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Code <strong>ROYAL10</strong> unlocked! Enjoy your dining!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-stone-100 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Hygiene note */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All Rights Reserved. ISO 22000 Certified Dining.
          </div>

          <div className="flex items-center gap-4">
            <a href="#reserve" className="hover:text-amber-400 transition-colors">
              Table Policy
            </a>
            <span>•</span>
            <a href="#menu" className="hover:text-amber-400 transition-colors">
              Dietary Allergens
            </a>
            <span>•</span>
            {onOpenAdminPortal && (
              <button
                onClick={onOpenAdminPortal}
                className="text-amber-400/90 hover:text-amber-300 font-mono font-medium underline flex items-center gap-1 cursor-pointer"
                title="View Live Supabase Bookings & Orders"
              >
                <span>⚙️ Staff & DB Portal</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
