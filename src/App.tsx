/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bot, Sparkles, MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { CatalogSection } from './components/CatalogSection';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { QuotatorSection } from './components/QuotatorSection';
import { OperationsDashboard } from './components/OperationsDashboard';
import { ChatbotConcierge } from './components/ChatbotConcierge';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Footer } from './components/Footer';

import {
  MULTIDESTINO_PACKAGES,
  EXPERIENCES_CATALOG,
  INITIAL_OPERATIONS_BOOKINGS,
  type MultiPackage,
  type Experience,
  type DayPlan,
  type BookingLead
} from './data/destinations';
import {
  DEFAULT_COP_EXCHANGE_RATE,
  type Currency
} from './utils/pricing';

export default function App() {
  // Global App State
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_COP_EXCHANGE_RATE);
  const [b2bMode, setB2bMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Days in itinerary (default initialized with flagship 8-day package)
  const [days, setDays] = useState<DayPlan[]>(MULTIDESTINO_PACKAGES[0].itinerary);

  // Selected standalone experiences for quotation
  const [selectedExperiences, setSelectedExperiences] = useState<Experience[]>([
    EXPERIENCES_CATALOG[0], // Canal de Miraflores
    EXPERIENCES_CATALOG[5]  // Cartagena Colonial VIP
  ]);

  // Bookings list for internal DMC Operations Panel
  const [bookings, setBookings] = useState<BookingLead[]>(INITIAL_OPERATIONS_BOOKINGS);

  // AI Chatbot Concierge Modal
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Package loader
  const handleSelectPackage = (pkg: MultiPackage) => {
    setDays([...pkg.itinerary]);

    // Auto-select relevant experiences that match the package
    const matchedExps: Experience[] = [];
    if (pkg.id === 'pkg-01') {
      matchedExps.push(EXPERIENCES_CATALOG[0]); // Canal
      matchedExps.push(EXPERIENCES_CATALOG[1]); // San Blas
      matchedExps.push(EXPERIENCES_CATALOG[5]); // Cartagena Colonial
      matchedExps.push(EXPERIENCES_CATALOG[7]); // Medellin Comuna 13
    } else if (pkg.id === 'pkg-02') {
      matchedExps.push(EXPERIENCES_CATALOG[1]); // San Blas
      matchedExps.push(EXPERIENCES_CATALOG[4]); // Bocas
      matchedExps.push(EXPERIENCES_CATALOG[5]); // Cartagena
      matchedExps.push(EXPERIENCES_CATALOG[9]); // Tayrona
    } else {
      matchedExps.push(EXPERIENCES_CATALOG[3]); // Boquete
      matchedExps.push(EXPERIENCES_CATALOG[8]); // Eje Cafetero
      matchedExps.push(EXPERIENCES_CATALOG[10]); // Guatapé
    }
    setSelectedExperiences(matchedExps);

    // Scroll to constructor/cotizador
    handleNavigate('itinerario');
  };

  // Toggle experience selection in catalog or day editor
  const handleToggleExperience = (exp: Experience) => {
    setSelectedExperiences(prev => {
      const exists = prev.some(item => item.id === exp.id);
      if (exists) {
        return prev.filter(item => item.id !== exp.id);
      } else {
        return [...prev, exp];
      }
    });
  };

  // Confirmation of reservation from quotator
  const handleBookingConfirmed = (voucherData: any) => {
    const newBooking: BookingLead = {
      id: `BK-${Math.floor(9100 + Math.random() * 800)}`,
      voucherCode: voucherData.code,
      clientName: voucherData.clientName,
      agencyName: voucherData.agencyName,
      email: voucherData.email,
      phone: '+1 800 555-TERRA',
      countryRoute: 'Panamá + Colombia',
      travelDates: voucherData.dates,
      paxAdults: 2,
      paxChildren: 0,
      hotelTier: 'superior',
      totalUsd: 3450,
      currency: voucherData.currency,
      status: 'Confirmada',
      assignedGuide: 'Asignado Concierge DMC',
      notes: 'Reserva confirmada online mediante cotizador interactivo TerraIstmo.'
    };

    setBookings(prev => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
      
      {/* PWA Install Banner */}
      <PWAInstallPrompt />

      {/* Main Sticky Navigation */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        exchangeRate={exchangeRate}
        b2bMode={b2bMode}
        onToggleB2bMode={() => setB2bMode(!b2bMode)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      <main className="flex-1">
        {/* Hero & Multi-destination value prop */}
        <HeroSection
          currency={currency}
          onExplorePackages={() => handleNavigate('paquetes')}
          onGoToQuotator={() => handleNavigate('cotizador')}
          onGoToCatalog={() => handleNavigate('catalogo')}
        />

        {/* Multidestino Recommended Circuit Packages */}
        <PackagesSection
          currency={currency}
          exchangeRate={exchangeRate}
          onSelectPackage={handleSelectPackage}
        />

        {/* Visual Day-by-Day Itinerary Builder */}
        <ItineraryBuilder
          days={days}
          onUpdateDays={setDays}
          currency={currency}
          exchangeRate={exchangeRate}
          onGoToQuotator={() => handleNavigate('cotizador')}
          selectedExperienceIds={selectedExperiences.map(e => e.id)}
          onToggleExperience={handleToggleExperience}
        />

        {/* Dynamic Multi-Currency Quotator */}
        <QuotatorSection
          days={days}
          selectedExperiences={selectedExperiences}
          currency={currency}
          onCurrencyChange={setCurrency}
          exchangeRate={exchangeRate}
          onExchangeRateChange={setExchangeRate}
          b2bMode={b2bMode}
          onToggleB2bMode={() => setB2bMode(!b2bMode)}
          onBookingConfirmed={handleBookingConfirmed}
        />

        {/* Interactive Experience Catalog */}
        <CatalogSection
          currency={currency}
          exchangeRate={exchangeRate}
          onAddExperienceToItinerary={handleToggleExperience}
          selectedExperienceIds={selectedExperiences.map(e => e.id)}
        />

        {/* DMC Operations & Back-Office Panel */}
        <OperationsDashboard
          currency={currency}
          exchangeRate={exchangeRate}
          bookings={bookings}
          onUpdateBookings={setBookings}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating AI Concierge Chatbot Button */}
      <div className="fixed bottom-5 right-5 z-40 no-print">
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl shadow-emerald-950/20 hover:scale-105 transition-all cursor-pointer border border-emerald-400/30"
          aria-label="Abrir asistente y concierge de viajes"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <span className="hidden sm:inline text-xs tracking-wide">
            Asistente DMC Isla &amp; Andina
          </span>
        </button>
      </div>

      {/* Chatbot Concierge Modal / Drawer */}
      <ChatbotConcierge
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onSelectPackage={handleSelectPackage}
        onNavigateToSection={handleNavigate}
      />

    </div>
  );
}
