import React from 'react';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle,
  Clock,
  Globe,
  Award
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  TerraIstmo DMC
                </span>
                <span className="text-[10px] block uppercase tracking-widest text-emerald-400 font-bold">
                  Panamá &amp; Colombia Receptivo
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Destination Management Company (DMC) y Marketplace Mayorista líder para viajes multidestino combinados entre el Istmo de Panamá y la República de Colombia.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-md font-mono">
                ATP Panamá Reg: #8942-DMC
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-md font-mono">
                RNT Colombia: #48192
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Navegación Rápida
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('paquetes')}
                  className="hover:text-emerald-400 transition"
                >
                  Circuitos Multidestino
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-emerald-400 transition"
                >
                  Catálogo de Experiencias
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('itinerario')}
                  className="hover:text-emerald-400 transition"
                >
                  Constructor por Días
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cotizador')}
                  className="hover:text-emerald-400 transition"
                >
                  Cotizador USD / COP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('operaciones')}
                  className="hover:text-emerald-400 transition"
                >
                  Panel Operativo B2B
                </button>
              </li>
            </ul>
          </div>

          {/* Sede Panamá */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Sede Ciudad de Panamá</span>
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Torre de las Américas, Piso 14, Punta Pacífica, Ciudad de Panamá.
            </p>
            <p className="text-slate-300 text-[11px] font-mono">
              Tel: +507 299-4400
            </p>
            <p className="text-slate-400 text-[11px]">
              Centro de Despacho Canal &amp; Guna Yala 24/7.
            </p>
          </div>

          {/* Sede Colombia */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Sede Cartagena &amp; Medellín</span>
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Calle San Pedro Claver, Centro Histórico, Cartagena de Indias.
            </p>
            <p className="text-slate-300 text-[11px] font-mono">
              Tel: +57 605 664-9000
            </p>
            <p className="text-slate-400 text-[11px]">
              Oficina Enlace Medellín: El Poblado Cra 43A.
            </p>
          </div>

        </div>

        {/* Legal & Compliance Footer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} TerraIstmo DMC S.A. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Exención de IVA Turistas Extranjeros (Dec. 297/2016)</span>
            </span>
            <span>•</span>
            <span>Código de Ética y Turismo Sostenible</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
