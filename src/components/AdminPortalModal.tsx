import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Calendar, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  Filter,
  Users,
  UtensilsCrossed,
  ShieldCheck,
  Code
} from 'lucide-react';
import { 
  fetchAllReservations, 
  fetchAllOrders, 
  updateReservationStatus, 
  updateOrderStatus, 
  getBackendHealth,
  ApiReservation,
  ApiOrder,
  BackendHealth
} from '../services/api';
import { Language } from '../types/restaurant';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'orders' | 'supabase'>('reservations');
  const [reservations, setReservations] = useState<ApiReservation[]>([]);
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [sqlSchema, setSqlSchema] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [resList, ordList, healthInfo] = await Promise.all([
        fetchAllReservations(),
        fetchAllOrders(),
        getBackendHealth(),
      ]);
      setReservations(resList);
      setOrders(ordList);
      setHealth(healthInfo);

      // Also fetch SQL schema text
      fetch('/api/schema-sql')
        .then((r) => r.text())
        .then((txt) => setSqlSchema(txt))
        .catch(() => {});
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleUpdateResStatus = async (id: string, status: any) => {
    await updateReservationStatus(id, status);
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleUpdateOrdStatus = async (id: string, status: any) => {
    await updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const handleCopySql = () => {
    if (sqlSchema) {
      navigator.clipboard.writeText(sqlSchema);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-stone-950 flex items-center justify-center">
                <Database className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100">
                  Royal Zaika — Staff & Database Portal
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                  Live Backend
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Connected to Supabase Project: <code className="text-amber-400">cgbvckcngeikmatustsz</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-stone-950 border-b border-stone-800">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'reservations'
                ? 'border-amber-500 text-amber-400 bg-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Bookings ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-500 text-amber-400 bg-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Food Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'supabase'
                ? 'border-amber-500 text-amber-400 bg-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Setup & SQL</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Total Live Bookings: {reservations.length}</span>
                <span className="text-[11px] text-stone-500">
                  Syncs with Supabase Table: <code className="text-stone-400">reservations</code>
                </span>
              </div>

              {reservations.length === 0 ? (
                <div className="text-center py-16 px-4 bg-stone-950/60 rounded-2xl border border-stone-800">
                  <Calendar className="w-12 h-12 text-stone-600 mx-auto mb-2" />
                  <h4 className="text-stone-200 font-semibold text-sm">No reservations recorded yet</h4>
                  <p className="text-stone-400 text-xs mt-1">
                    Bookings submitted from the website will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/40 transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                            {res.id}
                          </span>
                          <h4 className="font-serif font-bold text-stone-100 text-base mt-1.5">
                            {res.name}
                          </h4>
                          <p className="text-xs text-stone-400">Phone: {res.phone}</p>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            res.status === 'confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : res.status === 'seated'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : res.status === 'cancelled'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          {res.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-stone-900 text-stone-300">
                        <div>
                          <span className="text-stone-500 block text-[10px]">Date & Slot:</span>
                          <span>{res.date} at {res.time_slot || res.timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px]">Guests:</span>
                          <span>{res.guests} Person(s)</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px]">Seating Area:</span>
                          <span className="capitalize">{res.seating_area || res.seatingArea || 'Fine Dining'}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px]">Occasion:</span>
                          <span className="capitalize">{res.occasion}</span>
                        </div>
                      </div>

                      {(res.special_requests || res.specialRequests) && (
                        <p className="text-[11px] text-amber-400/90 italic">
                          Note: "{res.special_requests || res.specialRequests}"
                        </p>
                      )}

                      {/* Status controller buttons */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => handleUpdateResStatus(res.id, 'confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-emerald-950 text-emerald-400 text-[11px] border border-stone-800 hover:border-emerald-500/40 cursor-pointer"
                        >
                          Confirmed
                        </button>
                        <button
                          onClick={() => handleUpdateResStatus(res.id, 'seated')}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-amber-950 text-amber-400 text-[11px] border border-stone-800 hover:border-amber-500/40 cursor-pointer"
                        >
                          Seated
                        </button>
                        <button
                          onClick={() => handleUpdateResStatus(res.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-blue-950 text-blue-400 text-[11px] border border-stone-800 hover:border-blue-500/40 cursor-pointer"
                        >
                          Completed
                        </button>
                        <button
                          onClick={() => handleUpdateResStatus(res.id, 'cancelled')}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-red-950 text-red-400 text-[11px] border border-stone-800 hover:border-red-500/40 cursor-pointer ml-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Total Food Orders: {orders.length}</span>
                <span className="text-[11px] text-stone-500">
                  Syncs with Supabase Table: <code className="text-stone-400">orders</code>
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 px-4 bg-stone-950/60 rounded-2xl border border-stone-800">
                  <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-2" />
                  <h4 className="text-stone-200 font-semibold text-sm">No orders received yet</h4>
                  <p className="text-stone-400 text-xs mt-1">
                    Orders submitted via the pre-order tray or WhatsApp will be logged here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-amber-400 font-bold">{ord.id}</span>
                          <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] border border-stone-800 capitalize">
                            {ord.order_type}
                          </span>
                          <span className="text-stone-400 text-xs">• {ord.guest_name}</span>
                        </div>

                        <p className="text-xs text-stone-300 mt-1">
                          Location: <span className="font-medium">{ord.table_or_address}</span>
                          {ord.special_note && ` • Note: ${ord.special_note}`}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {ord.items && ord.items.map((it: any, i: number) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                              {it.qty || 1}x {it.name || it.dish?.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-stone-500 block">Total</span>
                          <span className="font-serif font-bold text-base text-amber-400">
                            ₹{ord.grand_total || ord.subtotal || 0}
                          </span>
                        </div>

                        {/* Status switcher */}
                        <div className="flex items-center gap-1">
                          {(['pending', 'preparing', 'ready', 'delivered'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateOrdStatus(ord.id, st)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                                ord.status === st
                                  ? 'bg-amber-500 text-stone-950 shadow'
                                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SUPABASE CONFIG & SQL */}
          {activeTab === 'supabase' && (
            <div className="space-y-6">
              
              {/* Status Box */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-100 text-sm">
                        Backend & Supabase Configuration
                      </h4>
                      <p className="text-xs text-stone-400">
                        Express server is configured with your Supabase credentials
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Ready</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-900 p-4 rounded-xl border border-stone-800">
                  <div>
                    <span className="text-stone-500 block">Project ID:</span>
                    <span className="text-amber-400 font-mono font-bold">cgbvckcngeikmatustsz</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Supabase Endpoint URL:</span>
                    <span className="text-stone-200 font-mono">https://cgbvckcngeikmatustsz.supabase.co</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">API Key Type:</span>
                    <span className="text-stone-200 font-mono">Publishable / Anon Key (Configured)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Server Health:</span>
                    <span className="text-emerald-400 font-medium">Active on Port 3000</span>
                  </div>
                </div>
              </div>

              {/* SQL Migration Helper */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-stone-100 text-sm sm:text-base flex items-center gap-2">
                      <Code className="w-4 h-4 text-amber-400" />
                      <span>Supabase SQL Table Definitions</span>
                    </h4>
                    <p className="text-xs text-stone-400">
                      Copy and run this in your Supabase Dashboard &gt; <strong>SQL Editor</strong> to create tables with Row-Level Security:
                    </p>
                  </div>

                  <button
                    onClick={handleCopySql}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                  </button>
                </div>

                <div className="relative rounded-2xl bg-stone-950 border border-stone-800 p-4 font-mono text-[11px] text-stone-300 max-h-72 overflow-y-auto">
                  <pre>{sqlSchema || `-- Loading schema...`}</pre>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
