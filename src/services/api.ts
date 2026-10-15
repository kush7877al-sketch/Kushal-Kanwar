export interface ApiReservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time_slot?: string;
  timeSlot?: string;
  guests: number;
  seating_area?: string;
  seatingArea?: string;
  occasion: string;
  special_requests?: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ApiOrder {
  id: string;
  order_type: 'dine-in' | 'takeaway';
  guest_name: string;
  contact?: string;
  table_or_address: string;
  special_note?: string;
  items: {
    id: string;
    name: string;
    price: number;
    qty: number;
    isVeg: boolean;
  }[];
  subtotal: number;
  gst: number;
  grand_total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface BackendHealth {
  status: string;
  project: string;
  supabaseUrl: string;
  supabaseConnected: boolean;
  supabaseMessage: string;
  stats: {
    cachedReservations: number;
    cachedOrders: number;
    cachedReviews: number;
  };
}

// 1. Check Backend & Supabase Status
export async function getBackendHealth(): Promise<BackendHealth | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch backend health', err);
    return null;
  }
}

// 2. Table Reservations
export async function submitReservation(data: {
  name: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: string;
  occasion: string;
  specialRequests?: string;
}) {
  try {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('Reservation API error', err);
    return { success: false, error: 'Network error' };
  }
}

export async function fetchAllReservations(): Promise<ApiReservation[]> {
  try {
    const res = await fetch('/api/reservations');
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Fetch reservations error', err);
    return [];
  }
}

export async function updateReservationStatus(id: string, status: string) {
  try {
    const res = await fetch(`/api/reservations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.error('Update reservation status error', err);
    return { success: false };
  }
}

// 3. Orders
export async function submitOrder(data: {
  orderType: string;
  guestName: string;
  contact?: string;
  tableOrAddress: string;
  specialNote?: string;
  items: any[];
  subtotal: number;
  gst: number;
  grandTotal: number;
}) {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('Order API error', err);
    return { success: false };
  }
}

export async function fetchAllOrders(): Promise<ApiOrder[]> {
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Fetch orders error', err);
    return [];
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.error('Update order status error', err);
    return { success: false };
  }
}

// 4. Reviews
export async function submitReviewApi(data: {
  name: string;
  rating: number;
  comment: string;
  recommendedDish?: string;
}) {
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('Review submit API error', err);
    return { success: false };
  }
}

// 5. VIP Newsletter
export async function subscribeNewsletterApi(email: string) {
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (err) {
    console.error('Newsletter API error', err);
    return { success: false };
  }
}
