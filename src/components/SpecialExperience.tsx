import React from 'react';
import { Sparkles, Utensils, Star, Flame, ArrowRight, Heart } from 'lucide-react';
import { Language, Dish } from '../types/restaurant';
import { MENU_ITEMS } from '../data/restaurantData';

interface SpecialExperienceProps {
  language: Language;
  onAddToCart: (dish: Dish) => void;
  onOpenReservation: () => void;
}

export const SpecialExperience: React.FC<SpecialExperienceProps> = ({
  language,
  onAddToCart,
  onOpenReservation,
}) => {
  const featuredSpecial = MENU_ITEMS.find((d) => d.id === 'rz-01')!; // Awadhi Galouti Kebab
  const signatureDal = MENU_ITEMS.find((d) => d.id === 'rz-07')!; // Dal Zaika

  return (
    <section className="py-20 bg-gradient-to-b from-[#0c0a09] via-stone-950 to-[#0e0c0b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual Card Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Chef's Royal Degustation Pairing */}
          <div className="rounded-3xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-amber-500/30 p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl group hover:border-amber-500/60 transition-all duration-500">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-500/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'hi' ? 'आज की खास पेशकश' : "Chef's Signature Pairing"}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mb-3">
                {language === 'hi' ? 'अवधी गलौटी कबाब व उल्टे तवे का पराठा' : 'The Legendary Awadhi Galouti Duet'}
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                {language === 'hi'
                  ? '32 गुप्त शाही मसालों से तैयार, मुंह में मक्खन की तरह घुल जाने वाले कबाब। नवाब वाजिद अली शाह के शाही रसोइयों की विरासत को आज भी उसी सादगी और नफ़ासत से परोसा जाता है।'
                  : 'Originated in the royal court of Nawab Asaf-ud-Daula, our lamb patties are slow-seared on an inverted iron griddle until extraordinarily silken. Paired with house-pickled shallots & mint reduction.'}
              </p>

              {/* Quick dish preview pill */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredSpecial.image}
                    alt={featuredSpecial.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-stone-100 font-semibold text-sm block">
                      {featuredSpecial.name}
                    </span>
                    <span className="text-amber-400 font-bold text-sm">
                      ₹{featuredSpecial.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(featuredSpecial)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {language === 'hi' ? '+ जोड़ें' : '+ Add to Order'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800/80 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Freshly prepared per order</span>
              </span>
              <span className="text-amber-400 font-medium">Authentic Awadhi Recipe</span>
            </div>
          </div>

          {/* Card 2: 36-Hour Simmered Dal Zaika Spotlight */}
          <div className="rounded-3xl bg-gradient-to-br from-stone-900/90 to-stone-950 border border-stone-800 p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl group hover:border-amber-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{language === 'hi' ? 'शुद्ध शाकाहारी गौरव' : 'Signature Vegetarian Marvel'}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mb-3">
                {language === 'hi' ? 'दाल ज़ायका (36 घंटे धीमी आंच पर पकी)' : 'Dal Zaika: The 36-Hour Masterpiece'}
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                {language === 'hi'
                  ? 'काली उड़द और राजमा को रात भर सुलगते चारकोल पर पकाया जाता है। इसके पश्चात शुद्ध मक्खन और ताज़ी कस्तूरी मेथी का तड़का इसे मखमली बनावट देता है।'
                  : 'Whole black lentils & red kidney beans simmered continuously over dying charcoal embers for 36 hours with churned white butter, vine-ripened tomatoes, and toasted kasoori methi.'}
              </p>

              {/* Quick dish preview pill */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={signatureDal.image}
                    alt={signatureDal.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-stone-100 font-semibold text-sm block">
                      {signatureDal.name}
                    </span>
                    <span className="text-amber-400 font-bold text-sm">
                      ₹{signatureDal.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(signatureDal)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {language === 'hi' ? '+ जोड़ें' : '+ Add to Order'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800/80 text-xs">
              <button
                onClick={onOpenReservation}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{language === 'hi' ? 'डाइनिंग टेबल बुक करें' : 'Reserve a Table to Taste This'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-stone-500">100% Desi Ghee</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
