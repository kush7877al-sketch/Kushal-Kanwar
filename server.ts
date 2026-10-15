import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Supabase Configuration from Environment or User Provided Keys
const supabaseUrl = process.env.SUPABASE_URL || 'https://cgbvckcngeikmatustsz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_lW1uDtpZo7adElRyqn2cWw_L8qEU6Aj';

export const supabase = createClient(supabaseUrl, supabaseKey);

// In-Memory Fallback Cache (Ensures 100% continuous uptime even if tables are not yet created in Supabase SQL editor)
const localCache = {
  reservations: [] as any[],
  orders: [] as any[],
  reviews: [] as any[],
  newsletter: [] as any[],
};

// ==========================================
// API ROUTES
// ==========================================

// 1. Backend Status & Supabase Connection Check
app.get('/api/health', async (_req, res) => {
  let supabaseConnected = false;
  let supabaseMessage = 'Configured with project cgbvckcngeikmatustsz';

  try {
    // Quick probe to test connection
    const { error } = await supabase.from('reservations').select('id').limit(1);
    if (!error) {
      supabaseConnected = true;
      supabaseMessage = 'Connected to Supabase database';
    } else {
      supabaseMessage = `Supabase reachable: ${error.message}`;
    }
  } catch (err: any) {
    supabaseMessage = err.message || 'Error reaching Supabase';
  }

  res.json({
    status: 'ok',
    project: 'cgbvckcngeikmatustsz',
    supabaseUrl,
    supabaseConnected,
    supabaseMessage,
    serverTime: new Date().toISOString(),
    stats: {
      cachedReservations: localCache.reservations.length,
      cachedOrders: localCache.orders.length,
      cachedReviews: localCache.reviews.length,
    },
  });
});

// 2. Table Reservations
app.post('/api/reservations', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      date,
      timeSlot,
      guests,
      seatingArea,
      occasion,
      specialRequests,
    } = req.body;

    if (!name || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: 'Name, phone, date, and time slot are required.' });
    }

    const bookingId = `RZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation = {
      id: bookingId,
      name,
      phone,
      email: email || null,
      date,
      time_slot: timeSlot,
      guests: Number(guests) || 2,
      seating_area: seatingArea || 'fine-dining',
      occasion: occasion || 'general',
      special_requests: specialRequests || null,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    // Store in local cache first for guaranteed responsiveness
    localCache.reservations.unshift(newReservation);

    // Persist to Supabase
    let supabasePersisted = false;
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([newReservation])
        .select();

      if (!error && data) {
        supabasePersisted = true;
      } else if (error) {
        console.warn('Supabase reservation table notice:', error.message);
      }
    } catch (e: any) {
      console.warn('Supabase insert warning:', e.message);
    }

    res.status(201).json({
      success: true,
      reservation: newReservation,
      supabasePersisted,
      message: 'Reservation recorded successfully',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to save reservation' });
  }
});

app.get('/api/reservations', async (_req, res) => {
  try {
    // Attempt to fetch from Supabase
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Merge unique
      const ids = new Set(data.map((r: any) => r.id));
      const merged = [
        ...data,
        ...localCache.reservations.filter((r) => !ids.has(r.id)),
      ];
      return res.json(merged);
    }

    res.json(localCache.reservations);
  } catch (_e) {
    res.json(localCache.reservations);
  }
});

app.patch('/api/reservations/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update in local cache
  const found = localCache.reservations.find((r) => r.id === id);
  if (found) {
    found.status = status;
  }

  // Update in Supabase
  try {
    await supabase.from('reservations').update({ status }).eq('id', id);
  } catch (e) {
    console.warn('Supabase update status warning', e);
  }

  res.json({ success: true, id, status });
});

// 3. Food Orders
app.post('/api/orders', async (req, res) => {
  try {
    const {
      orderType,
      guestName,
      contact,
      tableOrAddress,
      specialNote,
      items,
      subtotal,
      gst,
      grandTotal,
    } = req.body;

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      order_type: orderType || 'dine-in',
      guest_name: guestName || 'Valued Guest',
      contact: contact || null,
      table_or_address: tableOrAddress || 'At Restaurant',
      special_note: specialNote || null,
      items: items || [],
      subtotal: Number(subtotal) || 0,
      gst: Number(gst) || 0,
      grand_total: Number(grandTotal) || 0,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    localCache.orders.unshift(newOrder);

    let supabasePersisted = false;
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select();

      if (!error && data) {
        supabasePersisted = true;
      }
    } catch (e: any) {
      console.warn('Supabase order insert warning:', e.message);
    }

    res.status(201).json({
      success: true,
      order: newOrder,
      supabasePersisted,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to record order' });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const ids = new Set(data.map((o: any) => o.id));
      const merged = [
        ...data,
        ...localCache.orders.filter((o) => !ids.has(o.id)),
      ];
      return res.json(merged);
    }

    res.json(localCache.orders);
  } catch (_e) {
    res.json(localCache.orders);
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const found = localCache.orders.find((o) => o.id === id);
  if (found) {
    found.status = status;
  }

  try {
    await supabase.from('orders').update({ status }).eq('id', id);
  } catch (e) {
    console.warn('Supabase order status update warning', e);
  }

  res.json({ success: true, id, status });
});

// 4. Customer Reviews
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, comment, recommendedDish } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required.' });
    }

    const reviewId = `rev-${Date.now()}`;
    const newReview = {
      id: reviewId,
      name,
      location: 'Verified Guest',
      rating: Number(rating) || 5,
      comment,
      recommended_dish: recommendedDish || null,
      created_at: new Date().toISOString(),
    };

    localCache.reviews.unshift(newReview);

    try {
      await supabase.from('reviews').insert([newReview]);
    } catch (e: any) {
      console.warn('Supabase review insert warning:', e.message);
    }

    res.status(201).json({ success: true, review: newReview });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to submit review' });
  }
});

app.get('/api/reviews', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return res.json(data);
    }
    res.json(localCache.reviews);
  } catch (_e) {
    res.json(localCache.reviews);
  }
});

// 5. VIP Newsletter
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    localCache.newsletter.push({ email, created_at: new Date().toISOString() });

    try {
      await supabase.from('newsletter_subscribers').insert([{ email }]);
    } catch (e: any) {
      console.warn('Supabase newsletter insert notice:', e.message);
    }

    res.json({ success: true, promoCode: 'ROYAL10' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Supabase SQL Schema helper (provides SQL schema code to run in Supabase dashboard)
app.get('/api/schema-sql', (_req, res) => {
  const sql = `
-- ============================================================
-- ROYAL ZAIKA - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (cgbvckcngeikmatustsz)
-- ============================================================

-- 1. Table Reservations
CREATE TABLE IF NOT EXISTS public.reservations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    guests INTEGER DEFAULT 2,
    seating_area TEXT DEFAULT 'fine-dining',
    occasion TEXT DEFAULT 'general',
    special_requests TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Food Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_type TEXT DEFAULT 'dine-in',
    guest_name TEXT NOT NULL,
    contact TEXT,
    table_or_address TEXT,
    special_note TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    subtotal NUMERIC DEFAULT 0,
    gst NUMERIC DEFAULT 0,
    grand_total NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Diner Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT DEFAULT 'Verified Guest',
    rating INTEGER DEFAULT 5,
    comment TEXT NOT NULL,
    recommended_dish TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) policies allowing public anonymous insert & read
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to reservations" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to reservations" ON public.reservations FOR SELECT USING (true);
CREATE POLICY "Allow public update to reservations" ON public.reservations FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public update to orders" ON public.orders FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to reviews" ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Allow public insert to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to newsletter" ON public.newsletter_subscribers FOR SELECT USING (true);
`;
  res.type('text/plain').send(sql);
});

// ==========================================
// STATIC ASSETS & VITE MIDDLEWARE
// ==========================================

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Royal Zaika Backend Server running on port ${PORT}`);
    console.log(`🔗 Supabase Project: ${supabaseUrl}`);
  });
}

startServer();
