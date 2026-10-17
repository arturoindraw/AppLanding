import React from 'react';
import {
  Compass,
  ArrowRight,
  Plane,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';
import type { Currency } from '../utils/pricing';

interface HeroSectionProps {
  currency: Currency;
  onExplorePackages: () => void;
  onGoToQuotator: () => void;
  onGoToCatalog: (country?: 'panama' | 'colombia') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currency,
  onExplorePackages,
  onGoToQuotator,
  onGoToCatalog,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background ambient glow & map overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>DMC Receptivo &amp; Marketplace Mayorista Oficial</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Operaciones en Vivo Panamá &amp; Colombia</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-display">
              El Istmo y los Andes unidos en una sola{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Experiencia Multidestino.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Diseña, cotiza y opera itinerarios integrados entre <strong>Panamá</strong> (Canal, San Blas, Casco Viejo) y <strong>Colombia</strong> (Cartagena de Indias, Medellín, Eje Cafetero). Precios en tiempo real en <span className="text-emerald-300 font-semibold">USD</span> y <span className="text-amber-300 font-semibold">COP</span>, logística de vuelos inter-país y soporte operativo 24/7 para agencias y viajeros independientes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplorePackages}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] cursor-pointer text-sm sm:text-base"
              >
                <span>Ver Circuitos Multidestino</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToQuotator}
                className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition cursor-pointer text-sm sm:text-base"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Cotizador Dinámico USD/COP</span>
              </button>
            </div>

            {/* Value Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Puente Aéreo 70 min</h4>
                  <p className="text-[11px] text-slate-400">Vuelos directos diarios PTY-CTG/MDE</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Exención IVA 19%</h4>
                  <p className="text-[11px] text-slate-400">Turistas extranjeros no pagan IVA en Colombia</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Tarifas B2B Confidenciales</h4>
                  <p className="text-[11px] text-slate-400">Comisiones de 10% a 20% para agencias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Interactive Bridge Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/40 via-teal-500/20 to-slate-800/40 shadow-2xl">
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-[22px] p-6 border border-slate-700/60 text-slate-100 space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Ruta Estrella Conectada
                  </span>
                  <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    8 Días / 7 Noches
                  </span>
                </div>

                {/* Visual Route Nodes */}
                <div className="space-y-4">
                  
                  {/* Node 1: Panama */}
                  <div className="flex items-start gap-3.5 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-black text-xs shrink-0">
                      PA
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white">Panamá (Días 1-3)</h4>
                        <span className="text-[11px] text-blue-300 font-medium">Canal &amp; San Blas</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Casco Antiguo, esclusas Miraflores e islas coralinas Guna Yala.
                      </p>
                    </div>
                  </div>

                  {/* Flight Connector */}
                  <div className="flex items-center justify-center gap-2 py-1 text-xs text-emerald-400 font-semibold">
                    <div className="h-px bg-emerald-500/40 flex-1" />
                    <div className="flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 text-[11px]">
                      <Plane className="w-3.5 h-3.5 rotate-45 text-amber-400" />
                      <span>Conexión PTY ✈ CTG (1h 10m)</span>
                    </div>
                    <div className="h-px bg-emerald-500/40 flex-1" />
                  </div>

                  {/* Node 2: Colombia */}
                  <div className="flex items-start gap-3.5 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50">
                    <div className="w-9 h-9 rounded-xl bg-amber-600/30 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-xs shrink-0">
                      CO
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white">Colombia (Días 4-8)</h4>
                        <span className="text-[11px] text-amber-300 font-medium">Cartagena &amp; Medellín</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Murallas del s. XVI, yate en Islas del Rosario y Comuna 13.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Instant Action buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onGoToCatalog('panama')}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold py-2.5 rounded-xl text-center transition border border-slate-700 cursor-pointer"
                  >
                    Ver Panamá
                  </button>
                  <button
                    onClick={() => onGoToCatalog('colombia')}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold py-2.5 rounded-xl text-center transition border border-slate-700 cursor-pointer"
                  >
                    Ver Colombia
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
