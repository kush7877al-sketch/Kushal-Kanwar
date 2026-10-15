/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SpecialExperience } from './components/SpecialExperience';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationAndHoursSection } from './components/LocationAndHoursSection';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Dish, Language } from './types/restaurant';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [cart, setCart] = useState<{ [dishId: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => {
      const current = prev[dishId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[dishId];
        return copy;
      }
      return {
        ...prev,
        [dishId]: current - 1,
      };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const scrollToReservation = () => {
    const el = document.getElementById('reserve');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservation}
        onOpenAdminPortal={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          language={language}
          onOpenReservation={scrollToReservation}
          onOpenMenu={scrollToMenu}
        />

        {/* 2. About Us & Heritage */}
        <AboutSection
          language={language}
          onOpenReservation={scrollToReservation}
        />

        {/* 3. Chef's Special Experiences */}
        <SpecialExperience
          language={language}
          onAddToCart={handleAddToCart}
          onOpenReservation={scrollToReservation}
        />

        {/* 4. Interactive Digital Menu */}
        <MenuSection
          language={language}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 5. Online Table Reservation Form */}
        <ReservationSection
          language={language}
        />

        {/* 6. Photo & Ambience Gallery */}
        <GallerySection
          language={language}
        />

        {/* 7. Customer Testimonials & Reviews */}
        <TestimonialsSection
          language={language}
        />

        {/* 8. Location, Hours & Direct Map */}
        <LocationAndHoursSection
          language={language}
        />
      </main>

      {/* Floating Bottom Cart Bar when items are selected */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-6 z-40 animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-stone-900/95 border border-amber-500 text-stone-100 shadow-2xl backdrop-blur-md hover:bg-stone-850 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>

            <div className="text-left text-xs">
              <span className="font-bold text-amber-400 block leading-tight">
                {totalCartCount} {language === 'hi' ? 'व्यंजन ट्रे में' : 'Items in Tray'}
              </span>
              <span className="text-[10px] text-stone-400">
                {language === 'hi' ? 'व्हाट्सएप ऑर्डर तैयार करें' : 'View & Send to WhatsApp'}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Slide-over Order Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp language={language} />

      {/* Staff & Database Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
      />

      {/* Footer */}
      <Footer 
        language={language}
        onOpenAdminPortal={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
