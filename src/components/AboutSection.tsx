import React from 'react';
import { 
  Sparkles, 
  UtensilsCrossed, 
  HeartHandshake, 
  Leaf, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types/restaurant';

interface AboutSectionProps {
  language: Language;
  onOpenReservation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language, onOpenReservation }) => {
  const highlights = [
    {
      title: 'Heirloom Spice Blends',
      hindiTitle: '32 गुप्त शाही मसालों का मिश्रण',
      desc: 'Each spice is sun-dried and stone-ground by hand in our spice atelier to preserve volatile aromatic essential oils.',
      hindiDesc: 'हाथ से कुटे खड़े मसाले और कश्मीरी केसर, जो हर निवाले में शाही खुशबू घोल देते हैं।',
    },
    {
      title: 'Charcoal Dum Pukht Legacy',
      hindiTitle: 'पारंपरिक दम पुख्त व कच्ची हांडी',
      desc: 'We never rush perfection. Our curries and biryanis are gently simmered in clay handis sealed with whole-wheat dough.',
      hindiDesc: 'आटे से सील मिट्टी के बर्तनों में धीमी आंच पर पकने से मांस और सब्ज़ियां अपने ही रस में रसदार बनती हैं।',
    },
    {
      title: '100% Pure Desi Ghee & Farm Fresh',
      hindiTitle: 'शुद्ध देसी घी व ताज़ा उत्पाद',
      desc: 'No palm oils, zero artificial food coloring, and dairy sourced daily from organic heritage farms.',
      hindiDesc: 'बिना किसी कृत्रिम रंग या पाम ऑयल के, विशुद्ध देसी घी और जैविक फार्म की ताज़ा सामग्री।',
    },
    {
      title: 'Five-Star Pristine Hygiene',
      hindiTitle: 'उच्चतम स्वच्छता व खुला किचन',
      desc: 'ISO 22000 certified culinary cleanliness standards, RO-filtered water across all prep, and sanitized stations.',
      hindiDesc: 'खुली और साफ-सुथरी रसोई जहां शेफ उच्चतम स्वच्छता मानकों का पालन करते हैं।',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0e0c0b] relative overflow-hidden border-t border-b border-amber-950/40">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image: Master Chef preparing Awadhi delicacy */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                  alt="Master Chef Farooq Zaidi in Royal Zaika Kitchen"
                  className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                {/* Floating caption on image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-amber-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-100 font-serif font-bold text-sm">
                        {language === 'hi' ? 'उस्ताद शेफ़ फारूक़ ज़ैदी' : 'Executive Chef Farooq Zaidi'}
                      </h4>
                      <p className="text-amber-400 text-xs">
                        {language === 'hi' ? 'अवधी नवाबी खानदान की तीसरी पीढ़ी के रसोइए' : '3rd-Gen Awadhi Royal Culinary Heir'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping Badge: 25+ Years */}
              <div className="absolute -top-6 -right-6 hidden sm:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 text-stone-950 p-1 shadow-xl shadow-amber-500/30 animate-pulse">
                <div className="w-full h-full rounded-full bg-amber-500 flex flex-col items-center justify-center text-center p-2 border-2 border-stone-950">
                  <span className="font-serif text-2xl font-black leading-none text-stone-950">25+</span>
                  <span className="text-[10px] uppercase font-bold tracking-tight text-stone-900 mt-1">
                    {language === 'hi' ? 'वर्षीय परंपरा' : 'Years Heritage'}
                  </span>
                </div>
              </div>

              {/* Secondary Accent Card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block p-4 rounded-2xl bg-stone-900/95 border border-stone-800 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-400" />
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">
                      {language === 'hi' ? 'सर्वश्रेष्ठ डाइनिंग अवार्ड' : 'Culinary Excellence'}
                    </p>
                    <p className="text-sm font-bold text-stone-100">Times Food & Nightlife 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Quality Commitments */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'हमारी विरासत व समर्पण' : 'Our Story & Philosophy'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 leading-tight">
              {language === 'hi' ? (
                <>
                  नवाबों के दस्तरख्वान से आपके <br />
                  <span className="gold-gradient-text">स्वादिष्ट अनुभव तक</span>
                </>
              ) : (
                <>
                  From the Royal Kitchens of Awadh <br />
                  <span className="gold-gradient-text">To Your Memorable Table</span>
                </>
              )}
            </h2>

            <p className="text-stone-300 text-base leading-relaxed">
              {language === 'hi'
                ? 'रॉयल ज़ायका केवल एक रेस्तरां नहीं, बल्कि भारतीय पाक-संस्कृति का एक जीवंत उत्सव है। हमारे व्यंजन पीढ़ियों पुरानी पारंपरिक व्यंजनों की डायरी से लिए गए हैं, जहां मसालों का संतुलन और पकाने का धीरज ही असली स्वाद की कुंजी है।'
                : 'Founded with a deep reverence for the culinary traditions of Lucknow, Delhi-6, and Hyderabad, Royal Zaika is born from the belief that great food takes time, love, and untainted ingredients. Every gravy is braised for hours, and every bread is baked in clay pits over glowing coal.'}
            </p>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-stone-100 text-sm mb-1">
                        {language === 'hi' ? item.hindiTitle : item.title}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {language === 'hi' ? item.hindiDesc : item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA & Quote */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stone-800/80">
              <div>
                <p className="font-serif italic text-stone-300 text-sm">
                  {language === 'hi'
                    ? '"स्वाद जब दिल को छू जाए, तो हर मुलाकात एक उत्सव बन जाती है।"'
                    : '"When food touches the soul, every meal turns into a royal celebration."'}
                </p>
                <span className="text-xs text-amber-500 font-medium tracking-wide">
                  — Chef Farooq Zaidi, Culinary Director
                </span>
              </div>

              <button
                onClick={onOpenReservation}
                className="px-6 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-amber-300 hover:text-stone-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0"
              >
                {language === 'hi' ? 'डाइनिंग बुक करें' : 'Book a Dining Table'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
