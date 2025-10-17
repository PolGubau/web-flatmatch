export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      room_images: {
        Row: {
          id: string
          is_main: boolean | null
          position: number
          room_id: string | null
          url: string
        }
        Insert: {
          id?: string
          is_main?: boolean | null
          position: number
          room_id?: string | null
          url: string
        }
        Update: {
          id?: string
          is_main?: boolean | null
          position?: number
          room_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_images_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_images_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms_with_metadata"
            referencedColumns: ["id"]
          },
        ]
      }
      room_user_interactions: {
        Row: {
          action: Database["public"]["Enums"]["room-action"]
          last_action_at: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["room-action"]
          last_action_at?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["room-action"]
          last_action_at?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_rooms_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_rooms_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms_with_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_rooms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      room_verifications: {
        Row: {
          date: string
          id: string
          notes: string | null
          room_id: string | null
          verification_type: string
          verified_by: string
        }
        Insert: {
          date?: string
          id?: string
          notes?: string | null
          room_id?: string | null
          verification_type: string
          verified_by: string
        }
        Update: {
          date?: string
          id?: string
          notes?: string | null
          room_id?: string | null
          verification_type?: string
          verified_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_verifications_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_verifications_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms_with_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          commodities: Json
          contact: Json
          created_at: string
          description: string
          id: string
          images: Json | null
          location: Json
          owner_id: string
          preferences: Json
          price: Json
          rent_type: Database["public"]["Enums"]["RentType"]
          rules: Json
          status: string
          timings: Json
          title: string
          updated_at: string
          who_is_living: Json
        }
        Insert: {
          commodities?: Json
          contact?: Json
          created_at?: string
          description: string
          id?: string
          images?: Json | null
          location: Json
          owner_id?: string
          preferences: Json
          price: Json
          rent_type?: Database["public"]["Enums"]["RentType"]
          rules?: Json
          status?: string
          timings?: Json
          title: string
          updated_at?: string
          who_is_living?: Json
        }
        Update: {
          commodities?: Json
          contact?: Json
          created_at?: string
          description?: string
          id?: string
          images?: Json | null
          location?: Json
          owner_id?: string
          preferences?: Json
          price?: Json
          rent_type?: Database["public"]["Enums"]["RentType"]
          rules?: Json
          status?: string
          timings?: Json
          title?: string
          updated_at?: string
          who_is_living?: Json
        }
        Relationships: [
          {
            foreignKeyName: "rooms_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          about_me: string | null
          auth_provider: string | null
          avatar_url: string | null
          birth_date: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          created_at: string | null
          deleted_at: string | null
          email: string
          email_change: string | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          gender: string | null
          id: string
          is_sso_user: boolean | null
          is_verified: Json
          languages_spoken: string[] | null
          last_sign_in_at: string | null
          lastname: string
          name: string
          occupation: string | null
          phone: string | null
          phone_confirmed_at: string | null
          preferences: Json | null
          provider_id: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          updated_at: string | null
        }
        Insert: {
          about_me?: string | null
          auth_provider?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email: string
          email_change?: string | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          gender?: string | null
          id?: string
          is_sso_user?: boolean | null
          is_verified?: Json
          languages_spoken?: string[] | null
          last_sign_in_at?: string | null
          lastname: string
          name: string
          occupation?: string | null
          phone?: string | null
          phone_confirmed_at?: string | null
          preferences?: Json | null
          provider_id?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          updated_at?: string | null
        }
        Update: {
          about_me?: string | null
          auth_provider?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          email_change?: string | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          gender?: string | null
          id?: string
          is_sso_user?: boolean | null
          is_verified?: Json
          languages_spoken?: string[] | null
          last_sign_in_at?: string | null
          lastname?: string
          name?: string
          occupation?: string | null
          phone?: string | null
          phone_confirmed_at?: string | null
          preferences?: Json | null
          provider_id?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      rooms_with_metadata: {
        Row: {
          commodities: Json | null
          contact: Json | null
          created_at: string | null
          description: string | null
          id: string | null
          images: Json | null
          interaction_action: Database["public"]["Enums"]["room-action"] | null
          interaction_last_action_at: string | null
          interaction_user_id: string | null
          location: Json | null
          owner_id: string | null
          preferences: Json | null
          price: Json | null
          rent_type: Database["public"]["Enums"]["RentType"] | null
          rules: Json | null
          status: string | null
          timings: Json | null
          title: string | null
          updated_at: string | null
          verification_id: string | null
          verification_notes: string | null
          verification_type: string | null
          verified_at: string | null
          verified_by: string | null
          who_is_living: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "room_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_rooms_user_id_fkey"
            columns: ["interaction_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      rooms_with_metadata: {
        Args: { p_user_id: string }
        Returns: {
          commodities: Json
          contact: Json
          created_at: string
          description: string
          id: string
          images: Json
          interaction: Json
          location: Json
          owner: Json
          owner_id: string
          preferences: Json
          price: Json
          rules: Json
          status: string
          timings: Json
          title: string
          type: string
          updated_at: string
          verified: Json
          who_is_living: Json
        }[]
      }
      rooms_with_metadata_for_user: {
        Args: { p_user_id: string }
        Returns: {
          commodities: string[]
          contact: string
          created_at: string
          description: string
          id: string
          images: string[]
          interaction: Json
          location: string
          owner: Json
          owner_id: string
          preferences: Json
          price: number
          rules: string[]
          status: string
          timings: string[]
          title: string
          type: string
          updated_at: string
          verified: Json
          who_is_living: string[]
        }[]
      }
    }
    Enums: {
      Gender: "male" | "female" | "non_binary" | "prefer_not_to_say"
      RentType: "shared-room" | "private-room" | "entire-flat"
      "room-action": "like" | "dislike"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      Gender: ["male", "female", "non_binary", "prefer_not_to_say"],
      RentType: ["shared-room", "private-room", "entire-flat"],
      "room-action": ["like", "dislike"],
    },
  },
} as const
