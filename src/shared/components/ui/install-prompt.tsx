import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { isPWA, promptInstall } from "~/shared/utils/pwa";
import { Button } from "./button";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(isPWA());

    // Listen for beforeinstallprompt event
    const handler = () => {
      if (!isPWA()) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) {
      setShowPrompt(false);
      setIsInstalled(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store in localStorage to not show again for a while
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  if (isInstalled || !showPrompt) {
    return null;
  }

  // Check if dismissed in last 7 days
  const dismissed = localStorage.getItem("pwa-prompt-dismissed");
  if (dismissed) {
    const daysSinceDismissed = (Date.now() - Number.parseInt(dismissed)) / (1000 * 60 * 60 * 24);
    if (daysSinceDismissed < 7) {
      return null;
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Download className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Install Flatmatch
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Install our app for a better experience with offline access and faster loading.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                variant="default"
              >
                Install
              </Button>
              <Button
                onClick={handleDismiss}
                size="sm"
                variant="ghost"
              >
                Not now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
