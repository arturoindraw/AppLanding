import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  User,
  ShieldCheck,
  Plane,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { FAQ_CHATBOT_KNOWLEDGE, MULTIDESTINO_PACKAGES, type MultiPackage } from '../data/destinations';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'load_package' | 'open_quotator' | 'open_lead_form';
    label: string;
    payload?: any;
  };
}

interface ChatbotConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (pkg: MultiPackage) => void;
  onNavigateToSection: (section: string) => void;
}

const QUICK_PROMPTS = [
  '¿Requisitos de vacuna de fiebre amarilla?',
  '¿Cómo es la conexión de vuelo Panamá y Cartagena?',
  '¿Cuáles son las monedas y cómo pagar en USD/COP?',
  '¿Cuál es la mejor época para viajar a ambos países?',
  '¿Tienen tarifas B2B para agencias de viajes?',
  'Recomiéndame una ruta multidestino de 8 días'
];

export const ChatbotConcierge: React.FC<ChatbotConciergeProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
  onNavigateToSection,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy Isla & Andina, tu Concierge Virtual y Especialista DMC para Panamá y Colombia. Puedo resolver dudas sobre conexiones de vuelos, sanidad, mejores temporadas, o armar tu viaje multidestino a la medida. ¿En qué puedo orientarte hoy?',
      timestamp: 'Ahora'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadDates, setLeadDates] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Natural answer matching
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matchedFaq = FAQ_CHATBOT_KNOWLEDGE.find(f =>
        f.triggers.some(trigger => qLower.includes(trigger))
      );

      let replyText = '';
      let action: Message['action'] | undefined = undefined;

      if (qLower.includes('8 día') || qLower.includes('ruta') || qLower.includes('itinerario') || qLower.includes('paquete')) {
        const pkg = MULTIDESTINO_PACKAGES[0]; // Ruta Dos Mares
        replyText = `¡Te recomiendo nuestro circuito estrella: **"${pkg.name}"**! Incluye 3 noches en Panamá (Casco Viejo, Canal y San Blas) + 4 noches en Colombia (Cartagena amurallada, Islas del Rosario y Medellín innovadora) con vuelos incluidos. ¿Deseas que lo cargue directamente en el constructor para ver el día a día y cotizarlo en USD o COP?`;
        action = {
          type: 'load_package',
          label: `Cargar ${pkg.name} (8 Días)`,
          payload: pkg
        };
      } else if (matchedFaq) {
        replyText = matchedFaq.response;
      } else if (qLower.includes('cotizar') || qLower.includes('precio') || qLower.includes('cuanto cuesta')) {
        replyText = `Puedes personalizar y ver el desglose exacto en nuestro Cotizador Dinámico, ajustando número de viajeros, categoría de hotel y moneda (USD o COP). También puedes solicitar que un asesor DMC prepare una propuesta formal.`;
        action = {
          type: 'open_quotator',
          label: 'Ir al Cotizador Dinámico'
        };
      } else if (qLower.includes('contacto') || qLower.includes('humano') || qLower.includes('asesor') || qLower.includes('telefono')) {
        replyText = `Con gusto te conecto con nuestro equipo de operaciones DMC. Por favor ingresa tus datos y un especialista te contactará en menos de 2 horas.`;
        action = {
          type: 'open_lead_form',
          label: 'Contactar Especialista DMC'
        };
      } else {
        replyText = `Entiendo perfectamente tu consulta sobre "${query}". Como DMC oficial para Panamá y Colombia, coordinamos cada tramo con logística integral, guías certificados y hotelería de primer nivel. ¿Deseas que preparemos una propuesta formal para tus fechas o prefieres explorar los circuitos disponibles?`;
        action = {
          type: 'open_lead_form',
          label: 'Solicitar Propuesta Personalizada'
        };
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        action
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: Message['action']) => {
    if (!action) return;

    if (action.type === 'load_package' && action.payload) {
      onSelectPackage(action.payload);
      onNavigateToSection('cotizador');
      onClose();
    } else if (action.type === 'open_quotator') {
      onNavigateToSection('cotizador');
      onClose();
    } else if (action.type === 'open_lead_form') {
      setShowLeadForm(true);
    }
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact) return;

    setLeadSubmitted(true);
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadSubmitted(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-lead-${Date.now()}`,
          sender: 'bot',
          text: `¡Excelente, ${leadName}! Hemos recibido tu solicitud. Nuestro equipo de operaciones de TerraIstmo DMC te enviará la propuesta oficial detallada a "${leadContact}". Un asesor te escribirá en breve.`,
          timestamp: 'Ahora'
        }
      ]);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 p-0 bg-black/40 backdrop-blur-xs no-print">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md h-[88vh] sm:h-[620px] shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-4 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-emerald-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm leading-tight text-white">Isla &amp; Andina</h3>
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded">IA DMC</span>
              </div>
              <p className="text-[11px] text-slate-300">Concierge Virtual Panamá &amp; Colombia</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Cerrar asistente virtual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                  isBot
                    ? 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs'
                    : 'bg-emerald-600 text-white rounded-br-xs'
                }`}>
                  <p className="leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <div className="pt-1">
                      <button
                        onClick={() => handleActionClick(msg.action)}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span className={`text-[9px] block text-right ${isBot ? 'text-slate-400' : 'text-emerald-100'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 pl-9">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] text-slate-500 font-medium">Consultando itinerarios DMC...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition cursor-pointer border border-slate-200 shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregunta sobre vuelos, vacunas, San Blas, Cartagena..."
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition cursor-pointer shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Lead Capture Modal inside Chat */}
        {showLeadForm && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-extrabold text-base text-slate-900">
                Solicitar Asesoría DMC Personalizada
              </h4>
              <button onClick={() => setShowLeadForm(false)} className="text-slate-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {leadSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-slate-900">¡Solicitud recibida!</h5>
                <p className="text-xs text-slate-600">Un asesor DMC te contactará de inmediato.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre completo o Agencia *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Ej. Laura Martínez / Viajes Iberia"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email o WhatsApp de Contacto *</label>
                  <input
                    type="text"
                    required
                    value={leadContact}
                    onChange={(e) => setLeadContact(e.target.value)}
                    placeholder="+34 600... o correo@empresa.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fechas estimadas o número de días</label>
                  <input
                    type="text"
                    value={leadDates}
                    onChange={(e) => setLeadDates(e.target.value)}
                    placeholder="Ej. Noviembre 2026, 8 días aprox."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl"
                  >
                    Enviar al Equipo DMC
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="px-4 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl"
                  >
                    Volver
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
