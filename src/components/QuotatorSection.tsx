import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calculator,
  DollarSign,
  Users,
  Building,
  Plane,
  ShieldCheck,
  CheckCircle,
  Download,
  Share2,
  Printer,
  Sparkles,
  Briefcase,
  AlertCircle,
  QrCode,
  ArrowRight,
  Info,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import {
  formatCurrency,
  calculateQuote,
  type Currency,
  type HotelTier,
  type PricingOptions,
  type SelectedActivity,
  DEFAULT_COP_EXCHANGE_RATE,
  HOTEL_RATES_PER_ROOM_USD
} from '../utils/pricing';
import type { DayPlan, Experience } from '../data/destinations';

interface QuotatorSectionProps {
  days: DayPlan[];
  selectedExperiences: Experience[];
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  exchangeRate: number;
  onExchangeRateChange: (rate: number) => void;
  b2bMode: boolean;
  onToggleB2bMode: () => void;
  onBookingConfirmed: (bookingData: any) => void;
}

export const QuotatorSection: React.FC<QuotatorSectionProps> = ({
  days,
  selectedExperiences,
  currency,
  onCurrencyChange,
  exchangeRate,
  onExchangeRateChange,
  b2bMode,
  onToggleB2bMode,
  onBookingConfirmed,
}) => {
  // Quotation parameters
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [hotelTier, setHotelTier] = useState<HotelTier>('superior');
  const [includeFlight, setIncludeFlight] = useState<boolean>(true);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [includeTransfers, setIncludeTransfers] = useState<boolean>(true);
  const [isForeignTourist, setIsForeignTourist] = useState<boolean>(true);
  const [agencyCommissionPercent, setAgencyCommissionPercent] = useState<number>(15);
  const [leadClientName, setLeadClientName] = useState<string>('Carlos Alberto Mendoza');
  const [leadEmail, setLeadEmail] = useState<string>('carlos.mendoza@turismointernacional.com');
  const [leadAgency, setLeadAgency] = useState<string>('Agencia Mayorista Aliada');
  const [showVoucherModal, setShowVoucherModal] = useState<boolean>(false);
  const [generatedVoucher, setGeneratedVoucher] = useState<any>(null);

  // Derived nights
  const nightsPanama = days.filter(d => d.country === 'panama').length;
  const nightsColombia = days.filter(d => d.country === 'colombia').length;

  const activities: SelectedActivity[] = selectedExperiences.map(exp => ({
    id: exp.id,
    priceUsd: exp.priceUsd,
    country: exp.country,
    perPerson: true
  }));

  const pricingOptions: PricingOptions = {
    adults,
    children,
    hotelTier,
    nightsPanama,
    nightsColombia,
    includeInterCountryFlight: includeFlight,
    includeTravelInsurance: includeInsurance,
    includePrivateTransfers: includeTransfers,
    agencyCommissionPercent: b2bMode ? agencyCommissionPercent : 0,
    isForeignTourist,
    customExchangeRate: exchangeRate,
  };

  const quote = calculateQuote(pricingOptions, activities, currency);

  // Trigger booking & confetti
  const handleConfirmReservation = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const code = `TERRA-${Math.floor(1000 + Math.random() * 9000)}-${currency}`;
    const voucherData = {
      code,
      clientName: leadClientName,
      agencyName: b2bMode ? leadAgency : 'Reserva Directa',
      email: leadEmail,
      dates: `${days.length} Días (${nightsPanama}N Panamá + ${nightsColombia}N Colombia)`,
      pax: `${adults} Adultos${children > 0 ? `, ${children} Niños` : ''}`,
      hotelTier: hotelTier === 'luxury' ? '5* Luxury Gran Lujo' : hotelTier === 'superior' ? '4* Superior Boutique' : '3-4* Standard Confort',
      totalFormatted: quote.grandTotalFormatted,
      perPersonFormatted: quote.perPersonFormatted,
      currency,
      createdDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setGeneratedVoucher(voucherData);
    setShowVoucherModal(true);
    onBookingConfirmed(voucherData);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*COTIZACIÓN TERRAISTMO DMC: PANAMÁ & COLOMBIA*\n` +
      `Itinerario: ${days.length} Días (${nightsPanama} noches Panamá / ${nightsColombia} noches Colombia)\n` +
      `Viajeros: ${adults} adultos${children > 0 ? ` y ${children} niños` : ''}\n` +
      `Categoría Hotel: ${hotelTier.toUpperCase()}\n` +
      `Experiencias incluidas: ${selectedExperiences.length} tours\n` +
      `Total Cotizado: ${quote.grandTotalFormatted} (${quote.perPersonFormatted} por persona)\n` +
      `Validez: 15 días calendario.\n` +
      `Gestionado con TerraIstmo DMC Receptivo Oficial.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="cotizador" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Motor Financiero Multidivisa</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Cotizador Dinámico en Tiempo Real (USD / COP)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Cálculo matemático exacto sincronizado con tu itinerario de {days.length} días. Aplica exenciones fiscales para extranjeros y márgenes de agencia B2B.
            </p>
          </div>

          {/* Currency and Exchange Rate controller */}
          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('COP')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  currency === 'COP'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                COP ($)
              </button>
            </div>

            <div className="text-xs text-slate-300 flex items-center gap-1.5 pl-2 border-l border-slate-700">
              <span className="text-slate-400">1 USD =</span>
              <input
                type="number"
                min="3500"
                max="5000"
                step="50"
                value={exchangeRate}
                onChange={(e) => onExchangeRateChange(Number(e.target.value) || DEFAULT_COP_EXCHANGE_RATE)}
                className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
              />
              <span className="font-semibold text-slate-400">COP</span>
            </div>
          </div>
        </div>

        {/* B2B Mode Agency Banner */}
        <div className="mb-8 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-transparent p-4 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300">
                Canal Profesional para Agencias de Viajes &amp; Tour Operadores
              </h4>
              <p className="text-xs text-slate-300">
                {b2bMode
                  ? 'Modo B2B activo: tarifas netas de operador y desglose de comisión configurado.'
                  : '¿Eres una agencia de viajes? Activa las tarifas comisionables para revender con tu margen.'}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleB2bMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
              b2bMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400 shadow-md'
                : 'bg-slate-800 text-amber-400 border-amber-500/50 hover:bg-slate-700'
            }`}
          >
            {b2bMode ? 'Desactivar Modo B2B' : 'Activar Modo Agencia B2B'}
          </button>
        </div>

        {/* 2-Column Layout: Controls & Live Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Passenger Count */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Composición de Viajeros</span>
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Adultos</span>
                      <span className="text-[11px] text-slate-400">Mayores de 12 años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-bold text-sm text-emerald-400">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Niños</span>
                      <span className="text-[11px] text-slate-400">Hasta 11 años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-bold text-sm text-emerald-400">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <span>Habitaciones requeridas (base doble):</span>
                <strong className="text-emerald-400 font-bold">{quote.roomsCount} habitación{quote.roomsCount > 1 ? 'es' : ''}</strong>
              </div>
            </div>

            {/* Hotel Tier Selection */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Categoría de Alojamiento</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setHotelTier('standard')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    hotelTier === 'standard'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold text-xs block text-white">Standard 3-4*</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Boutique céntrico</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Desde $95 USD/noche</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHotelTier('superior')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    hotelTier === 'superior'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold text-xs block text-white">Superior 4* Sup</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Colonial &amp; Caribe</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Desde $180 USD/noche</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHotelTier('luxury')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    hotelTier === 'luxury'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold text-xs block text-white">Luxury DMC 5*</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Sofitel / Waldorf</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Desde $360 USD/noche</span>
                </button>
              </div>
            </div>

            {/* Inclusions / Operational toggles */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 text-xs">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Componentes Logísticos &amp; Operativos
              </h4>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                <div className="flex items-center gap-2.5">
                  <Plane className="w-4 h-4 text-emerald-400" />
                  <div>
                    <strong className="text-white block font-semibold">Puente Aéreo Internacional PTY ✈ CTG/MDE</strong>
                    <span className="text-slate-400 text-[11px]">$195 USD / persona con equipaje facturado</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeFlight}
                  onChange={(e) => setIncludeFlight(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <div>
                    <strong className="text-white block font-semibold">Traslados Ejecutivos Aeropuerto-Hotel Privados</strong>
                    <span className="text-slate-400 text-[11px]">Van ejecutiva con conductor bilingüe y bienvenida VIP</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeTransfers}
                  onChange={(e) => setIncludeTransfers(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  <div>
                    <strong className="text-white block font-semibold">Seguro de Asistencia al Viajero Internacional</strong>
                    <span className="text-slate-400 text-[11px]">Cobertura médica integral ($50k USD) y pérdida de equipaje</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </label>

              {/* Foreign tourist VAT toggle */}
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="foreignTourist"
                  checked={isForeignTourist}
                  onChange={(e) => setIsForeignTourist(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded mt-0.5"
                />
                <label htmlFor="foreignTourist" className="cursor-pointer text-[11px] text-emerald-200 leading-snug">
                  <strong>Turista Extranjero No Residente:</strong> Aplica 0% IVA en servicios hoteleros y turísticos en Colombia (Decreto 297/2016). Si se desmarca, se aplica el 19% IVA estándar colombiano.
                </label>
              </div>

              {/* B2B Agency Margin Slider if active */}
              {b2bMode && (
                <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">Margen de Comisión Agencia B2B:</span>
                    <strong className="text-amber-400 text-sm font-black">{agencyCommissionPercent}%</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={agencyCommissionPercent}
                    onChange={(e) => setAgencyCommissionPercent(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>5% (Mínimo)</span>
                    <span>15% (Recomendado)</span>
                    <span>25% (VIP Mayorista)</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Printable / Final Itemized Financial Summary */}
          <div className="lg:col-span-6 bg-slate-800 rounded-3xl border border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-2xl printable-quote">
            
            <div className="border-b border-slate-700 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400 block">
                  Propuesta Formal DMC
                </span>
                <h3 className="text-xl font-black text-white font-display">
                  Resumen Económico &amp; Fiscal
                </h3>
              </div>
              <span className="text-xs bg-slate-900 px-3 py-1 rounded-full text-slate-300 border border-slate-700 font-mono">
                {days.length} Días / {days.length - 1} Noches
              </span>
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-3 text-xs sm:text-sm">
              
              <div className="flex justify-between text-slate-300">
                <span>Alojamiento ({nightsPanama}N Panamá + {nightsColombia}N Colombia, {quote.roomsCount} hab):</span>
                <strong className="text-white font-mono">
                  {quote.accommodationFormatted}
                </strong>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Excursiones y Tours ({selectedExperiences.length} actividades para {quote.paxTotal} pax):</span>
                <strong className="text-white font-mono">
                  {quote.activitiesFormatted}
                </strong>
              </div>

              {includeFlight && (
                <div className="flex justify-between text-slate-300">
                  <span>Vuelo Interoceánico PTY ✈ Colombia ({quote.paxTotal} pax):</span>
                  <strong className="text-white font-mono">
                    {quote.flightsFormatted}
                  </strong>
                </div>
              )}

              {includeTransfers && (
                <div className="flex justify-between text-slate-300">
                  <span>Traslados ejecutivos en destino (VIP):</span>
                  <strong className="text-white font-mono">
                    {quote.transfersFormatted}
                  </strong>
                </div>
              )}

              {includeInsurance && (
                <div className="flex justify-between text-slate-300">
                  <span>Asistencia médica integral internacional:</span>
                  <strong className="text-white font-mono">
                    {quote.insuranceFormatted}
                  </strong>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Gestión Logística &amp; Operación Receptiva DMC (4.5%):</span>
                <strong className="text-white font-mono">
                  {quote.dmcOperationsFeeFormatted}
                </strong>
              </div>

              {/* Subtotal */}
              <div className="pt-2 border-t border-slate-700/80 flex justify-between text-slate-400 font-semibold text-xs">
                <span>Subtotal Neto Servicios de Tierra:</span>
                <span className="font-mono">{quote.subtotalFormatted}</span>
              </div>

              {/* Taxes */}
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Impuesto ITBMS Panamá (7%):</span>
                <span className="font-mono">{quote.panamaTaxesFormatted}</span>
              </div>

              <div className="flex justify-between text-slate-400 text-xs">
                <span>Impuesto IVA Colombia (19%):</span>
                <span className="font-mono text-emerald-400">
                  {isForeignTourist ? '$0 (Exención Turista Extranjero)' : quote.colombiaTaxesFormatted}
                </span>
              </div>

              {/* Agency commission if B2B */}
              {b2bMode && (
                <div className="pt-2 border-t border-dashed border-amber-500/40 flex justify-between text-amber-300 text-xs font-bold">
                  <span>Comisión Ganancia Agencia ({agencyCommissionPercent}%):</span>
                  <span className="font-mono">+{quote.agencyCommissionFormatted}</span>
                </div>
              )}

              {/* Grand Total */}
              <div className="pt-4 border-t-2 border-emerald-500/50 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {b2bMode ? 'Tarifa PVP Final al Cliente' : 'Inversión Total del Itinerario'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight font-display">
                    {quote.grandTotalFormatted}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Por persona ({quote.paxTotal} pax)</span>
                  <span className="text-sm sm:text-base font-bold text-white font-mono">
                    {quote.perPersonFormatted}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Actions (Print, WhatsApp, Reserve) */}
            <div className="pt-4 border-t border-slate-700/80 space-y-3 no-print">
              
              <button
                onClick={handleConfirmReservation}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-4 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Generar Vóucher y Confirmar Reserva</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handlePrint}
                  className="bg-slate-900 hover:bg-slate-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-300" />
                  <span>Imprimir / PDF</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-emerald-600/50 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-emerald-300" />
                  <span>Compartir WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Modal: Official Booking Voucher Card */}
        {showVoucherModal && generatedVoucher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto no-print">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black">
                    TI
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                      Vóucher Oficial de Reserva DMC
                    </h3>
                    <span className="text-[11px] text-emerald-700 font-bold tracking-wider">
                      TERRAISTMO MULTIDESTINO
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowVoucherModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Voucher Content */}
              <div className="py-6 space-y-4">
                
                {/* Code banner */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Código Localizador</span>
                    <strong className="text-base sm:text-lg font-mono font-black text-slate-900">
                      {generatedVoucher.code}
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <QrCode className="w-10 h-10 text-slate-800" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block font-semibold">Titular Principal</span>
                    <strong className="text-slate-900">{generatedVoucher.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Agencia Emisora</span>
                    <strong className="text-slate-900">{generatedVoucher.agencyName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Duración y Países</span>
                    <strong className="text-slate-900">{generatedVoucher.dates}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Pasajeros</span>
                    <strong className="text-slate-900">{generatedVoucher.pax}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Categoría</span>
                    <strong className="text-slate-900">{generatedVoucher.hotelTier}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Fecha de Emisión</span>
                    <strong className="text-slate-900">{generatedVoucher.createdDate}</strong>
                  </div>
                </div>

                {/* Total confirmed */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase block">Inversión Confirmada</span>
                    <strong className="text-xl font-black text-emerald-900 font-display">
                      {generatedVoucher.totalFormatted}
                    </strong>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold">
                    {generatedVoucher.perPersonFormatted} / pax
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  Presenta este documento a la llegada a Tocumen (PTY) o Rafael Núñez (CTG). Asistencia 24h vía Concierge TerraIstmo DMC.
                </p>

              </div>

              {/* Footer */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    setShowVoucherModal(false);
                    window.print();
                  }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Vóucher</span>
                </button>
                <button
                  onClick={() => setShowVoucherModal(false)}
                  className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition"
                >
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
