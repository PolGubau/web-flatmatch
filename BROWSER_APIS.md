# Browser APIs Implementation Guide

This document lists interesting browser APIs that can enhance the Flatmatch web application experience.

## Currently Implemented APIs ✅

1. **Geolocation API** - Get user's current location for room search
   - File: `src/shared/hooks/use-geolocation.ts`
   - Use case: Finding nearby rooms

2. **Notifications API** - Push notifications for messages and updates
   - File: `src/shared/utils/pwa.ts`
   - Use case: Alert users about new messages or room matches

3. **Web Share API** - Native sharing of rooms
   - File: `src/features/room/ui/details/hooks/useRoomDetailsActions.ts`
   - Use case: Share room listings with friends

4. **Clipboard API** - Copy room links
   - File: `src/features/room/ui/details/hooks/useRoomDetailsActions.ts`
   - Use case: Fallback for sharing when Web Share API is not available

5. **Service Worker** - Offline functionality and background sync
   - File: `public/service-worker.js`
   - Use case: PWA capabilities, offline access

## New Browser APIs to Implement 🚀

### 1. Battery Status API
**Purpose**: Monitor device battery level and charging status

**Use Cases**:
- Reduce animations when battery is low
- Warn users before performing heavy operations (like uploading multiple photos)
- Adjust quality of images when battery is critical

**Browser Support**: Chrome, Firefox, Opera (deprecated in some browsers but still useful)

### 2. Network Information API
**Purpose**: Detect connection type and speed (4G, 3G, WiFi, slow-2g, etc.)

**Use Cases**:
- Load lower quality images on slow connections
- Disable auto-play videos on cellular connections
- Show warning before uploading large files on slow networks
- Prioritize critical data loading

**Browser Support**: Chrome, Edge, Opera, Samsung Internet

### 3. Vibration API
**Purpose**: Provide haptic feedback for user interactions

**Use Cases**:
- Vibrate when swiping on rooms (like/dislike)
- Haptic feedback when favoriting a room
- Vibrate on new message arrival
- Tactile feedback for important actions

**Browser Support**: Chrome, Firefox, Edge (Android)

### 4. Screen Wake Lock API
**Purpose**: Prevent screen from turning off

**Use Cases**:
- Keep screen awake while viewing room photos in slideshow
- Prevent sleep during active chat conversations
- Stay awake during video calls with room owners

**Browser Support**: Chrome, Edge, Opera

### 5. Device Orientation API
**Purpose**: Detect device tilt and rotation

**Use Cases**:
- Interactive room photos (tilt to see panoramic views)
- Enhanced map navigation (tilt to adjust perspective)
- Unique swipe animations based on device orientation

**Browser Support**: All modern browsers

### 6. Ambient Light Sensor API
**Purpose**: Detect ambient light levels

**Use Cases**:
- Auto-adjust theme based on surrounding light
- Suggest switching to dark mode in low light
- Optimize image brightness for viewing conditions

**Browser Support**: Limited (Chrome with flags)

### 7. Contact Picker API
**Purpose**: Access device contacts with user permission

**Use Cases**:
- Share room listings directly with contacts
- Invite friends to join Flatmatch
- Quick referral system

**Browser Support**: Chrome, Edge (Android)

### 8. File System Access API
**Purpose**: Read and write files to local file system

**Use Cases**:
- Export favorite rooms as JSON/CSV
- Save room search preferences locally
- Import/export user settings
- Download room details as PDF

**Browser Support**: Chrome, Edge, Opera

### 9. Web Speech API
**Purpose**: Speech recognition and synthesis

**Use Cases**:
- Voice search for rooms ("Find rooms in Barcelona under 500 euros")
- Accessibility: Read room descriptions aloud
- Voice messages in chat

**Browser Support**: Chrome, Edge, Safari

### 10. Picture-in-Picture API
**Purpose**: Display video in a floating window

**Use Cases**:
- Watch room tour videos while browsing other rooms
- Keep video call active while checking room details

**Browser Support**: Chrome, Edge, Safari, Firefox

### 11. Page Visibility API
**Purpose**: Detect when page is visible or hidden

**Use Cases**:
- Pause expensive operations when tab is hidden
- Update "last seen" status in chat
- Stop real-time updates when not viewing

**Browser Support**: All modern browsers

### 12. Broadcast Channel API
**Purpose**: Communication between tabs/windows

**Use Cases**:
- Sync state across multiple tabs
- Update room favorites in real-time across tabs
- Coordinate authentication state

**Browser Support**: Chrome, Edge, Firefox, Opera

## Implementation Priority

**High Priority** (Most impactful):
1. Vibration API - Enhance user feedback
2. Network Information API - Optimize performance
3. Screen Wake Lock API - Improve viewing experience
4. Page Visibility API - Better resource management

**Medium Priority**:
5. Battery Status API - Smart performance adjustments
6. Device Orientation API - Fun interactive features
7. File System Access API - Export functionality
8. Broadcast Channel API - Multi-tab sync

**Low Priority** (Nice to have):
9. Contact Picker API - Limited browser support
10. Web Speech API - Experimental feature
11. Ambient Light Sensor API - Very limited support
12. Picture-in-Picture API - Requires video content

## Implementation Guidelines

For each API:
1. ✅ Check browser support
2. ✅ Provide graceful fallbacks
3. ✅ Add TypeScript types
4. ✅ Create reusable hooks
5. ✅ Add error handling
6. ✅ Test on multiple devices
7. ✅ Document usage examples
8. ✅ Consider privacy implications
