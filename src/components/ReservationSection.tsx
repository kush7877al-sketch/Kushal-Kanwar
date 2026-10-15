import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Heart, 
  PartyPopper, 
  Briefcase, 
  MapPin, 
  Download,
  Share2,
  X
} from 'lucide-react';
import { Language, Reservation } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { submitReservation } from '../services/api';

interface ReservationSectionProps {
  language: Language;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ language }) => {
  // Form fields state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('08:00 PM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<Reservation['seatingArea']>('fine-dining');
  const [occasion, setOccasion] = useState<Reservation['occasion']>('romantic-date');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation modal state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Available time slots
  const lunchSlots = ['12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
  const dinnerSlots = ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM'];

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !timeSlot) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitReservation({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        date,
        timeSlot,
        guests,
        seatingArea,
        occasion,
        specialRequests: specialRequests.trim() || undefined,
      });

      const confirmedId = result?.reservation?.id || `RZ-${Math.floor(1000 + Math.random() * 9000)}`;

      const newReservation: Reservation = {
        id: confirmedId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        date,
        timeSlot,
        guests,
        seatingArea,
        occasion,
        specialRequests: specialRequests.trim() || undefined,
        createdAt: new Date().toLocaleTimeString(),
      };

      setConfirmedReservation(newReservation);
    } catch (err) {
      console.error(err);
      // Fallback
      const fallbackCode = `RZ-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedReservation({
        id: fallbackCode,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        date,
        timeSlot,
        guests,
        seatingArea,
        occasion,
        specialRequests: specialRequests.trim() || undefined,
        createdAt: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate WhatsApp confirmation message link
  const generateWhatsAppUrl = (res: Reservation) => {
    const seatingLabels: Record<string, string> = {
      'fine-dining': 'Grand Royal Dining Hall',
      'rooftop': 'Starlight Rooftop Terrace',
      'couple-booth': 'Candlelight Couple Booth',
      'private-dining': 'Royal Private Dining Room (PDR)',
    };

    const text = `*New Table Reservation - Royal Zaika* 👑
--------------------------------
*Booking ID:* ${res.id}
*Guest Name:* ${res.name}
*Phone:* ${res.phone}
*Guests:* ${res.guests} Person(s)
*Date:* ${res.date}
*Time Slot:* ${res.timeSlot}
*Seating Area:* ${seatingLabels[res.seatingArea] || res.seatingArea}
*Occasion:* ${res.occasion}
${res.specialRequests ? `*Special Request:* ${res.specialRequests}` : ''}
--------------------------------
Please confirm table availability. Thank you!`;

    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reserve" className="py-24 bg-[#0d0b0a] relative overflow-hidden border-t border-amber-950/40">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'शाही टेबल आरक्षण' : 'Table Reservation'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 mb-4">
            {language === 'hi' ? 'अपनी टेबल आरक्षित करें' : 'Reserve Your Royal Experience'}
          </h2>

          <p className="text-stone-400 text-sm sm:text-base">
            {language === 'hi'
              ? 'परिवार, मित्रों या खास अवसर के लिए अग्रिम बुकिंग करें। तुरंत पुष्टि हेतु सीधा व्हाट्सएप सपोर्ट उपलब्ध है।'
              : 'Secure your preferred seating in our Grand Dining Hall, Candlelight Booth, or Starlight Rooftop. Instant confirmation via WhatsApp.'}
          </p>
        </div>

        {/* Main Grid: Form & Ambience Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'अतिथि का नाम *' : 'Guest Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'फ़ोन नंबर (व्हाट्सएप) *' : 'WhatsApp / Mobile Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Date and Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'तारीख चुनें *' : 'Reservation Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none transition-colors scheme-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'अतिथियों की संख्या *' : 'Number of Guests *'}
                  </label>
                  <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-xl p-1.5">
                    {[1, 2, 4, 6, 8, 10].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          guests === num
                            ? 'bg-amber-500 text-stone-950 shadow'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {num === 10 ? '10+' : num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Time Slot Selectors */}
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>{language === 'hi' ? 'समय स्लॉट चुनें *' : 'Select Time Slot *'}</span>
                  <span className="text-[11px] text-amber-500 font-normal lowercase">
                    {timeSlot.includes('PM') ? 'Evening Service' : 'Afternoon Lunch'}
                  </span>
                </label>

                {/* Lunch slots */}
                <div className="mb-2">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? 'दोपहर (लंच)' : 'Lunch Hours'}
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {lunchSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-1 text-center text-xs rounded-xl font-medium border transition-all cursor-pointer ${
                          timeSlot === slot
                            ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dinner slots */}
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? 'शाम (डिनर)' : 'Dinner Service'}
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {dinnerSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-1 text-center text-xs rounded-xl font-medium border transition-all cursor-pointer ${
                          timeSlot === slot
                            ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Seating Preference */}
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'बैठने का पसंदीदा स्थान' : 'Seating Preference'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'fine-dining', label: 'Grand Hall', hindi: 'शाही हॉल' },
                    { id: 'rooftop', label: 'Rooftop Garden', hindi: 'रूफटॉप' },
                    { id: 'couple-booth', label: 'Couple Booth', hindi: 'कैंडललाइट' },
                    { id: 'private-dining', label: 'Private Room (PDR)', hindi: 'प्राइवेट PDR' },
                  ].map((seat) => (
                    <button
                      type="button"
                      key={seat.id}
                      onClick={() => setSeatingArea(seat.id as Reservation['seatingArea'])}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        seatingArea === seat.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">
                        {language === 'hi' ? seat.hindi : seat.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Occasion */}
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'अवसर (यदि कोई हो)' : 'Special Occasion'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'romantic-date', label: 'Romantic Date', hindi: 'रोमांटिक डेट' },
                    { id: 'anniversary', label: 'Anniversary', hindi: 'सालगिरह' },
                    { id: 'birthday', label: 'Birthday', hindi: 'जन्मदिन' },
                    { id: 'family-gathering', label: 'Family Dinner', hindi: 'पारिवारिक' },
                    { id: 'business', label: 'Business Meet', hindi: 'बिज़नेस' },
                  ].map((occ) => (
                    <button
                      type="button"
                      key={occ.id}
                      onClick={() => setOccasion(occ.id as Reservation['occasion'])}
                      className={`py-2 px-2 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                        occasion === occ.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {language === 'hi' ? occ.hindi : occ.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 6: Special Requests */}
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'विशेष अनुरोध (वैकल्पिक)' : 'Special Requests / Dietary Notes'}
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा: सालगिरह केक, बच्चों हेतु हाई चेयर, कम तीखा...' : 'e.g. Complimentary anniversary cake arrangement, baby chair, quiet corner...'}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-base tracking-wide shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'hi' ? 'आरक्षण दर्ज हो रहा है...' : 'Confirming Reservation...'}</span>
                ) : (
                  <>
                    <CalendarIcon className="w-5 h-5 text-stone-950" />
                    <span>{language === 'hi' ? 'तुरंत टेबल आरक्षित करें' : 'Confirm Table Reservation'}</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-stone-400">
                {language === 'hi'
                  ? '🔒 कोई अग्रिम शुल्क नहीं। 15 मिनट की ग्रेस अवधि के साथ टेबल सुरक्षित की जाती है।'
                  : '🔒 Zero cancellation fee. Tables are held for 15 minutes beyond reserved time slot.'}
              </p>
            </form>
          </div>

          {/* Right Column: Experience Cards & Perks (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Private Dining & Rooftop Showcase */}
            <div className="rounded-3xl overflow-hidden bg-stone-900/60 border border-stone-800 p-6 space-y-4">
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                  alt="Starlight Rooftop Dining"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold text-xs">
                  {language === 'hi' ? 'रूफटॉप कैंडललाइट' : 'Starlight Rooftop'}
                </span>
              </div>

              <h4 className="font-serif text-lg font-bold text-stone-100">
                {language === 'hi' ? 'रोमांटिक शाम और पारिवारिक उत्सव' : 'Curated Celebrations & Special Moments'}
              </h4>

              <p className="text-stone-400 text-xs leading-relaxed">
                {language === 'hi'
                  ? 'जन्मदिन, सालगिरह या प्रियजनों के साथ डिनर के लिए हम मोमबत्तियों की सजावट, लाइव सितार वादन और कस्टमाइज़्ड केक की व्यवस्था भी करते हैं।'
                  : 'Let our hospitality team elevate your anniversaries and birthdays with ambient candlelight setup, rose petals, and custom chef pairings.'}
              </p>
            </div>

            {/* Instant WhatsApp Support Card */}
            <div className="rounded-3xl bg-emerald-950/40 border border-emerald-500/30 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-stone-100 font-bold text-sm">
                    {language === 'hi' ? 'व्हाट्सएप पर तुरंत पुष्टि' : 'Prefer Booking via WhatsApp?'}
                  </h4>
                  <p className="text-emerald-400 text-xs">
                    {language === 'hi' ? '2 मिनट में रेस्तरां मैनेजर से सीधा संवाद' : 'Direct line with our Guest Host'}
                  </p>
                </div>
              </div>

              <p className="text-stone-400 text-xs">
                {language === 'hi'
                  ? 'बड़ी पार्टियों (15+ लोग) या कॉर्पोरेट हॉल बुकिंग के लिए व्हाट्सएप पर हमसे सीधे चैट करें।'
                  : 'Have special dietary demands, private banquet queries or large group seating (15+)?'}
              </p>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Royal Zaika Team, I want to book a table for our family.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>

            {/* Helpline Info */}
            <div className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800 text-xs text-stone-400 flex items-center justify-between">
              <div>
                <span className="block text-stone-300 font-medium">Reservation Concierge:</span>
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-amber-400 hover:bg-stone-700 text-xs font-semibold"
              >
                Call Hotline
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Instant Confirmation Modal */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-stone-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setConfirmedReservation(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-950 text-stone-400 hover:text-stone-100 border border-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Success Badge */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider">
                Booking ID: {confirmedReservation.id}
              </span>

              <h3 className="font-serif text-2xl font-bold text-stone-100">
                {language === 'hi' ? 'आपकी टेबल आरक्षित हो गई है!' : 'Table Reserved Successfully!'}
              </h3>

              <p className="text-stone-400 text-xs">
                {language === 'hi'
                  ? 'रॉयल ज़ायका में आपका स्वागत करने के लिए हम उत्सुक हैं।'
                  : 'We look forward to hosting you for an exquisite dining experience.'}
              </p>
            </div>

            {/* Ticket Summary Box */}
            <div className="bg-stone-950 rounded-2xl p-4 border border-stone-800 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Guest Name:</span>
                <span className="text-stone-100 font-bold">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Date & Time:</span>
                <span className="text-amber-400 font-bold">
                  {confirmedReservation.date} at {confirmedReservation.timeSlot}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Guests & Area:</span>
                <span className="text-stone-200">
                  {confirmedReservation.guests} Guest(s) • {confirmedReservation.seatingArea}
                </span>
              </div>
              {confirmedReservation.specialRequests && (
                <div className="flex justify-between">
                  <span className="text-stone-400">Notes:</span>
                  <span className="text-stone-300 italic">{confirmedReservation.specialRequests}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* WhatsApp direct confirmation button */}
              <a
                href={generateWhatsAppUrl(confirmedReservation)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{language === 'hi' ? 'व्हाट्सएप पर पुष्टि भेजें' : 'Send to WhatsApp for Instant Confirmation'}</span>
              </a>

              <button
                onClick={() => setConfirmedReservation(null)}
                className="w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'बंद करें और मेनू देखें' : 'Done & Continue Browsing'}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
