import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Plane,
  Calendar,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  Shield,
  Coffee,
  Sun
} from 'lucide-react';
import {
  MULTIDESTINO_PACKAGES,
  type MultiPackage
} from '../data/destinations';
import {
  formatCurrency,
  type Currency
} from '../utils/pricing';

interface PackagesSectionProps {
  currency: Currency;
  exchangeRate: number;
  onSelectPackage: (pkg: MultiPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  currency,
  exchangeRate,
  onSelectPackage,
}) => {
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>('pkg-01');

  return (
    <section id="paquetes" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-300/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Itinerarios Maestros Recomendados</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Circuitos Combinados Panamá + Colombia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Programas integrales llave en mano con logística aérea resuelta, hotelería boutique verificada e inmersión cultural profunda. Listos para operar o personalizar en el constructor.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="space-y-8">
          {MULTIDESTINO_PACKAGES.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;
            const priceFormatted = formatCurrency(pkg.basePriceUsd, currency, exchangeRate);

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Package Main Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                  
                  {/* Photo with badges */}
                  <div className="lg:col-span-4 relative h-64 lg:h-full min-h-[220px] rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
                        {pkg.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{pkg.totalDays} Días / {pkg.totalDays - 1} Noches</span>
                    </div>
                  </div>

                  {/* Information & Highlights */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                        <span>Panamá ({pkg.nightsPanama} noches)</span>
                        <span>•</span>
                        <span>Colombia ({pkg.nightsColombia} noches)</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Highlights bullet list */}
                    <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      {pkg.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{pkg.rating}</span>
                        <span className="font-normal text-slate-400">({pkg.reviewsCount} reseñas DMC)</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Plane className="w-3.5 h-3.5 text-slate-400" />
                        <span>Conexión PTY ✈ CTG/MDE</span>
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Action CTA */}
                  <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end p-4 lg:border-l border-slate-100 space-y-4">
                    <div className="lg:text-right">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tarifa base por persona
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {priceFormatted}
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold block">
                        Base doble • Hoteles boutique incl.
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Cargar en Constructor</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setExpandedPkgId(isExpanded ? null : pkg.id)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Ocultar Itinerario Día a Día' : 'Ver Itinerario Día a Día'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Day-by-Day Accordion details */}
                {isExpanded && (
                  <div className="border-t border-slate-200/80 bg-slate-50/60 p-6 sm:p-8 animate-in slide-in-from-top-2 duration-200">
                    <div className="max-w-4xl mx-auto space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h4 className="font-extrabold text-base text-slate-900">
                          Desglose Operativo Día a Día ({pkg.totalDays} Días)
                        </h4>
                        <span className="text-xs text-slate-500">
                          Incluye traslados privados, desayunos y entradas
                        </span>
                      </div>

                      <div className="space-y-3">
                        {pkg.itinerary.map((day) => (
                          <div
                            key={day.dayNumber}
                            className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                                  D{day.dayNumber}
                                </span>
                                <h5 className="font-bold text-sm text-slate-900">
                                  {day.title}
                                </h5>
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                day.country === 'panama' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {day.destination}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed pl-9">
                              {day.summary}
                            </p>

                            <div className="pl-9 pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                              <span><strong>Hotel:</strong> {day.hotelSuggestion}</span>
                              <span>•</span>
                              <span><strong>Comidas:</strong> {day.mealsIncluded}</span>
                              <span>•</span>
                              <span><strong>Transporte:</strong> {day.transferType}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Load CTA */}
                      <div className="pt-4 text-center">
                        <button
                          onClick={() => onSelectPackage(pkg)}
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
                        >
                          <span>Cargar este circuito en el Cotizador e Itinerario</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
