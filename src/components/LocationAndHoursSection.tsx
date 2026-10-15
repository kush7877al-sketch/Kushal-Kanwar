import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Car, 
  Sparkles, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationAndHoursSectionProps {
  language: Language;
}

export const LocationAndHoursSection: React.FC<LocationAndHoursSectionProps> = ({ language }) => {
  // Determine if open now based on current time
  const isCurrentlyOpen = true; // Open daily 11:30 AM to 11:30 PM

  return (
    <section id="contact" className="py-24 bg-[#0a0807] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'स्थान व कार्य समय' : 'Location & Timings'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 mb-4">
            {language === 'hi' ? 'रॉयल ज़ायका में पधारें' : 'Visit Our Royal Sanctuary'}
          </h2>

          <p className="text-stone-400 text-sm sm:text-base">
            {language === 'hi'
              ? 'कनॉट प्लेस के ऐतिहासिक हृदय में स्थित, जहां हर शाम नवाबी आतिथ्य का उत्सव सजता है।'
              : 'Conveniently situated in the heritage heart of Connaught Place with complimentary valet parking and direct metro access.'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Card (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/70 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            
            <div className="space-y-6">
              {/* Live Status indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{language === 'hi' ? 'खुला है - रात 11:30 बजे तक सेवारत' : 'Open Now • Serving till 11:30 PM'}</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-100 text-sm mb-1">
                    {language === 'hi' ? 'पता' : 'Address'}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {language === 'hi' ? RESTAURANT_INFO.hindiAddress : RESTAURANT_INFO.address}
                  </p>
                  <p className="text-[11px] text-amber-500 mt-1 flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    <span>{RESTAURANT_INFO.landmark}</span>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-semibold text-stone-100 text-sm mb-1">
                    {language === 'hi' ? 'डाइनिंग समय' : 'Operating Hours'}
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Monday - Friday:</span>
                      <span className="font-medium text-stone-200">{RESTAURANT_INFO.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Saturday & Sunday:</span>
                      <span className="font-medium text-amber-400">{RESTAURANT_INFO.hours.weekends}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact direct */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-100 text-sm mb-1">
                    {language === 'hi' ? 'फोन व बुकिंग पूछताछ' : 'Hotline & Enquiries'}
                  </h4>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-stone-200 hover:text-amber-400 text-xs sm:text-sm font-semibold transition-colors block"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="text-stone-400 hover:text-amber-400 text-xs transition-colors block mt-0.5"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Valet Parking Amenity */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-3">
                <Car className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-stone-200 font-semibold block">Complimentary Valet Parking</span>
                  <span className="text-stone-400">Drop your keys at the portico with our white-gloved chauffeur.</span>
                </div>
              </div>
            </div>

            {/* Direct Directions Action Button */}
            <div className="pt-4 border-t border-stone-800">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'hi' ? 'गूगल मैप्स पर दिशा-निर्देश पाएं' : 'Get Directions via Google Maps'}</span>
              </a>
            </div>

          </div>

          {/* Interactive Map Embed Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-stone-800 bg-stone-900 relative shadow-2xl min-h-[420px] flex flex-col">
            {/* Embedded Google Maps iFrame */}
            <iframe
              title="Royal Zaika Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114774320286!2d77.2117565!3d28.6324294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b67b1469%3A0x6b63d917f8b9e67f!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[420px] border-0 filter invert-[90%] hue-rotate-180 contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Overlay Badge on Map */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-amber-500/40 shadow-xl max-w-xs pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                <h5 className="font-serif font-bold text-stone-100 text-sm">
                  Royal Zaika Dining
                </h5>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Heritage Boulevard, Connaught Place • 2 Mins from Rajiv Chowk Metro
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
