import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  Quote, 
  CheckCircle, 
  Sparkles, 
  ThumbsUp, 
  Plus, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Review, Language } from '../types/restaurant';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { submitReviewApi } from '../services/api';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('');

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const addedReview: Review = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      location: 'Verified Guest',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      recommendedDish: newDish.trim() || 'Dal Zaika & Biryani',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true,
    };

    setReviewsList([addedReview, ...reviewsList]);
    setIsWriteModalOpen(false);

    try {
      await submitReviewApi({
        name: newName.trim(),
        rating: newRating,
        comment: newComment.trim(),
        recommendedDish: newDish.trim() || undefined,
      });
    } catch (e) {
      console.warn('Review API submit', e);
    }

    setNewName('');
    setNewComment('');
    setNewDish('');
  };

  return (
    <section id="reviews" className="py-24 bg-[#0c0a09] relative overflow-hidden border-t border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'अतिथियों के अनुभव व समीक्षाएं' : 'Diner Testimonials'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
              {language === 'hi' ? 'स्वाद की सच्ची गवाही' : 'Loved by 150,000+ Foodies'}
            </h2>
          </div>

          {/* Google Ratings Pill & Write Review Button */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-3 shadow-lg">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-amber-400">
                  <span className="font-bold text-stone-100 text-base">{RESTAURANT_INFO.rating}</span>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-[11px] text-stone-400">
                  Google & TripAdvisor
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center">
                G
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-amber-300 hover:text-stone-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'hi' ? 'समीक्षा लिखें' : 'Write Review'}</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all duration-300 flex flex-col justify-between shadow-lg relative group"
            >
              <div>
                {/* Header row: Avatar, Name, Rating */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border border-amber-500/30"
                    />
                    <div>
                      <h4 className="text-stone-100 font-bold text-sm sm:text-base flex items-center gap-1.5">
                        <span>{language === 'hi' && review.hindiName ? review.hindiName : review.name}</span>
                        {review.verified && (
                          <span title="Verified Diner">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-stone-400">{review.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex text-amber-400 text-sm">
                      {'★'.repeat(review.rating)}
                    </div>
                    <span className="text-[10px] text-stone-500">{review.date}</span>
                  </div>
                </div>

                {/* Comment */}
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-stone-800 absolute -top-2 -left-1 opacity-50" />
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed relative z-10 pl-4">
                    "{language === 'hi' && review.hindiComment ? review.hindiComment : review.comment}"
                  </p>
                </div>
              </div>

              {/* Recommended Dish Tag */}
              {review.recommendedDish && (
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-stone-400 text-[11px]">Recommended:</span>
                  <span className="text-amber-400 font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    {review.recommendedDish}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-stone-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-stone-100">
                {language === 'hi' ? 'अपना अनुभव साझा करें' : 'Share Your Dining Experience'}
              </h3>
              <p className="text-stone-400 text-xs mt-1">
                {language === 'hi' ? 'आपकी राय हमारे लिए अत्यंत मूल्यवान है।' : 'Help other food lovers discover our royal delicacies.'}
              </p>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              {/* Star Rating selector */}
              <div className="text-center">
                <label className="text-xs text-stone-400 block mb-1">Your Rating</label>
                <div className="flex justify-center gap-1.5 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`cursor-pointer transition-transform hover:scale-110 ${
                        star <= newRating ? 'text-amber-400' : 'text-stone-700'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Manisha Verma"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-stone-100 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Favorite Dish Tried</label>
                <input
                  type="text"
                  value={newDish}
                  onChange={(e) => setNewDish(e.target.value)}
                  placeholder="e.g. Awadhi Galouti Kebab, Shahi Tukda"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-stone-100 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the flavors, ambience, and hospitality..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3 py-2 text-stone-100 text-xs focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/25 cursor-pointer hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
