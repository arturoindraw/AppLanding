import React, { useState } from 'react';
import {
  Compass,
  DollarSign,
  Briefcase,
  Bot,
  Menu,
  X,
  MapPin,
  CalendarDays,
  Calculator,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import type { Currency } from '../utils/pricing';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  exchangeRate: number;
  b2bMode: boolean;
  onToggleB2bMode: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenChatbot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  exchangeRate,
  b2bMode,
  onToggleB2bMode,
  activeSection,
  onNavigate,
  onOpenChatbot
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'paquetes', label: 'Circuitos Multidestino', icon: Compass },
    { id: 'catalogo', label: 'Catálogo de Experiencias', icon: MapPin },
    { id: 'itinerario', label: 'Constructor por Días', icon: CalendarDays },
    { id: 'cotizador', label: 'Cotizador Dinámico', icon: Calculator },
    { id: 'operaciones', label: 'Panel DMC Operativo', icon: Building2 },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-700 via-teal-700 to-amber-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/10 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">
                  TerraIstmo
                </span>
                <span className="text-xs uppercase tracking-widest font-black text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                  DMC
                </span>
              </div>
              <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                <span>Panamá</span>
                <span className="text-emerald-600 font-bold">•</span>
                <span>Colombia</span>
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Currency switcher, B2B toggle, Chatbot button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Currency Selector (USD / COP) */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/90 flex items-center shadow-2xs">
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Moneda Dólar Estadounidense (Panamá)"
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('COP')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === 'COP'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={`Moneda Peso Colombiano (Tasa: 1 USD = $${exchangeRate.toLocaleString()} COP)`}
              >
                COP ($)
              </button>
            </div>

            {/* B2B Mode Agency Button */}
            <button
              type="button"
              onClick={onToggleB2bMode}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                b2bMode
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              title="Modo exclusivo para Agencias de Viajes y Operadores Mayoristas"
            >
              <Briefcase className={`w-3.5 h-3.5 ${b2bMode ? 'text-slate-950' : 'text-amber-600'}`} />
              <span>{b2bMode ? 'Modo B2B Agencias ON' : 'Modo Agencia B2B'}</span>
            </button>

            {/* AI Concierge floating launcher button */}
            <button
              onClick={onOpenChatbot}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-900/15 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              aria-label="Abrir asistente de viajes con inteligencia artificial"
            >
              <div className="relative">
                <Bot className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-emerald-800 animate-pulse" />
              </div>
              <span className="hidden sm:inline">Concierge IA</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-150">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onToggleB2bMode();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold border ${
                  b2bMode
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <span>Tarifas B2B para Agencias</span>
                </div>
                <span className="text-xs font-bold">{b2bMode ? 'ACTIVADO' : 'ACTIVAR'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
