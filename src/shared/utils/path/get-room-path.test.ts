import { describe, it, expect, vi } from 'vitest';
import { getRoomPath } from './get-room-path';

describe('getRoomPath', () => {
   

  it('builds the room path using VITE_DOMAIN and the provided room id', async () => {
    import.meta.env.VITE_DOMAIN = 'https://example.com';
    vi.resetModules();
     expect(getRoomPath('abc123')).toBe('https://example.com/room/abc123');
  });

  it('captures the environment value at import time (does not change after)', async () => {
    import.meta.env.VITE_DOMAIN = 'https://first.com';
    vi.resetModules();
     expect(getRoomPath('room1')).toBe('https://first.com/room/room1');

    // Change env after import; constant should remain the same
    import.meta.env.VITE_DOMAIN = 'https://second.com';
    expect(getRoomPath('room2')).toBe('https://first.com/room/room2');
  });

  it('produces a double slash if VITE_DOMAIN ends with a slash (documents current behavior)', async () => {
    import.meta.env.VITE_DOMAIN = 'https://example.com/';
    vi.resetModules();
     expect(getRoomPath('xyz')).toBe('https://example.com//room/xyz');
  });
});