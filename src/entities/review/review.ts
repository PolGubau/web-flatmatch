export interface Review {
	id: string;
	authorId: string;
	targetUserId?: string;
	roomId?: string;
	rating: number; // 1-5
	comment?: string;
	createdAt: Date;
}
