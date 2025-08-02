import type { Review } from "src/entities/review/review";

export const mockReviews: Review[] = [
  {
    id: "review_1",
    authorId: "user_1",
    targetUserId: "user_2",
    roomId: "room_1",
    rating: 4,
    comment: "Todo correcto, piso limpio y bien comunicado.",
    createdAt: new Date("2025-08-02"),
  },
  {
    id: "review_2",
    authorId: "user_2",
    targetUserId: "user_1",
    roomId: "room_1",
    rating: 5,
    comment: "Excelente experiencia, muy recomendable.",
    createdAt: new Date("2025-08-03"),
  },
];
