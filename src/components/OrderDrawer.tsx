import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  UtensilsCrossed, 
  Bike,
  Sparkles
} from 'lucide-react';
import { Dish, Language } from '../types/restaurant';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';
import { submitOrder } from '../services/api';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cart: { [dishId: string]: number };
  onAddToCart: (dish: Dish) => void;
  onRemoveFromCart: (dishId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  language,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [guestName, setGuestName] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  if (!isOpen) return null;

  // Calculate items and total
  const cartEntries = Object.entries(cart).filter(([_, qty]) => qty > 0);
  const itemsWithDishes = cartEntries.map(([dishId, qty]) => {
    const dish = MENU_ITEMS.find((d) => d.id === dishId)!;
    return { dish, qty, subtotal: (dish ? dish.price : 0) * qty };
  }).filter((item) => item.dish !== undefined);

  const subtotal = itemsWithDishes.reduce((acc, curr) => acc + curr.subtotal, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;

  // Build WhatsApp message and save order to backend
  const handleSendToWhatsApp = async () => {
    if (itemsWithDishes.length === 0) return;

    // Persist to backend and Supabase
    try {
      submitOrder({
        orderType,
        guestName: guestName.trim() || 'Valued Guest',
        tableOrAddress: tableOrAddress.trim() || 'At Restaurant',
        specialNote: specialNote.trim() || undefined,
        items: itemsWithDishes.map((it) => ({
          id: it.dish.id,
          name: it.dish.name,
          price: it.dish.price,
          qty: it.qty,
          isVeg: it.dish.isVeg,
        })),
        subtotal,
        gst,
        grandTotal,
      });
    } catch (e) {
      console.warn('Backend order sync', e);
    }

    let orderList = itemsWithDishes
      .map((item, idx) => `${idx + 1}. ${item.dish.name} (${item.dish.isVeg ? 'Veg' : 'Non-Veg'}) x ${item.qty} = ₹${item.subtotal}`)
      .join('\n');

    const message = `*👑 New Food Order - Royal Zaika*
--------------------------------
*Order Type:* ${orderType === 'dine-in' ? '🍽️ Dine-In Pre-Order' : '🛵 Takeaway / Delivery'}
*Customer Name:* ${guestName.trim() || 'Valued Guest'}
*${orderType === 'dine-in' ? 'Table / Seating' : 'Delivery Address'}:* ${tableOrAddress.trim() || 'At Restaurant'}
${specialNote.trim() ? `*Chef Note:* ${specialNote.trim()}\n` : ''}--------------------------------
*ORDER ITEMS:*
${orderList}
--------------------------------
*Subtotal:* ₹${subtotal}
*GST (5%):* ₹${gst}
*Grand Total:* ₹${grandTotal}
--------------------------------
Please confirm preparation time. Thank you!`;

    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-amber-900/40 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-100">
                  {language === 'hi' ? 'आपका प्री-ऑर्डर' : 'Your Order Tray'}
                </h3>
                <p className="text-xs text-amber-500">
                  {itemsWithDishes.length} {language === 'hi' ? 'व्यंजन शामिल हैं' : 'dish types selected'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-200 hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Dining Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800">
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  orderType === 'dine-in'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'डाइन-इन प्री-ऑर्डर' : 'Dine-In Order'}</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'टेकअवे / पार्सल' : 'Takeaway / Parcel'}</span>
              </button>
            </div>

            {/* Empty State */}
            {itemsWithDishes.length === 0 ? (
              <div className="text-center py-16 px-4">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                <h4 className="text-stone-200 font-medium text-base mb-1">
                  {language === 'hi' ? 'आपकी ट्रे खाली है' : 'Your order tray is empty'}
                </h4>
                <p className="text-stone-400 text-xs mb-6">
                  {language === 'hi'
                    ? 'मेनू से अपने पसंदीदा लजीज व्यंजनों को जोड़ें।'
                    : 'Explore our interactive menu and tap "Add to Order" on your favorite dishes.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  {language === 'hi' ? 'मेनू देखें' : 'Browse Menu Dishes'}
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-800">
                    <span>Selected Delicacies</span>
                    <button
                      onClick={onClearCart}
                      className="text-stone-500 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {itemsWithDishes.map(({ dish, qty, subtotal: itemTotal }) => (
                    <div
                      key={dish.id}
                      className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                              }`}
                            />
                            <h5 className="text-xs font-semibold text-stone-100">
                              {dish.name}
                            </h5>
                          </div>
                          <p className="text-[11px] text-stone-400">
                            ₹{dish.price} × {qty}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                          <button
                            onClick={() => onRemoveFromCart(dish.id)}
                            className="w-5 h-5 rounded flex items-center justify-center text-stone-300 hover:bg-stone-800 text-xs cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-amber-400 w-4 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onAddToCart(dish)}
                            className="w-5 h-5 rounded flex items-center justify-center text-stone-300 hover:bg-stone-800 text-xs cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-stone-100 w-12 text-right">
                          ₹{itemTotal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 text-xs">
                  <h5 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
                    Guest Details
                  </h5>

                  <div>
                    <label className="text-stone-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Ananya Roy"
                      className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-stone-100 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 block mb-1">
                      {orderType === 'dine-in' ? 'Table Number (if seated)' : 'Delivery Address / Pickup Time'}
                    </label>
                    <input
                      type="text"
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      placeholder={orderType === 'dine-in' ? 'Table 4 / Rooftop (or Pre-Order)' : 'e.g. Flat 302, Royal Apartments'}
                      className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-stone-100 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 block mb-1">Kitchen Instruction</label>
                    <input
                      type="text"
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      placeholder="e.g. Extra mint dip, mild spice for kids"
                      className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-lg px-3 py-2 text-stone-100 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Restaurant GST (5%):</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-stone-100 font-bold text-sm pt-2 border-t border-stone-800">
                    <span>Grand Total:</span>
                    <span className="text-amber-400 font-serif text-base">₹{grandTotal}</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Action */}
          {itemsWithDishes.length > 0 && (
            <div className="p-6 bg-stone-950 border-t border-stone-800 space-y-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Order via WhatsApp (₹{grandTotal})</span>
              </button>
              <p className="text-[11px] text-center text-stone-500">
                Direct instant dispatch to Royal Zaika order management.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
