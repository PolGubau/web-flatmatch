import z from "zod";

export const VerificationSchema = z.object({
	date: z.coerce.date().optional(),
	id: z.uuid(),
	notes: z.string().optional(),
	room_id: z.uuid(),
	status: z.boolean(),
	verification_type: z.enum(["online", "offline"]).optional(),
	verifiedBy: z.uuid(),
});

export type RoomVerification = z.infer<typeof VerificationSchema>;
