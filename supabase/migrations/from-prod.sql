

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."Gender" AS ENUM (
    'male',
    'female',
    'non_binary',
    'prefer_not_to_say'
);


ALTER TYPE "public"."Gender" OWNER TO "postgres";


COMMENT ON TYPE "public"."Gender" IS 'Enum of genders';



CREATE TYPE "public"."RentType" AS ENUM (
    'shared-room',
    'private-room',
    'entire-flat'
);


ALTER TYPE "public"."RentType" OWNER TO "postgres";


COMMENT ON TYPE "public"."RentType" IS 'Types of possible renting';



CREATE TYPE "public"."room-action" AS ENUM (
    'like',
    'dislike'
);


ALTER TYPE "public"."room-action" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$begin
  insert into public.users (
    id,
    name,
    lastname,
    email,
    avatar_url,
    auth_provider,
    provider_id,
    is_verified,
    email_confirmed_at,
    phone_confirmed_at,
    last_sign_in_at,
    is_sso_user,
    created_at,
    updated_at
  )
  values (
    new.id,
    -- si no hay given_name/family_name, usamos full_name o vacío
    coalesce(new.raw_user_meta_data->>'given_name',
             split_part(new.raw_user_meta_data->>'full_name',' ',1),
             ''),
    coalesce(new.raw_user_meta_data->>'family_name',
             split_part(new.raw_user_meta_data->>'full_name',' ',2),
             ''),
    new.email,
   coalesce(
      new.raw_user_meta_data->>'avatar_url',
      regexp_replace(new.raw_user_meta_data->>'picture', '=s[0-9]+-c$', '=s512-c'),
      new.raw_user_meta_data->>'image',
      null
),

    coalesce(new.raw_app_meta_data->>'provider', 'credentials'),
    coalesce(new.raw_user_meta_data->>'provider_id',
             new.raw_user_meta_data->>'sub',
             null),
    jsonb_build_object(
      'email', coalesce(new.raw_user_meta_data->>'email_verified','false')::boolean,
      'phone', coalesce(new.raw_user_meta_data->>'phone_verified','false')::boolean,
      'idCheck', false
    ),
    -- timestamps
    case when new.raw_user_meta_data->>'email_verified' = 'true' then now() else null end,
    case when new.raw_user_meta_data->>'phone_verified' = 'true' then now() else null end,
    new.last_sign_in_at,
    coalesce(new.raw_app_meta_data->>'provider', null) is not null,
    now(),
    now()
  );
  return new;
end;$_$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid") RETURNS TABLE("id" "uuid", "owner_id" "uuid", "title" "text", "description" "text", "type" "text", "status" "text", "location" "jsonb", "price" "jsonb", "commodities" "jsonb", "rules" "jsonb", "timings" "jsonb", "who_is_living" "jsonb", "contact" "jsonb", "created_at" timestamp with time zone, "updated_at" timestamp with time zone, "preferences" "jsonb", "images" "jsonb", "owner" json, "interaction" json, "verified" json)
    LANGUAGE "plpgsql"
    AS $$
begin
  return query
  select
    r.id,
    r.owner_id,
    r.title,
    r.description,
    r.rent_type::text as type,
    r.status,
    r.location,
    r.price,
    r.commodities,
    r.rules,
    r.timings,
    r.who_is_living,
    r.contact,
    r.created_at,
    r.updated_at,
    r.preferences,
    r.images,
    json_build_object(
      'id', u.id,
      'name', u.name,
      'avatar', u.avatar_url
    ) as owner,
    json_build_object(
      'action', i.action,
      'last_action_at', i.last_action_at,
      'user_id', i.user_id
    ) as interaction,
    json_build_object(
      'id', v.id,
      'verified_by', v.verified_by,
      'verification_type', v.verification_type,
      'verified_at', v.date,
      'notes', v.notes
    ) as verified
  from rooms r
  left join users u on r.owner_id = u.id
  left join room_user_interactions i on i.room_id = r.id and i.user_id = p_user_id
  left join room_verifications v on v.room_id = r.id;
end;
$$;


ALTER FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid", "location" "text" DEFAULT NULL::"text", "min_price" numeric DEFAULT NULL::numeric, "max_price" numeric DEFAULT NULL::numeric, "page" integer DEFAULT 0) RETURNS SETOF "record"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query
  select
    r.id,
    r.owner_id,
    r.title,
    r.description,
    r.rent_type::text as type,
    r.status,
    r.location,
    r.price,
    r.commodities,
    r.rules,
    r.timings,
    r.who_is_living,
    r.contact,
    r.created_at,
    r.updated_at,
    r.preferences,
    r.images,
    json_build_object(
      'id', u.id,
      'name', u.name,
      'avatar', u.avatar_url
    ) as owner,
    json_build_object(
      'action', i.action,
      'last_action_at', i.last_action_at,
      'user_id', i.user_id
    ) as interaction,
    json_build_object(
      'id', v.id,
      'verified_by', v.verified_by,
      'verification_type', v.verification_type,
      'verified_at', v.date,
      'notes', v.notes
    ) as verified
  from rooms r
  left join users u on r.owner_id = u.id
  left join room_user_interactions i on i.room_id = r.id and i.user_id = p_user_id
  left join room_verifications v on v.room_id = r.id
  where 
    r.status = 'available'
    and r.owner_id <> p_user_id
    and (location is null or r.location ilike '%' || location || '%')
    and (min_price is null or r.price >= min_price)
    and (max_price is null or r.price <= max_price)
  order by r.created_at desc
  limit 10
  offset (page * 10);
end;
$$;


ALTER FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid", "location" "text", "min_price" numeric, "max_price" numeric, "page" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rooms_with_metadata_for_user"("p_user_id" "uuid") RETURNS TABLE("id" "uuid", "owner_id" "uuid", "title" "text", "description" "text", "type" "text", "status" "text", "location" "text", "price" numeric, "commodities" "text"[], "rules" "text"[], "timings" "text"[], "who_is_living" "text"[], "contact" "text", "created_at" timestamp with time zone, "updated_at" timestamp with time zone, "preferences" "jsonb", "images" "text"[], "owner" json, "interaction" json, "verified" json)
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.owner_id,
    r.title,
    r.description,
    r.rent_type,
    r.status,
    r.location,
    r.price,
    r.commodities,
    r.rules,
    r.timings,
    r.who_is_living,
    r.contact,
    r.created_at,
    r.updated_at,
    r.preferences,
    r.images,
    -- Owner anidado
    json_build_object(
      'id', u.id,
      'name', u.name,
      'avatar', u.avatar_url
    ) AS owner,
    -- Interacción solo del usuario actual
    json_build_object(
      'action', i.action,
      'last_action_at', i.last_action_at,
      'user_id', i.user_id
    ) AS interaction,
    -- Verified anidado
    json_build_object(
      'id', v.id,
      'verified_by', v.verified_by,
      'verification_type', v.verification_type,
      'verified_at', v.date,
      'notes', v.notes
    ) AS verified
  FROM rooms r
  LEFT JOIN users u ON r.owner_id = u.id
  LEFT JOIN room_user_interactions i
    ON i.room_id = r.id AND i.user_id = p_user_id
  LEFT JOIN room_verifications v ON v.room_id = r.id;
END;$$;


ALTER FUNCTION "public"."rooms_with_metadata_for_user"("p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."conversations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "participant_1_id" "uuid" NOT NULL,
    "participant_2_id" "uuid" NOT NULL,
    "room_id" "uuid",
    "last_message_at" timestamp with time zone DEFAULT "now"(),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "different_participants" CHECK (("participant_1_id" <> "participant_2_id"))
);


ALTER TABLE "public"."conversations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "conversation_id" "uuid" NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "content" "text" NOT NULL,
    "sent_at" timestamp with time zone DEFAULT "now"(),
    "is_read" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."room_images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "room_id" "uuid",
    "url" "text" NOT NULL,
    "position" integer NOT NULL,
    "is_main" boolean DEFAULT false
);


ALTER TABLE "public"."room_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."room_user_interactions" (
    "user_id" "uuid" NOT NULL,
    "room_id" "uuid" NOT NULL,
    "last_action_at" timestamp with time zone DEFAULT "now"(),
    "action" "public"."room-action" NOT NULL
);


ALTER TABLE "public"."room_user_interactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."room_verifications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "room_id" "uuid",
    "verified_by" "uuid" NOT NULL,
    "verification_type" "text" NOT NULL,
    "date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "notes" "text",
    CONSTRAINT "room_verifications_verification_type_check" CHECK (("verification_type" = ANY (ARRAY['offline'::"text", 'online'::"text"])))
);


ALTER TABLE "public"."room_verifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."rooms" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "status" "text" DEFAULT 'available'::"text" NOT NULL,
    "location" "jsonb" NOT NULL,
    "price" "jsonb" NOT NULL,
    "commodities" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "rules" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "timings" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "who_is_living" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "contact" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "preferences" "jsonb" NOT NULL,
    "images" "jsonb",
    "rent_type" "public"."RentType" DEFAULT 'private-room'::"public"."RentType" NOT NULL,
    CONSTRAINT "rooms_status_check" CHECK (("status" = ANY (ARRAY['available'::"text", 'booked'::"text", 'unlisted'::"text"])))
);


ALTER TABLE "public"."rooms" OWNER TO "postgres";


COMMENT ON COLUMN "public"."rooms"."preferences" IS 'What the creator expects fo find as tenants for this room';



CREATE OR REPLACE VIEW "public"."rooms_with_metadata" AS
 SELECT "r"."id",
    "r"."owner_id",
    "r"."title",
    "r"."description",
    "r"."rent_type",
    "r"."status",
    "r"."location",
    "r"."price",
    "r"."commodities",
    "r"."rules",
    "r"."timings",
    "r"."who_is_living",
    "r"."contact",
    "r"."created_at",
    "r"."updated_at",
    "r"."preferences",
    "r"."images",
    "i"."action" AS "interaction_action",
    "i"."last_action_at" AS "interaction_last_action_at",
    "i"."user_id" AS "interaction_user_id",
    "v"."id" AS "verification_id",
    "v"."verified_by",
    "v"."verification_type",
    "v"."date" AS "verified_at",
    "v"."notes" AS "verification_notes"
   FROM (("public"."rooms" "r"
     LEFT JOIN "public"."room_user_interactions" "i" ON (("i"."room_id" = "r"."id")))
     LEFT JOIN "public"."room_verifications" "v" ON (("v"."room_id" = "r"."id")));


ALTER VIEW "public"."rooms_with_metadata" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "lastname" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "avatar_url" "text",
    "birth_date" "date",
    "gender" "text",
    "occupation" "text",
    "about_me" "text",
    "languages_spoken" "text"[],
    "is_verified" "jsonb" DEFAULT '{"email": false, "phone": false, "idCheck": false}'::"jsonb" NOT NULL,
    "preferences" "jsonb",
    "auth_provider" "text",
    "provider_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "email_confirmed_at" timestamp with time zone,
    "phone_confirmed_at" timestamp with time zone,
    "last_sign_in_at" timestamp with time zone,
    "encrypted_password" "text",
    "confirmation_token" "text",
    "confirmation_sent_at" timestamp with time zone,
    "recovery_token" "text",
    "recovery_sent_at" timestamp with time zone,
    "email_change_token_current" "text",
    "email_change" "text",
    "email_change_sent_at" timestamp with time zone,
    "is_sso_user" boolean DEFAULT false,
    "deleted_at" timestamp with time zone,
    CONSTRAINT "users_gender_check" CHECK (("gender" = ANY (ARRAY['male'::"text", 'female'::"text", 'other'::"text", 'prefer_not_to_say'::"text"]))),
    CONSTRAINT "users_occupation_check" CHECK (("occupation" = ANY (ARRAY['student'::"text", 'employed'::"text", 'unemployed'::"text", 'other'::"text"])))
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "conversations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."room_images"
    ADD CONSTRAINT "room_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."room_verifications"
    ADD CONSTRAINT "room_verifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."rooms"
    ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "unique_conversation" UNIQUE ("participant_1_id", "participant_2_id");



ALTER TABLE ONLY "public"."room_user_interactions"
    ADD CONSTRAINT "user_saved_rooms_pkey" PRIMARY KEY ("user_id", "room_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_conversations_last_message" ON "public"."conversations" USING "btree" ("last_message_at" DESC);



CREATE INDEX "idx_conversations_participant_1" ON "public"."conversations" USING "btree" ("participant_1_id");



CREATE INDEX "idx_conversations_participant_2" ON "public"."conversations" USING "btree" ("participant_2_id");



CREATE INDEX "idx_messages_conversation" ON "public"."messages" USING "btree" ("conversation_id");



CREATE INDEX "idx_messages_sender" ON "public"."messages" USING "btree" ("sender_id");



CREATE INDEX "idx_messages_sent_at" ON "public"."messages" USING "btree" ("sent_at" DESC);



CREATE OR REPLACE TRIGGER "set_timestamp" BEFORE UPDATE ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "update_conversations_updated_at" BEFORE UPDATE ON "public"."conversations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "conversations_participant_1_id_fkey" FOREIGN KEY ("participant_1_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "conversations_participant_2_id_fkey" FOREIGN KEY ("participant_2_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "conversations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."room_images"
    ADD CONSTRAINT "room_images_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."room_verifications"
    ADD CONSTRAINT "room_verifications_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."room_verifications"
    ADD CONSTRAINT "room_verifications_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."rooms"
    ADD CONSTRAINT "rooms_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."room_user_interactions"
    ADD CONSTRAINT "user_saved_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."room_user_interactions"
    ADD CONSTRAINT "user_saved_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Users can create conversations" ON "public"."conversations" FOR INSERT WITH CHECK ((("auth"."uid"() = "participant_1_id") OR ("auth"."uid"() = "participant_2_id")));



CREATE POLICY "Users can mark messages as read" ON "public"."messages" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."conversations"
  WHERE (("conversations"."id" = "messages"."conversation_id") AND (("conversations"."participant_1_id" = "auth"."uid"()) OR ("conversations"."participant_2_id" = "auth"."uid"()))))));



CREATE POLICY "Users can send messages" ON "public"."messages" FOR INSERT WITH CHECK ((("sender_id" = "auth"."uid"()) AND (EXISTS ( SELECT 1
   FROM "public"."conversations"
  WHERE (("conversations"."id" = "messages"."conversation_id") AND (("conversations"."participant_1_id" = "auth"."uid"()) OR ("conversations"."participant_2_id" = "auth"."uid"())))))));



CREATE POLICY "Users can update their conversations" ON "public"."conversations" FOR UPDATE USING ((("auth"."uid"() = "participant_1_id") OR ("auth"."uid"() = "participant_2_id")));



CREATE POLICY "Users can view messages from their conversations" ON "public"."messages" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."conversations"
  WHERE (("conversations"."id" = "messages"."conversation_id") AND (("conversations"."participant_1_id" = "auth"."uid"()) OR ("conversations"."participant_2_id" = "auth"."uid"()))))));



CREATE POLICY "Users can view their own conversations" ON "public"."conversations" FOR SELECT USING ((("auth"."uid"() = "participant_1_id") OR ("auth"."uid"() = "participant_2_id")));



CREATE POLICY "anyone can read rooms" ON "public"."rooms" FOR SELECT USING (true);



ALTER TABLE "public"."conversations" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "delete own user" ON "public"."users" FOR DELETE USING (("id" = "auth"."uid"()));



ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "owner can delete room" ON "public"."rooms" FOR DELETE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "owner can insert room" ON "public"."rooms" FOR INSERT WITH CHECK (("auth"."uid"() = "owner_id"));



CREATE POLICY "owner can update room" ON "public"."rooms" FOR UPDATE USING (("auth"."uid"() = "owner_id"));



ALTER TABLE "public"."room_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."room_user_interactions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."rooms" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "select all users" ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "update own user" ON "public"."users" FOR UPDATE USING (("id" = "auth"."uid"()));



CREATE POLICY "user can manage saved rooms" ON "public"."room_user_interactions" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."messages";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid", "location" "text", "min_price" numeric, "max_price" numeric, "page" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid", "location" "text", "min_price" numeric, "max_price" numeric, "page" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."rooms_with_metadata"("p_user_id" "uuid", "location" "text", "min_price" numeric, "max_price" numeric, "page" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."rooms_with_metadata_for_user"("p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."rooms_with_metadata_for_user"("p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."rooms_with_metadata_for_user"("p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."conversations" TO "anon";
GRANT ALL ON TABLE "public"."conversations" TO "authenticated";
GRANT ALL ON TABLE "public"."conversations" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."room_images" TO "anon";
GRANT ALL ON TABLE "public"."room_images" TO "authenticated";
GRANT ALL ON TABLE "public"."room_images" TO "service_role";



GRANT ALL ON TABLE "public"."room_user_interactions" TO "anon";
GRANT ALL ON TABLE "public"."room_user_interactions" TO "authenticated";
GRANT ALL ON TABLE "public"."room_user_interactions" TO "service_role";



GRANT ALL ON TABLE "public"."room_verifications" TO "anon";
GRANT ALL ON TABLE "public"."room_verifications" TO "authenticated";
GRANT ALL ON TABLE "public"."room_verifications" TO "service_role";



GRANT ALL ON TABLE "public"."rooms" TO "anon";
GRANT ALL ON TABLE "public"."rooms" TO "authenticated";
GRANT ALL ON TABLE "public"."rooms" TO "service_role";



GRANT ALL ON TABLE "public"."rooms_with_metadata" TO "anon";
GRANT ALL ON TABLE "public"."rooms_with_metadata" TO "authenticated";
GRANT ALL ON TABLE "public"."rooms_with_metadata" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
