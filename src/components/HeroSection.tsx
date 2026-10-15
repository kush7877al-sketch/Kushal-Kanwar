import React from 'react';
import { 
  Calendar, 
  Utensils, 
  Star, 
  Flame, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  MessageCircle,
  Award
} from 'lucide-react';
import { Language } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  language: Language;
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenReservation,
  onOpenMenu,
}) => {
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background imagery with deep cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Royal Zaika Restaurant Ambience"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.32] contrast-110"
        />
        {/* Warm amber and charcoal atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-stone-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.18),transparent_70%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Royal Crest / Award Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium tracking-wider mb-6 shadow-xl backdrop-blur-md animate-in fade-in zoom-in duration-500">
          <Award className="w-4 h-4 text-amber-400" />
          <span>
            {language === 'hi' 
              ? '★ विख्यात अवधी व मुग़लाई परंपरा - 25+ वर्षों का विश्वास' 
              : '★ Authentic Awadhi & Mughlai Heritage - Since 1999'}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-stone-100 max-w-5xl mx-auto leading-[1.1] mb-6">
          <span className="block">{RESTAURANT_INFO.name}</span>
          <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 font-normal italic gold-gradient-text">
            {language === 'hi' ? '« स्वाद ऐसा जो दिल छू जाए »' : '« Authentic Flavors, Unforgettable Moments »'}
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-10">
          {language === 'hi'
            ? 'मिट्टी के तंदूर में सुलगते मसालेदार कबाब, 36 घंटे धीमी आंच पर पकी दाल ज़ायका और असली दम में पकी शाही बिरयानी का अविस्मरणीय अनुभव।'
            : 'Indulge in charcoal-smoked kebabs, 36-hour slow-cooked Dal Zaika, and heirloom handi Dum Biryani prepared with pure desi ghee and hand-pounded royal spices.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-14">
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-bold text-base tracking-wide shadow-2xl shadow-amber-500/30 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Calendar className="w-5 h-5 text-stone-950 group-hover:rotate-6 transition-transform" />
            <span>{language === 'hi' ? 'टेबल आरक्षित करें' : 'Reserve a Table'}</span>
          </button>

          <a
            href="#menu"
            onClick={onOpenMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900/90 border border-stone-700 hover:border-amber-500/70 text-stone-200 hover:text-amber-400 font-medium text-base tracking-wide backdrop-blur-md hover:bg-stone-800/90 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Utensils className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{language === 'hi' ? 'मेनू देखें' : 'View Full Menu'}</span>
          </a>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Royal Zaika! I want to view today\'s specials and place an order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/90 hover:text-emerald-200 font-medium text-base tracking-wide backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>{language === 'hi' ? 'व्हाट्सएप ऑर्डर' : 'WhatsApp Order'}</span>
          </a>
        </div>

        {/* Rating and Key Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-stone-800/80">
          {/* Badge 1: Google Rating */}
          <div className="p-3 sm:p-4 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm sm:text-base flex items-center gap-1">
                <span>{RESTAURANT_INFO.rating}</span>
                <span className="text-amber-400 text-xs">★★★★★</span>
              </div>
              <div className="text-stone-400 text-xs">
                {language === 'hi' ? '1,480+ गूगल समीक्षाएं' : '1,480+ Google Reviews'}
              </div>
            </div>
          </div>

          {/* Badge 2: Authentic Clay Tandoor */}
          <div className="p-3 sm:p-4 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="p-2 sm:p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm sm:text-base">
                {language === 'hi' ? 'लाइव तंदूर' : 'Live Charcoal'}
              </div>
              <div className="text-stone-400 text-xs">
                {language === 'hi' ? 'धधकते कोयले की भट्टी' : 'Authentic Tandoor Pit'}
              </div>
            </div>
          </div>

          {/* Badge 3: 36-Hr Slow Cook */}
          <div className="p-3 sm:p-4 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm sm:text-base">
                {language === 'hi' ? '36 घंटे दम' : 'Dum Pukht'}
              </div>
              <div className="text-stone-400 text-xs">
                {language === 'hi' ? 'धीमी आंच पर पका' : 'Slow Charcoal Simmer'}
              </div>
            </div>
          </div>

          {/* Badge 4: Hygiene & Pure Ghee */}
          <div className="p-3 sm:p-4 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm flex items-center gap-3 text-left">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm sm:text-base">
                {language === 'hi' ? 'शुद्ध व स्वच्छ' : '100% Pure Ghee'}
              </div>
              <div className="text-stone-400 text-xs">
                {language === 'hi' ? 'अल्ट्रा-हाइजीनिक किचन' : 'Certified Kitchen'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0a09] to-transparent pointer-events-none" />
    </section>
  );
};
