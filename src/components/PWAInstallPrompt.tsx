import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  if (isInstalled || bannerDismissed) {
    return null;
  }

  return (
    <>
      <div className="no-print bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white px-4 py-2.5 text-xs sm:text-sm border-b border-emerald-800/60 shadow-inner flex items-center justify-between">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="p-1 rounded bg-emerald-500/20 text-emerald-300">
            <Smartphone className="w-4 h-4 shrink-0" />
          </div>
          <span className="truncate">
            <strong className="font-semibold text-emerald-200">App Oficial TerraIstmo DMC:</strong> Accede offline a tus itinerarios y cotizaciones desde cualquier dispositivo.
          </span>
        </div>

        <div className="flex items-center gap-2 ml-3 shrink-0">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1 rounded-md font-semibold text-xs transition shadow-sm cursor-pointer"
            aria-label="Instalar aplicación web progresiva"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar PWA</span>
          </button>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-emerald-300/70 hover:text-white p-1 rounded transition cursor-pointer"
            aria-label="Cerrar aviso de instalación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-slate-800 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">Instalar en iPhone o iPad</h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Para instalar <strong>TerraIstmo DMC</strong> en tu pantalla de inicio y utilizarla sin conexión:
            </p>
            <ol className="text-xs text-slate-700 space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-5">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 text-[11px]">1</span>
                <span>Toca el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba) en la barra inferior de Safari.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 text-[11px]">2</span>
                <span>Desliza las opciones y selecciona <strong>«Agregar a Inicio»</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 text-[11px]">3</span>
                <span>Pulsa <strong>Agregar</strong> en la esquina superior derecha. ¡Listo!</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl text-sm transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
