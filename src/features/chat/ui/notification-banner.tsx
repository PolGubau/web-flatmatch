import { useEffect, useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { useNotificationPermission } from "~/shared/hooks/use-notification-permission";

/**
 * Banner para solicitar permiso de notificaciones
 * Se muestra una sola vez cuando el permiso es "default"
 */
export function NotificationBanner() {
  const { permission, requestPermission, isSupported } =
    useNotificationPermission();
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró y rechazó antes
    const wasDismissed = localStorage.getItem("notification-banner-dismissed");
    if (wasDismissed) {
      setDismissed(true);
    }

    // Mostrar banner solo si el permiso es "default" y no fue rechazado
    if (isSupported && permission === "default" && !wasDismissed) {
      // Delay para mostrar después de que cargue la app
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, [permission, isSupported]);

  const handleAllow = async () => {
    await requestPermission();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("notification-banner-dismissed", "true");
    setDismissed(true);
    setIsVisible(false);
  };

  if (!isSupported || dismissed || permission !== "default" || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">
              Activa las notificaciones
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Recibe alertas cuando lleguen nuevos mensajes, incluso con la app
              cerrada
            </p>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleAllow} size="sm">
                Activar
              </Button>
              <Button onClick={handleDismiss} size="sm" variant="outline">
                Ahora no
              </Button>
            </div>
          </div>
          <button
            aria-label="Cerrar"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleDismiss}
            type="button"
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 16 16"
              width="16"
            >
              <title>Close</title>
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
