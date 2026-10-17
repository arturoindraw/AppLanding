import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  Check,
  Plus,
  Info,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  EXPERIENCES_CATALOG,
  type Experience
} from '../data/destinations';
import {
  formatCurrency,
  type Currency
} from '../utils/pricing';

interface CatalogSectionProps {
  currency: Currency;
  exchangeRate: number;
  onAddExperienceToItinerary: (exp: Experience) => void;
  selectedExperienceIds: string[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  currency,
  exchangeRate,
  onAddExperienceToItinerary,
  selectedExperienceIds,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'panama' | 'colombia'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalExp, setActiveModalExp] = useState<Experience | null>(null);

  const categories = [
    { id: 'all', label: 'Todas las Experiencias' },
    { id: 'cultura', label: 'Cultura & Patrimonio' },
    { id: 'playas', label: 'Playas & Islas' },
    { id: 'naturaleza', label: 'Naturaleza & Biodiversidad' },
    { id: 'gastronomia', label: 'Gastronomía & Café' },
    { id: 'lujo', label: 'Lujo & Chárters' },
  ];

  const filtered = EXPERIENCES_CATALOG.filter((item) => {
    if (selectedCountry !== 'all' && item.country !== selectedCountry) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchRegion = item.region.toLowerCase().includes(q);
      const matchDesc = item.shortDesc.toLowerCase().includes(q);
      if (!matchTitle && !matchRegion && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Portafolio DMC Homologado</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Catálogo de Experiencias en Panamá &amp; Colombia
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Excursiones operadas con transportes privados, guías bilingües certificados y tarifas netas para armar itinerarios a la medida.
            </p>
          </div>

          {/* Quick country tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCountry === 'all'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ambos Países ({EXPERIENCES_CATALOG.length})
            </button>
            <button
              onClick={() => setSelectedCountry('panama')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCountry === 'panama'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-300" />
              <span>Panamá (5)</span>
            </button>
            <button
              onClick={() => setSelectedCountry('colombia')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCountry === 'colombia'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span>Colombia (6)</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por destino (Casco Viejo, San Blas, Cartagena, Guatapé, Tayrona)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Categories Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No encontramos experiencias para tu búsqueda</h3>
            <p className="text-sm text-slate-500 mt-1">Prueba cambiando los filtros o borrando el término de búsqueda.</p>
            <button
              onClick={() => {
                setSelectedCountry('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp) => {
              const isSelected = selectedExperienceIds.includes(exp.id);
              const formattedPrice = formatCurrency(exp.priceUsd, currency, exchangeRate);

              return (
                <article
                  key={exp.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Badge country */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs ${
                        exp.country === 'panama' ? 'bg-blue-600' : 'bg-emerald-700'
                      }`}>
                        {exp.country === 'panama' ? 'Panamá' : 'Colombia'}
                      </span>
                      {exp.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                          {exp.badge}
                        </span>
                      )}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{exp.rating}</span>
                      <span className="text-slate-300 text-[10px]">({exp.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.region}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.duration}</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition">
                        {exp.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {exp.shortDesc}
                      </p>
                    </div>

                    {/* Bottom Price & Actions */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                          Por Persona
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          {formattedPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveModalExp(exp)}
                          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200 cursor-pointer"
                          title="Ver ficha técnica completa"
                          aria-label={`Ver detalles de ${exp.title}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onAddExperienceToItinerary(exp)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>En Itinerario</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Añadir</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Detailed Modal Sheet */}
        {activeModalExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-slate-800">
              
              {/* Modal Image Header */}
              <div className="relative h-64 w-full bg-slate-900">
                <img
                  src={activeModalExp.imageUrl}
                  alt={activeModalExp.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveModalExp(null)}
                  className="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    activeModalExp.country === 'panama' ? 'bg-blue-600' : 'bg-emerald-700'
                  }`}>
                    {activeModalExp.country === 'panama' ? 'Panamá' : 'Colombia'} • {activeModalExp.region}
                  </span>
                  <span className="bg-slate-900/90 px-3 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{activeModalExp.rating} / 5.0</span>
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {activeModalExp.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {activeModalExp.shortDesc}
                  </p>
                </div>

                {/* Logistics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Duración</span>
                    <strong className="text-slate-800">{activeModalExp.duration}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Pickup Oficial</span>
                    <strong className="text-slate-800">{activeModalExp.pickupTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Idioma</span>
                    <strong className="text-slate-800">{activeModalExp.language}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Nivel Físico</span>
                    <strong className="text-slate-800">{activeModalExp.physicalLevel}</strong>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Puntos Destacados del Programa</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {activeModalExp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/60">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-2 text-emerald-800">Servicios Incluidos:</span>
                    <ul className="space-y-1.5 text-slate-600">
                      {activeModalExp.included.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-2 text-slate-500">No Incluye:</span>
                    <ul className="space-y-1.5 text-slate-600">
                      {activeModalExp.excluded.map((exc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Operational Notice */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Nota Operativa DMC:</strong>
                    <span>{activeModalExp.operationalNotes}</span>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Tarifa oficial</span>
                    <span className="text-xl font-black text-slate-900">
                      {formatCurrency(activeModalExp.priceUsd, currency, exchangeRate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveModalExp(null)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => {
                        onAddExperienceToItinerary(activeModalExp);
                        setActiveModalExp(null);
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{selectedExperienceIds.includes(activeModalExp.id) ? 'Mantener en Itinerario' : 'Añadir a Itinerario'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
