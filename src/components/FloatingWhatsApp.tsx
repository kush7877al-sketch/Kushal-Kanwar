import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Calendar, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Language } from '../types/restaurant';

interface FloatingWhatsAppProps {
  language: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (text: string) => {
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const quickPrompts = [
    {
      label: 'Book a Table',
      hindiLabel: 'टेबल आरक्षित करें',
      icon: Calendar,
      text: 'Hello Royal Zaika! I would like to book a table for dining.',
    },
    {
      label: "Today's Specials",
      hindiLabel: 'आज की खास पेशकश',
      icon: Sparkles,
      text: "Hello! What are Chef Farooq's specials for lunch/dinner today?",
    },
    {
      label: 'Takeaway Order',
      hindiLabel: 'टेकअवे ऑर्डर दें',
      icon: UtensilsCrossed,
      text: 'Hi! I would like to place a food takeaway/delivery order.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-stone-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-stone-950 flex items-center justify-center text-emerald-400 font-serif font-bold text-base">
                  RZ
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-stone-900"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Royal Zaika Concierge</h4>
                <p className="text-[11px] text-emerald-200">Typically replies within 2 mins</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-600 transition-colors text-emerald-100 cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-stone-950/90 space-y-3 text-xs">
            {/* Agent Greeting Bubble */}
            <div className="bg-stone-900 p-3 rounded-2xl rounded-tl-none border border-stone-800 text-stone-200">
              <p className="leading-relaxed">
                {language === 'hi'
                  ? 'नमस्ते! रॉयल ज़ायका में आपका स्वागत है। टेबल बुकिंग, मेनू या किसी भी सेवा हेतु हम सदैव तत्पर हैं।'
                  : 'Namaste! Welcome to Royal Zaika. How may our hospitality team assist your dining today?'}
              </p>
              <span className="text-[10px] text-stone-500 block text-right mt-1">
                Just now
              </span>
            </div>

            {/* Quick Action Pills */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                {language === 'hi' ? 'त्वरित विकल्प चुनें:' : 'Quick Inquiries:'}
              </p>
              {quickPrompts.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => sendWhatsApp(p.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-stone-900/80 hover:bg-emerald-950/70 border border-stone-800 hover:border-emerald-500/50 text-stone-200 hover:text-emerald-300 transition-all flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === 'hi' ? p.hindiLabel : p.label}</span>
                    </div>
                    <span className="text-stone-500 group-hover:text-emerald-400 transition-colors">→</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customMsg.trim()) sendWhatsApp(customMsg);
              }}
              className="pt-2 flex items-center gap-2"
            >
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder={language === 'hi' ? 'संदेश लिखें...' : 'Type a custom message...'}
                className="flex-1 bg-stone-900 border border-stone-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-stone-100 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-stone-950"
        title="Chat with Royal Zaika on WhatsApp"
        aria-label="Open WhatsApp conversation"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping -z-10" />
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        
        {/* Tooltip on hover */}
        {!isOpen && (
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            {language === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'WhatsApp Us Directly'}
          </span>
        )}
      </button>
    </div>
  );
};
