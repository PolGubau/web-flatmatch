const domain = import.meta.env.VITE_DOMAIN
export function getRoomPath(roomId: string): string {
  return `${domain}/room/${roomId}`;
}