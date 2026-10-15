import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Plus, 
  Minus, 
  Check, 
  Info, 
  SlidersHorizontal,
  Utensils,
  Eye,
  X
} from 'lucide-react';
import { Dish, Language, DietaryType } from '../types/restaurant';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuSectionProps {
  language: Language;
  cart: { [dishId: string]: number };
  onAddToCart: (dish: Dish) => void;
  onRemoveFromCart: (dishId: string) => void;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  language,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishModal, setSelectedDishModal] = useState<Dish | null>(null);

  const categories = [
    { id: 'all', label: 'All Delicacies', hindiLabel: 'समस्त व्यंजन' },
    { id: 'chefs-special', label: "Chef's Special", hindiLabel: 'खास पेशकश ⭐' },
    { id: 'starters', label: 'Starters & Kebabs', hindiLabel: 'कबाब व शुरुआत' },
    { id: 'main-course', label: 'Royal Main Course', hindiLabel: 'शाही मुख्य भोजन' },
    { id: 'biryani-breads', label: 'Biryani & Breads', hindiLabel: 'दम बिरयानी व नान' },
    { id: 'desserts', label: 'Royal Desserts', hindiLabel: 'शाही मिष्ठान' },
    { id: 'beverages', label: 'Beverages & Thandai', hindiLabel: 'शीतल पेय व ठंडाई' },
  ];

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'chefs-special') {
          if (!dish.isChefSpecial) return false;
        } else if (dish.category !== activeCategory) {
          return false;
        }
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !dish.isVeg) return false;
      if (dietaryFilter === 'non-veg' && dish.isVeg) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesHindi = dish.hindiName.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesDesc) return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const renderSpicyMeter = (level: number) => {
    if (level === 0) return null;
    return (
      <div 
        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-[11px] font-medium"
        title={`Spiciness: ${level === 1 ? 'Mild' : level === 2 ? 'Medium' : 'Hot'}`}
      >
        <span className="flex items-center text-xs">
          {'🌶️'.repeat(level)}
        </span>
        <span className="ml-1 text-[10px] hidden xs:inline">
          {level === 1 ? 'Mild' : level === 2 ? 'Medium' : 'Fiery'}
        </span>
      </div>
    );
  };

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <section id="menu" className="py-24 bg-[#0a0908] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'शाही दस्तरख्वान मेनू' : 'Interactive Digital Menu'}</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 mb-4">
            {language === 'hi' ? 'स्वाद और सुगंध का अद्भुत संगम' : 'Culinary Masterpieces & Royal Recipes'}
          </h2>
          
          <p className="text-stone-400 text-sm sm:text-base">
            {language === 'hi'
              ? 'प्रत्येक व्यंजन ताज़गी, शुद्ध मसालों और सदियों पुरानी पाककला के साथ तैयार किया जाता है।'
              : 'Each dish is meticulously crafted using heirloom spice formulas, slow earthen cooking, and certified farm ingredients.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          {/* Search and Dietary Switch */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-stone-900/80 p-3 sm:p-4 rounded-2xl border border-stone-800">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'व्यंजन खोजें (उदा: कबाब, बिरयानी, पनीर)...' : 'Search dishes (e.g. Galouti, Biryani, Dal Zaika)...'}
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2 text-stone-200 placeholder-stone-500 text-sm focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Type Radio Buttons */}
            <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 shrink-0 overflow-x-auto">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'all'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {language === 'hi' ? 'सभी व्यंजन' : 'All Dishes'}
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white font-bold shadow'
                    : 'text-stone-400 hover:text-emerald-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block border border-white"></span>
                <span>{language === 'hi' ? 'शुद्ध शाकाहारी' : 'Pure Veg'}</span>
              </button>

              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-red-700 text-white font-bold shadow'
                    : 'text-stone-400 hover:text-red-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block border border-white"></span>
                <span>{language === 'hi' ? 'मांसाहारी' : 'Non-Veg'}</span>
              </button>
            </div>
          </div>

          {/* Categorized Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-stone-900/60 text-stone-400 border-stone-800/80 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {language === 'hi' ? cat.hindiLabel : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dish Count Banner */}
        <div className="flex items-center justify-between text-xs text-stone-400 mb-6 px-1">
          <span>
            {language === 'hi'
              ? `${filteredDishes.length} व्यंजन उपलब्ध हैं`
              : `Showing ${filteredDishes.length} culinary dishes`}
          </span>

          {totalCartItems > 0 && (
            <button
              onClick={onOpenCart}
              className="text-amber-400 hover:text-amber-300 font-medium underline flex items-center gap-1 cursor-pointer"
            >
              <span>{totalCartItems} {language === 'hi' ? 'आइटम चुने गए' : 'items in pre-order'}</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Dish Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-stone-900/40 border border-stone-800">
            <Utensils className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-stone-200 font-serif text-lg font-bold mb-1">
              {language === 'hi' ? 'कोई व्यंजन नहीं मिला' : 'No dishes matched your filter'}
            </h3>
            <p className="text-stone-400 text-xs max-w-sm mx-auto mb-4">
              {language === 'hi' ? 'कृपया अपनी खोज या फ़िल्टर बदल कर देखें।' : 'Try clearing your search query or switching category filters.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-semibold"
            >
              {language === 'hi' ? 'सभी फ़िल्टर रीसेट करें' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const qty = cart[dish.id] || 0;

              return (
                <div
                  key={dish.id}
                  className="group rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/50 hover:bg-stone-900/90 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  {/* Dish Image Container */}
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-stone-950">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                      {/* Veg / Non-Veg Icon Standard */}
                      <div
                        className={`w-6 h-6 rounded bg-stone-950/90 backdrop-blur-md flex items-center justify-center border ${
                          dish.isVeg ? 'border-emerald-500/80' : 'border-red-500/80'
                        }`}
                        title={dish.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                      </div>

                      {/* Chef Special Badge */}
                      {dish.isChefSpecial && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-bold tracking-wide uppercase shadow-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Chef's Choice</span>
                        </span>
                      )}

                      {/* Bestseller Badge */}
                      {dish.isBestseller && !dish.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold tracking-wide uppercase shadow-md">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Spicy Meter & Portion */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {renderSpicyMeter(dish.spicyLevel)}
                    </div>

                    {/* Quick Preview Button */}
                    <button
                      onClick={() => setSelectedDishModal(dish)}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700/60 backdrop-blur-md transition-colors cursor-pointer"
                      title="View Details"
                      aria-label="View dish details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Portion indicator bottom-left */}
                    <div className="absolute bottom-3 left-3 text-[11px] text-stone-300 font-medium bg-stone-950/80 px-2 py-0.5 rounded-md backdrop-blur-md border border-stone-800">
                      {language === 'hi' ? dish.portionHindi : dish.portion}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Titles */}
                      <div className="mb-2">
                        <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                          {dish.name}
                        </h3>
                        <p className="text-xs text-amber-500/90 font-medium">
                          {dish.hindiName}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-stone-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {language === 'hi' ? dish.hindiDescription : dish.description}
                      </p>
                    </div>

                    {/* Card Footer: Price & Action */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-stone-500 block leading-tight">Price</span>
                        <span className="text-xl font-bold font-serif text-stone-100">
                          ₹{dish.price}
                        </span>
                      </div>

                      {/* Add to Cart / Quantity Controller */}
                      {qty === 0 ? (
                        <button
                          onClick={() => onAddToCart(dish)}
                          className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-amber-300 hover:text-stone-950 font-semibold text-xs tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'ऑर्डर में जोड़ें' : 'Add to Order'}</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-stone-950 border border-amber-500/50 rounded-xl px-2 py-1">
                          <button
                            onClick={() => onRemoveFromCart(dish.id)}
                            className="w-6 h-6 rounded-lg bg-stone-900 text-stone-200 hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-amber-400 w-5 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onAddToCart(dish)}
                            className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Dish Details Modal */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Image */}
            <div className="relative h-64 bg-stone-950">
              <img
                src={selectedDishModal.image}
                alt={selectedDishModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
              
              <button
                onClick={() => setSelectedDishModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/80 text-stone-300 hover:text-white border border-stone-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded bg-stone-950/90 flex items-center justify-center border ${
                    selectedDishModal.isVeg ? 'border-emerald-500' : 'border-red-500'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      selectedDishModal.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                {renderSpicyMeter(selectedDishModal.spicyLevel)}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-100">
                  {selectedDishModal.name}
                </h3>
                <p className="text-sm text-amber-400 font-medium">
                  {selectedDishModal.hindiName}
                </p>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                {language === 'hi' ? selectedDishModal.hindiDescription : selectedDishModal.description}
              </p>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800 text-xs">
                <div>
                  <span className="text-stone-400 block">Portion Size:</span>
                  <span className="text-stone-200 font-medium">
                    {language === 'hi' ? selectedDishModal.portionHindi : selectedDishModal.portion}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">Estimated Calories:</span>
                  <span className="text-stone-200 font-medium">~{selectedDishModal.calories || 380} kcal</span>
                </div>
              </div>

              {/* Action buttons inside modal */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-stone-400 block">Total</span>
                  <span className="text-2xl font-bold font-serif text-amber-400">
                    ₹{selectedDishModal.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(selectedDishModal);
                      setSelectedDishModal(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
                  >
                    {language === 'hi' ? 'ऑर्डर में जोड़ें' : 'Add to WhatsApp Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
