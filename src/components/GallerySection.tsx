import React, { useState } from 'react';
import { 
  Camera, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { GalleryItem, Language } from '../types/restaurant';
import { GALLERY_ITEMS } from '../data/restaurantData';

interface GallerySectionProps {
  language: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos', hindiLabel: 'सभी झलकियां' },
    { id: 'ambience', label: 'Grand Ambience', hindiLabel: 'शाही परिवेश' },
    { id: 'dishes', label: 'Signature Dishes', hindiLabel: 'खास व्यंजन' },
    { id: 'kitchen', label: 'Kitchen & Tandoor', hindiLabel: 'तंदूर व रसोई स्वच्छता' },
    { id: 'private-dining', label: 'Private Dining (PDR)', hindiLabel: 'प्राइवेट डाइनिंग' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0a0807] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'परिवेश व गैलरी' : 'Visual Feast & Ambience'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 mb-4">
            {language === 'hi' ? 'शाही माहौल की एक झलक' : 'Step Inside Royal Zaika'}
          </h2>

          <p className="text-stone-400 text-sm sm:text-base">
            {language === 'hi'
              ? 'झूमरों की सुनहरी चमक, खुले कोयले के तंदूर और नवाबी आतिथ्य सत्कार का सजीव दृश्य।'
              : 'Gleaming golden chandeliers, live wood-fired tandoor pits, and opulent private dining halls designed for royal comfort.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              {language === 'hi' ? cat.hindiLabel : cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/40 transition-all duration-300 h-80"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-amber-400 text-[10px] uppercase font-bold tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* View Icon on Hover */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-300">
                <Eye className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-stone-950/70 backdrop-blur-md border border-stone-800/80">
                <h4 className="font-serif font-bold text-stone-100 text-sm mb-1 group-hover:text-amber-400 transition-colors">
                  {language === 'hi' ? item.hindiTitle : item.title}
                </h4>
                <p className="text-stone-400 text-xs line-clamp-1">
                  {language === 'hi' ? item.hindiCaption : item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hygiene Certification Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-950 border border-amber-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-stone-100 font-bold text-sm sm:text-base">
                {language === 'hi' ? '100% खुली व स्वच्छ रसोई नीति' : 'Open Glass Kitchen & 5-Star Hygiene Standards'}
              </h4>
              <p className="text-stone-400 text-xs mt-0.5">
                {language === 'hi'
                  ? 'हमारे अतिथि किसी भी समय लाइव तंदूर और शेफ़ की स्वच्छ तैयारी को प्रत्यक्ष देख सकते हैं।'
                  : 'Guests are warmly invited to witness our clay-oven tandoor craft and sanitized stations firsthand.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium">
              ISO 22000 Certified
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-medium">
              FSSAI Gold Rating
            </span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-stone-900 text-stone-300 hover:text-white border border-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-stone-800"
            />

            <div className="mt-4 text-center max-w-xl">
              <h3 className="font-serif text-xl font-bold text-stone-100">
                {language === 'hi'
                  ? filteredItems[lightboxIndex].hindiTitle
                  : filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-stone-400 text-sm mt-1">
                {language === 'hi'
                  ? filteredItems[lightboxIndex].hindiCaption
                  : filteredItems[lightboxIndex].caption}
              </p>
              <span className="text-[11px] text-amber-500 mt-2 inline-block">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
