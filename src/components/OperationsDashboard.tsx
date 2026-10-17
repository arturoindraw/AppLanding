import React, { useState } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  FileCheck,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  ShieldCheck,
  QrCode,
  DollarSign,
  AlertCircle,
  ExternalLink,
  X
} from 'lucide-react';
import {
  INITIAL_OPERATIONS_BOOKINGS,
  SUPPLIERS_DATABASE,
  type BookingLead,
  type SupplierPartner
} from '../data/destinations';
import {
  formatCurrency,
  type Currency
} from '../utils/pricing';

interface OperationsDashboardProps {
  currency: Currency;
  exchangeRate: number;
  bookings: BookingLead[];
  onUpdateBookings: (bookings: BookingLead[]) => void;
}

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({
  currency,
  exchangeRate,
  bookings,
  onUpdateBookings,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'suppliers'>('bookings');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<BookingLead | null>(null);

  // New booking form state
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newAgency, setNewAgency] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRoute, setNewRoute] = useState<'Panamá + Colombia' | 'Panamá Exclusivo' | 'Colombia Exclusivo'>('Panamá + Colombia');
  const [newDates, setNewDates] = useState('10 Dic 2026 – 18 Dic 2026');
  const [newPax, setNewPax] = useState(2);
  const [newTotalUsd, setNewTotalUsd] = useState(3200);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchClient = b.clientName.toLowerCase().includes(q);
      const matchAgency = b.agencyName.toLowerCase().includes(q);
      const matchCode = b.voucherCode.toLowerCase().includes(q);
      if (!matchClient && !matchAgency && !matchCode) return false;
    }
    return true;
  });

  // Calculate high-level KPIs
  const totalVolumeUsd = bookings.reduce((sum, b) => sum + b.totalUsd, 0);
  const activePax = bookings.reduce((sum, b) => sum + b.paxAdults + b.paxChildren, 0);
  const inOperationCount = bookings.filter(b => b.status === 'En operación').length;

  const handleStatusChange = (bookingId: string, newStatus: BookingLead['status']) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    onUpdateBookings(updated);
    if (selectedBookingForModal && selectedBookingForModal.id === bookingId) {
      setSelectedBookingForModal({ ...selectedBookingForModal, status: newStatus });
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim()) return;

    const newBookingItem: BookingLead = {
      id: `BK-${Math.floor(9000 + Math.random() * 999)}`,
      voucherCode: `TERRA-2026-${newRoute.includes('Panamá') && newRoute.includes('Colombia') ? 'PTYCTG' : newRoute.includes('Panamá') ? 'PTY' : 'COL'}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: newClient,
      agencyName: newAgency || 'Agencia Externa',
      email: newEmail || 'cliente@agencia.com',
      phone: newPhone || '+1 800 000 0000',
      countryRoute: newRoute,
      travelDates: newDates,
      paxAdults: newPax,
      paxChildren: 0,
      hotelTier: 'superior',
      totalUsd: Number(newTotalUsd) || 3000,
      currency: 'USD',
      status: 'Confirmada',
      assignedGuide: 'Asignación automática DMC',
      notes: 'Registrado desde el panel operativo interno.'
    };

    onUpdateBookings([newBookingItem, ...bookings]);
    setShowNewBookingModal(false);
    setNewClient('');
    setNewAgency('');
    setNewEmail('');
    setNewPhone('');
  };

  return (
    <section id="operaciones" className="py-16 sm:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>DMC Operations &amp; Back-Office</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Panel de Gestión Operativa Interna
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Monitoreo en vivo de expedientes de viaje, asignación de transportes y guías locales, manifiestos de pasajeros y liquidación B2B.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewBookingModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Reserva DMC</span>
            </button>
          </div>
        </div>

        {/* Operational KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Volumen Total Gestionado
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {formatCurrency(totalVolumeUsd, currency, exchangeRate)}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              {bookings.length} expedientes registrados
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pasajeros en Tránsito
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {activePax} Pax
            </div>
            <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
              Panamá y Colombia
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                En Operación Terrestre
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {inOperationCount} Itinerarios
            </div>
            <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
              Guías y vans activas
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Proveedores Verificados
              </span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {SUPPLIERS_DATABASE.length} Partners
            </div>
            <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
              100% Licencias al día
            </span>
          </div>

        </div>

        {/* View Switcher: Bookings vs Suppliers */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Expedientes de Reserva ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('suppliers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'suppliers'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Red de Proveedores Locales ({SUPPLIERS_DATABASE.length})</span>
          </button>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search and status filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por cliente, agencia o código..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'Nueva cotización', 'Confirmada', 'En operación', 'Completada'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      statusFilter === status
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status === 'all' ? 'Todos' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[11px]">
                    <th className="py-3.5 px-4">Localizador</th>
                    <th className="py-3.5 px-4">Cliente / Agencia</th>
                    <th className="py-3.5 px-4">Ruta &amp; Fechas</th>
                    <th className="py-3.5 px-4">Pax</th>
                    <th className="py-3.5 px-4">Total</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => {
                    const priceFormatted = formatCurrency(b.totalUsd, currency, exchangeRate);
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {b.voucherCode}
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-slate-900 block font-semibold">{b.clientName}</strong>
                          <span className="text-[11px] text-slate-400">{b.agencyName}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800 block">{b.countryRoute}</span>
                          <span className="text-[11px] text-slate-400">{b.travelDates}</span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">
                          {b.paxAdults + b.paxChildren} pax
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                          {priceFormatted}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                            className={`px-2 py-1 rounded-md text-[11px] font-bold border focus:outline-hidden ${
                              b.status === 'Confirmada'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : b.status === 'En operación'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : b.status === 'Completada'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="Nueva cotización">Nueva cotización</option>
                            <option value="Confirmada">Confirmada</option>
                            <option value="En operación">En operación</option>
                            <option value="Completada">Completada</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedBookingForModal(b)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition cursor-pointer"
                          >
                            Ver Ficha
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Local Suppliers Directory */}
        {activeTab === 'suppliers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUPPLIERS_DATABASE.map((sup) => (
              <div key={sup.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    sup.country === 'panama' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {sup.country === 'panama' ? 'Panamá' : 'Colombia'}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    {sup.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {sup.name}
                  </h4>
                  <span className="text-xs text-slate-500">{sup.category}</span>
                </div>

                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Contacto: <strong>{sup.contactPerson}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sup.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">Lic: {sup.licensedNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Booking Manifest / Details */}
        {selectedBookingForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-800 shadow-2xl border border-slate-200 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Expediente Operativo
                  </span>
                  <h3 className="font-black text-lg text-slate-900">
                    {selectedBookingForModal.clientName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBookingForModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-semibold">Localizador</span>
                    <strong className="font-mono text-slate-900">{selectedBookingForModal.voucherCode}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Agencia Emisora</span>
                    <strong className="text-slate-900">{selectedBookingForModal.agencyName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Contacto Directo</span>
                    <strong className="text-slate-900">{selectedBookingForModal.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Email</span>
                    <strong className="text-slate-900">{selectedBookingForModal.email}</strong>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <span className="font-bold block mb-1">Guía Asignado &amp; Logística:</span>
                  <p>{selectedBookingForModal.assignedGuide}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">Notas Especiales / Restricciones Alimenticias:</span>
                  <p className="text-slate-600">{selectedBookingForModal.notes}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedBookingForModal(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: New Booking Form */}
        {showNewBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-slate-800 shadow-2xl border border-slate-200 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-black text-lg text-slate-900">
                  Crear Nuevo Expediente de Reserva
                </h3>
                <button onClick={() => setShowNewBookingModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateBooking} className="py-4 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre del Cliente Principal *</label>
                  <input
                    type="text"
                    required
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="Ej. Roberto Sánchez & Familia"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Agencia de Viajes Emisora</label>
                  <input
                    type="text"
                    value={newAgency}
                    onChange={(e) => setNewAgency(e.target.value)}
                    placeholder="Ej. Viajes El Corte Inglés / Directo"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Teléfono</label>
                    <input
                      type="text"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+507 ..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ruta Multidestino</label>
                  <select
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="Panamá + Colombia">Panamá + Colombia</option>
                    <option value="Panamá Exclusivo">Panamá Exclusivo</option>
                    <option value="Colombia Exclusivo">Colombia Exclusivo</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pasajeros (Pax)</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={newPax}
                      onChange={(e) => setNewPax(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Total Cotizado (USD)</label>
                    <input
                      type="number"
                      min="100"
                      value={newTotalUsd}
                      onChange={(e) => setNewTotalUsd(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl"
                  >
                    Guardar Reserva
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewBookingModal(false)}
                    className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
