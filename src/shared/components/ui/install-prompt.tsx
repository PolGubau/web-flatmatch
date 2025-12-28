import { Download, Share } from "lucide-react";
import { useEffect, useState } from "react";
import { isIOS, isIOSSafari, isPWA, promptInstall } from "~/shared/utils/pwa";
import { Button } from "./button";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAppleDevice, setIsAppleDevice] = useState(false);

  useEffect(() => {
    setIsInstalled(isPWA());
    setIsAppleDevice(isIOS());

    // For Android/Chrome - listen for beforeinstallprompt
    const handler = () => {
      if (!isPWA() && !isIOS()) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // For iOS - show prompt if in Safari and not installed
    if (isIOSSafari() && !isPWA()) {
      // Check if dismissed recently
      const dismissed = localStorage.getItem("pwa-prompt-dismissed-ios");
      if (dismissed) {
        const daysSinceDismissed =
          (Date.now() - Number.parseInt(dismissed)) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed >= 7) {
          setShowPrompt(true);
        }
      } else {
        // Show after 30 seconds on iOS to not be too intrusive
        setTimeout(() => {
          if (!isPWA()) {
            setShowPrompt(true);
          }
        }, 30000);
      }
    }

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
    const storageKey = isAppleDevice
      ? "pwa-prompt-dismissed-ios"
      : "pwa-prompt-dismissed";
    localStorage.setItem(storageKey, Date.now().toString());
  };

  // Don't show if already installed
  if (isInstalled || !showPrompt) {
    return null;
  }

  // Check if dismissed in last 7 days (for Android)
  if (!isAppleDevice) {
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      const daysSinceDismissed =
        (Date.now() - Number.parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return null;
      }
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            {isAppleDevice ? (
              <Share className="w-5 h-5 text-primary" />
            ) : (
              <Download className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Install Flatmatch
            </h3>
            {isAppleDevice ? (
              <div className="text-sm text-muted-foreground mb-3 space-y-2">
                <p>Install our app for a better experience:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>
                    Tap the Share button <Share className="inline w-3 h-3" /> at
                    the bottom
                  </li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add" in the top right corner</li>
                </ol>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-3">
                Install our app for a better experience with offline access and
                faster loading.
              </p>
            )}
            <div className="flex gap-2">
              {!isAppleDevice && (
                <Button onClick={handleInstall} size="sm" variant="default">
                  Install
                </Button>
              )}
              <Button onClick={handleDismiss} size="sm" variant="ghost">
                Not now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
