export type Language = 'en' | 'hi';

export type DietaryType = 'all' | 'veg' | 'non-veg';

export interface Dish {
  id: string;
  name: string;
  hindiName: string;
  category: 'starters' | 'main-course' | 'biryani-breads' | 'desserts' | 'beverages' | 'chefs-special';
  description: string;
  hindiDescription: string;
  price: number;
  isVeg: boolean;
  spicyLevel: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Hot
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  image: string;
  portion: string;
  portionHindi: string;
  calories?: number;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'fine-dining' | 'rooftop' | 'couple-booth' | 'private-dining';
  occasion: 'general' | 'birthday' | 'anniversary' | 'romantic-date' | 'business' | 'family-gathering';
  specialRequests?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  hindiName?: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  hindiComment?: string;
  recommendedDish?: string;
  avatar: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'all' | 'ambience' | 'dishes' | 'kitchen' | 'private-dining';
  image: string;
  caption: string;
  hindiCaption: string;
}
