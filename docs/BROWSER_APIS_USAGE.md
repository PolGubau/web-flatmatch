# Browser APIs - Usage Guide

This document explains how to use the browser APIs implemented in Flatmatch.

## Available APIs

All browser APIs are exported from `~/shared/utils/browser-apis` for easy importing:

```typescript
import { 
  vibrateLike, 
  useNetworkStatus, 
  useBatteryStatus,
  // ... etc
} from "~/shared/utils/browser-apis";
```

---

## 1. 📳 Vibration API

Provides haptic feedback for user interactions (mobile devices).

### Basic Usage

```typescript
import { vibrate, VibrationPatterns, vibrateLike } from "~/shared/utils/browser-apis";

// Simple vibration
vibrate(100); // Vibrate for 100ms

// Pattern vibration
vibrate([100, 50, 100]); // Vibrate, pause, vibrate

// Predefined patterns
vibrateLike(); // Heart-beat pattern for likes
vibrateSuccess(); // Success feedback
vibrateError(); // Error feedback
```

### Patterns Available

- `VibrationPatterns.TAP` - Quick tap (10ms)
- `VibrationPatterns.SHORT` - Short feedback (50ms)
- `VibrationPatterns.MEDIUM` - Medium feedback (100ms)
- `VibrationPatterns.LONG` - Long feedback (200ms)
- `VibrationPatterns.SUCCESS` - Success pattern
- `VibrationPatterns.ERROR` - Error pattern
- `VibrationPatterns.NOTIFICATION` - Notification pattern
- `VibrationPatterns.LIKE` - Like/favorite pattern
- `VibrationPatterns.SWIPE` - Swipe pattern
- `VibrationPatterns.BUTTON` - Button press

### Example Integration

```typescript
const handleLike = () => {
  vibrateLike(); // Add haptic feedback
  likeRoom(roomId);
};
```

---

## 2. 📡 Network Information API

Monitor connection quality and adjust app behavior.

### Basic Usage

```typescript
import { useNetworkStatus, isSlowConnection, shouldReduceData } from "~/shared/utils/browser-apis";

function MyComponent() {
  const network = useNetworkStatus();

  if (!network.online) {
    return <OfflineMode />;
  }

  if (shouldReduceData(network)) {
    return <LowQualityImages />;
  }

  return <HighQualityContent />;
}
```

### Available Properties

```typescript
{
  online: boolean;              // Device is online
  downlink?: number;            // Estimated speed in Mbps
  rtt?: number;                 // Round-trip time in ms
  saveData?: boolean;           // Data saver enabled
  effectiveType?: EffectiveType; // '4g' | '3g' | '2g' | 'slow-2g'
  type?: ConnectionType;        // Actual connection type
}
```

### Helper Functions

```typescript
isSlowConnection(network.effectiveType); // true if 2g or slower
isFastConnection(network.effectiveType); // true if 4g
shouldReduceData(network); // Recommends reducing data usage
getNetworkStatusMessage(network); // User-friendly message
```

---

## 3. 🔋 Battery Status API

Monitor battery level and charging status.

### Basic Usage

```typescript
import { useBatteryStatus, isBatteryLow, shouldUsePowerSaving } from "~/shared/utils/browser-apis";

function MyComponent() {
  const battery = useBatteryStatus();

  if (shouldUsePowerSaving(battery)) {
    // Reduce animations, lower quality
  }

  return (
    <div>
      Battery: {getBatteryPercentage(battery.level)}
      {battery.charging && " (Charging)"}
    </div>
  );
}
```

### Available Properties

```typescript
{
  supported: boolean;         // API is supported
  level: number | null;       // Battery level (0-1)
  charging: boolean | null;   // Is charging
  chargingTime: number | null;      // Seconds until full
  dischargingTime: number | null;   // Seconds until empty
}
```

### Helper Functions

```typescript
isBatteryLow(level); // true if < 20%
isBatteryCritical(level); // true if < 10%
getBatteryPercentage(level); // Returns "75%"
shouldUsePowerSaving(battery); // Recommends power saving mode
```

---

## 4. 🔆 Screen Wake Lock API

Prevent screen from turning off.

### Basic Usage

```typescript
import { useWakeLock } from "~/shared/utils/browser-apis";

function PhotoViewer() {
  const [viewing, setViewing] = useState(false);
  const { isActive } = useWakeLock(viewing);

  return (
    <div>
      {isActive && <p>Screen will stay awake</p>}
      <button onClick={() => setViewing(true)}>View Photos</button>
    </div>
  );
}
```

### Manual Control

```typescript
const { request, release } = useWakeLock(false);

// Request wake lock manually
await request();

// Release wake lock manually
await release();
```

---

## 5. 📱 Device Orientation API

Detect device tilt and rotation.

### Basic Usage

```typescript
import { useDeviceOrientation, getCompassDirection } from "~/shared/utils/browser-apis";

function MapView() {
  const orientation = useDeviceOrientation(true);

  return (
    <div>
      <p>Facing: {getCompassDirection(orientation.alpha)}</p>
      <p>Tilt: {orientation.beta?.toFixed(0)}°</p>
    </div>
  );
}
```

### Available Properties

```typescript
{
  alpha: number | null;     // Compass direction (0-360°)
  beta: number | null;      // Forward/back tilt (-180 to 180°)
  gamma: number | null;     // Left/right tilt (-90 to 90°)
  absolute: boolean;        // Absolute orientation
  isSupported: boolean;     // API is supported
  hasPermission: boolean | null; // Permission status
}
```

### Helper Functions

```typescript
isLandscape(gamma); // Device is sideways
isPortrait(gamma); // Device is upright
isTiltedForward(beta); // Tilted forward
getCompassDirection(alpha); // "N", "NE", "E", etc.
normalizeOrientation(orientation); // Returns -1 to 1 values
```

---

## 6. 👁️ Page Visibility API

Detect when page is visible or hidden.

### Basic Usage

```typescript
import { usePageVisibility } from "~/shared/utils/browser-apis";

function LiveUpdates() {
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (!isVisible) {
      // Pause updates when tab is hidden
      return;
    }
    // Resume updates
  }, [isVisible]);

  return <div>Tab is {isVisible ? "visible" : "hidden"}</div>;
}
```

### With Callbacks

```typescript
import { usePageVisibilityChange } from "~/shared/utils/browser-apis";

usePageVisibilityChange(
  () => console.log("Tab became visible"),
  () => console.log("Tab became hidden")
);
```

---

## 7. 📢 Broadcast Channel API

Communication between browser tabs.

### Basic Usage

```typescript
import { useBroadcastChannel, BroadcastChannels } from "~/shared/utils/browser-apis";

// Tab 1: Send messages
function Sender() {
  const { postMessage } = useBroadcastChannel(BroadcastChannels.ROOMS);

  const handleLike = (roomId: string) => {
    postMessage({ type: "ROOM_FAVORITED", roomId });
  };

  return <button onClick={() => handleLike("123")}>Like</button>;
}

// Tab 2: Receive messages
function Receiver() {
  const { message } = useBroadcastChannel(BroadcastChannels.ROOMS);

  useEffect(() => {
    if (message?.type === "ROOM_FAVORITED") {
      console.log("Room liked in another tab:", message.roomId);
      // Update UI accordingly
    }
  }, [message]);

  return <div>Listening for updates...</div>;
}
```

### Available Channels

- `BroadcastChannels.AUTH` - Authentication changes
- `BroadcastChannels.ROOMS` - Room favorites/likes
- `BroadcastChannels.CHAT` - Chat messages
- `BroadcastChannels.PROFILE` - Profile updates
- `BroadcastChannels.APP` - General app state

---

## Demo Page

Visit `/browser-apis-demo` to see an interactive demonstration of all available APIs.

---

## Best Practices

1. **Always check for support** - All APIs gracefully fail on unsupported browsers
2. **Provide fallbacks** - Don't rely solely on browser APIs for critical functionality
3. **Respect user preferences** - Check for data saver mode and battery status
4. **Use vibration sparingly** - Too much haptic feedback can be annoying
5. **Clean up listeners** - All hooks properly clean up their event listeners

---

## Browser Support

| API | Chrome | Firefox | Safari | Edge |
|-----|--------|---------|--------|------|
| Vibration | ✅ | ✅ | ❌ | ✅ |
| Network Info | ✅ | ❌ | ❌ | ✅ |
| Battery | ✅* | ❌** | ❌ | ✅* |
| Wake Lock | ✅ | ❌ | ❌ | ✅ |
| Orientation | ✅ | ✅ | ✅*** | ✅ |
| Page Visibility | ✅ | ✅ | ✅ | ✅ |
| Broadcast | ✅ | ✅ | ✅ | ✅ |

\* Deprecated in some versions but still functional  
\*\* Removed from Firefox for privacy reasons  
\*\*\* Requires permission on iOS 13+

---

## Contributing

When adding new browser APIs:

1. Create a hook in `src/shared/hooks/`
2. Add utility functions if needed
3. Export from `src/shared/utils/browser-apis.ts`
4. Add documentation here
5. Update `BROWSER_APIS.md` with implementation details
6. Add example to demo page
