export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "13.0.4";
	};
	public: {
		Tables: {
			room_images: {
				Row: {
					id: string;
					is_main: boolean | null;
					position: number;
					room_id: string | null;
					url: string;
				};
				Insert: {
					id?: string;
					is_main?: boolean | null;
					position: number;
					room_id?: string | null;
					url: string;
				};
				Update: {
					id?: string;
					is_main?: boolean | null;
					position?: number;
					room_id?: string | null;
					url?: string;
				};
				Relationships: [
					{
						foreignKeyName: "room_images_room_id_fkey";
						columns: ["room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
				];
			};
			rooms: {
				Row: {
					commodities: Json;
					contact: Json;
					created_at: string | null;
					description: string | null;
					id: string;
					is_verified: Json | null;
					location: Json;
					owner_id: string | null;
					price: Json;
					rent_type: string | null;
					rules: Json;
					status: string | null;
					timings: Json;
					title: string;
					updated_at: string | null;
					who_is_living: Json;
				};
				Insert: {
					commodities?: Json;
					contact?: Json;
					created_at?: string | null;
					description?: string | null;
					id?: string;
					is_verified?: Json | null;
					location: Json;
					owner_id?: string | null;
					price: Json;
					rent_type?: string | null;
					rules?: Json;
					status?: string | null;
					timings?: Json;
					title: string;
					updated_at?: string | null;
					who_is_living?: Json;
				};
				Update: {
					commodities?: Json;
					contact?: Json;
					created_at?: string | null;
					description?: string | null;
					id?: string;
					is_verified?: Json | null;
					location?: Json;
					owner_id?: string | null;
					price?: Json;
					rent_type?: string | null;
					rules?: Json;
					status?: string | null;
					timings?: Json;
					title?: string;
					updated_at?: string | null;
					who_is_living?: Json;
				};
				Relationships: [
					{
						foreignKeyName: "rooms_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			user_saved_rooms: {
				Row: {
					created_at: string | null;
					room_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					room_id: string;
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					room_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_saved_rooms_room_id_fkey";
						columns: ["room_id"];
						isOneToOne: false;
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_saved_rooms_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			users: {
				Row: {
					about_me: string | null;
					auth_provider: string | null;
					avatar_url: string | null;
					birth_date: string | null;
					created_at: string | null;
					email: string;
					gender: string | null;
					id: string;
					is_verified: Json;
					languages_spoken: string[] | null;
					lastname: string;
					name: string;
					occupation: string | null;
					phone: string | null;
					preferences: Json | null;
					provider_id: string | null;
					updated_at: string | null;
				};
				Insert: {
					about_me?: string | null;
					auth_provider?: string | null;
					avatar_url?: string | null;
					birth_date?: string | null;
					created_at?: string | null;
					email: string;
					gender?: string | null;
					id?: string;
					is_verified?: Json;
					languages_spoken?: string[] | null;
					lastname: string;
					name: string;
					occupation?: string | null;
					phone?: string | null;
					preferences?: Json | null;
					provider_id?: string | null;
					updated_at?: string | null;
				};
				Update: {
					about_me?: string | null;
					auth_provider?: string | null;
					avatar_url?: string | null;
					birth_date?: string | null;
					created_at?: string | null;
					email?: string;
					gender?: string | null;
					id?: string;
					is_verified?: Json;
					languages_spoken?: string[] | null;
					lastname?: string;
					name?: string;
					occupation?: string | null;
					phone?: string | null;
					preferences?: Json | null;
					provider_id?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
