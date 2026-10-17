import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Trash2,
  MapPin,
  Plane,
  ArrowRight,
  Sparkles,
  Compass,
  Check,
  ChevronRight,
  Clock,
  Hotel,
  Coffee,
  HelpCircle
} from 'lucide-react';
import {
  EXPERIENCES_CATALOG,
  type DayPlan,
  type Experience
} from '../data/destinations';
import {
  formatCurrency,
  type Currency
} from '../utils/pricing';

interface ItineraryBuilderProps {
  days: DayPlan[];
  onUpdateDays: (days: DayPlan[]) => void;
  currency: Currency;
  exchangeRate: number;
  onGoToQuotator: () => void;
  selectedExperienceIds: string[];
  onToggleExperience: (exp: Experience) => void;
}

const DESTINATION_OPTIONS = [
  { name: 'Ciudad de Panamá', country: 'panama' as const },
  { name: 'Guna Yala (San Blas)', country: 'panama' as const },
  { name: 'Bocas del Toro', country: 'panama' as const },
  { name: 'Boquete / Volcán Barú', country: 'panama' as const },
  { name: 'Cartagena de Indias', country: 'colombia' as const },
  { name: 'Islas del Rosario / Barú', country: 'colombia' as const },
  { name: 'Medellín / Guatapé', country: 'colombia' as const },
  { name: 'Eje Cafetero / Salento', country: 'colombia' as const },
  { name: 'Santa Marta / Parque Tayrona', country: 'colombia' as const },
];

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  days,
  onUpdateDays,
  currency,
  exchangeRate,
  onGoToQuotator,
  selectedExperienceIds,
  onToggleExperience,
}) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const currentDay = days[selectedDayIdx] || days[0];

  const handleAddDay = () => {
    const nextDayNum = days.length + 1;
    // Default country alternates or sticks to Colombia if past day 4
    const lastDay = days[days.length - 1];
    const country = lastDay ? lastDay.country : 'panama';
    const dest = country === 'panama' ? 'Ciudad de Panamá' : 'Cartagena de Indias';

    const newDay: DayPlan = {
      dayNumber: nextDayNum,
      title: `Día ${nextDayNum}: Exploración en ${dest}`,
      country: country,
      destination: dest,
      summary: `Jornada abierta para tours personalizados, compras y gastronomía local con asistencia de TerraIstmo DMC.`,
      activities: ['Tiempo libre o excursión opcional del catálogo', 'Cena en restaurante recomendado'],
      hotelSuggestion: country === 'panama' ? 'Hotel La Compañía' : 'Hotel Charleston Santa Teresa',
      mealsIncluded: 'Desayuno buffet',
      transferType: 'Vehículo privado según agenda'
    };

    onUpdateDays([...days, newDay]);
    setSelectedDayIdx(days.length);
  };

  const handleRemoveDay = (idxToRemove: number) => {
    if (days.length <= 2) {
      return; // Keep at least 2 days
    }
    const filtered = days.filter((_, i) => i !== idxToRemove).map((d, index) => ({
      ...d,
      dayNumber: index + 1
    }));
    onUpdateDays(filtered);
    setSelectedDayIdx(Math.max(0, Math.min(selectedDayIdx, filtered.length - 1)));
  };

  const handleUpdateCurrentDayDestination = (destName: string) => {
    const found = DESTINATION_OPTIONS.find(d => d.name === destName);
    if (!found) return;

    const updated = [...days];
    updated[selectedDayIdx] = {
      ...updated[selectedDayIdx],
      destination: destName,
      country: found.country,
      title: `Día ${updated[selectedDayIdx].dayNumber}: Inmersión en ${destName}`,
      hotelSuggestion: found.country === 'panama' ? 'Hotel Seleccionado Panamá' : 'Hotel Seleccionado Colombia'
    };
    onUpdateDays(updated);
  };

  const handleUpdateDaySummary = (text: string) => {
    const updated = [...days];
    updated[selectedDayIdx] = {
      ...updated[selectedDayIdx],
      summary: text
    };
    onUpdateDays(updated);
  };

  // Find experiences matching the current day's country or destination
  const suggestedExpsForDay = EXPERIENCES_CATALOG.filter(
    exp => exp.country === currentDay?.country
  );

  // Counts
  const panamaDaysCount = days.filter(d => d.country === 'panama').length;
  const colombiaDaysCount = days.filter(d => d.country === 'colombia').length;

  return (
    <section id="itinerario" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <CalendarDays className="w-3.5 h-3.5 text-blue-700" />
              <span>Constructor Visual DMC</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Constructor de Itinerario Día a Día
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Agrega días, cambia de destino entre Panamá y Colombia, y añade excursiones del catálogo. Los costos se sincronizan instantáneamente en el cotizador.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleAddDay}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Añadir Día</span>
            </button>

            <button
              onClick={onGoToQuotator}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition cursor-pointer shadow-md"
            >
              <span>Ver Cotización</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Route Balance Indicator */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span>Panamá: {panamaDaysCount} Días</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Colombia: {colombiaDaysCount} Días</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Plane className="w-4 h-4 text-emerald-600" />
            <span>Puente aéreo internacional PTY ✈ CTG/MDE incluido automáticamente</span>
          </div>
        </div>

        {/* Builder Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Timeline Day Selector */}
          <div className="lg:col-span-4 space-y-2 max-h-[640px] overflow-y-auto pr-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block px-1 mb-2">
              Línea de Tiempo del Viaje ({days.length} Días)
            </span>

            {days.map((day, idx) => {
              const isSelected = selectedDayIdx === idx;
              return (
                <div
                  key={day.dayNumber}
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-400 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      D{day.dayNumber}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          day.country === 'panama' ? 'bg-blue-500' : 'bg-amber-500'
                        }`} />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {day.destination}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {day.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {days.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDay(idx);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                        title="Eliminar este día"
                        aria-label={`Eliminar día ${day.dayNumber}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-300'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Day Editor */}
          <div className="lg:col-span-8 bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6">
            {currentDay ? (
              <>
                {/* Day Header Editor */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                      D{currentDay.dayNumber}
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Configurando Día {currentDay.dayNumber} de {days.length}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {currentDay.title}
                      </h3>
                    </div>
                  </div>

                  {/* Destination dropdown */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase block">
                      Destino / Región
                    </label>
                    <select
                      value={currentDay.destination}
                      onChange={(e) => handleUpdateCurrentDayDestination(e.target.value)}
                      className="bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      {DESTINATION_OPTIONS.map((dest) => (
                        <option key={dest.name} value={dest.name}>
                          {dest.country === 'panama' ? '🇵🇦 Panamá' : '🇨🇴 Colombia'} — {dest.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Day Summary description */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Resumen Operativo del Día
                  </label>
                  <textarea
                    rows={3}
                    value={currentDay.summary}
                    onChange={(e) => handleUpdateDaySummary(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-none leading-relaxed"
                    placeholder="Describe los momentos clave, actividades o logística prevista..."
                  />
                </div>

                {/* Day Logistics Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2">
                    <Hotel className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Alojamiento sugerido</span>
                      <span className="text-slate-800 font-semibold">{currentDay.hotelSuggestion}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2">
                    <Coffee className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Régimen alimenticio</span>
                      <span className="text-slate-800 font-semibold">{currentDay.mealsIncluded}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2">
                    <Plane className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Logística de movilidad</span>
                      <span className="text-slate-800 font-semibold">{currentDay.transferType}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Experiences for this day / country */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Experiencias recomendadas para {currentDay.country === 'panama' ? 'Panamá' : 'Colombia'}</span>
                    </h4>
                    <span className="text-xs text-slate-500">Haz clic para incluir en el presupuesto</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suggestedExpsForDay.map((exp) => {
                      const isIncluded = selectedExperienceIds.includes(exp.id);
                      const priceFormatted = formatCurrency(exp.priceUsd, currency, exchangeRate);

                      return (
                        <div
                          key={exp.id}
                          onClick={() => onToggleExperience(exp)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isIncluded
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={exp.imageUrl}
                              alt={exp.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="font-bold text-xs truncate">
                                {exp.title}
                              </h5>
                              <span className="text-[11px] text-slate-500 block">
                                {exp.region} • {priceFormatted}
                              </span>
                            </div>
                          </div>

                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition ${
                            isIncluded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};
