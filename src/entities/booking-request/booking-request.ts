export interface BookingRequest {
  id: string;
  roomId: string;
  tenantId: string;
  ownerId: string;
  createdAt: Date;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  message?: string;
  answer?: string;
  moveInDate: Date;
  expectedDuration: {
    unit: "month" | "year";
    value: number;
  };
}
