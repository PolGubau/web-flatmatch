import type { Review } from "src/entities/review/review";

export const mockReviews: Review[] = [
	{
		authorId: "user_1",
		comment: "Todo correcto, piso limpio y bien comunicado.",
		createdAt: new Date("2025-08-02"),
		id: "review_1",
		rating: 4,
		roomId: "room_1",
		targetUserId: "user_2",
	},
	{
		authorId: "user_2",
		comment: "Excelente experiencia, muy recomendable.",
		createdAt: new Date("2025-08-03"),
		id: "review_2",
		rating: 5,
		roomId: "room_1",
		targetUserId: "user_1",
	},
];
