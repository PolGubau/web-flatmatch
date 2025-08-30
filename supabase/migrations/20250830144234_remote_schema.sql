

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
    'prefer_not_to_say',
    'female',
    'other',
    'unknown'
);


ALTER TYPE "public"."Gender" OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


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
    "rent_type" "text" DEFAULT '''room''::text'::"text" NOT NULL,
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
    CONSTRAINT "rooms_rent_type_check" CHECK (("rent_type" = ANY (ARRAY['room'::"text", 'shared'::"text", 'entire'::"text"]))),
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


ALTER TABLE ONLY "public"."room_images"
    ADD CONSTRAINT "room_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."room_verifications"
    ADD CONSTRAINT "room_verifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."rooms"
    ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."room_user_interactions"
    ADD CONSTRAINT "user_saved_rooms_pkey" PRIMARY KEY ("user_id", "room_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "set_timestamp" BEFORE UPDATE ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



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



CREATE POLICY "anyone can read rooms" ON "public"."rooms" FOR SELECT USING (true);



CREATE POLICY "delete own user" ON "public"."users" FOR DELETE USING (("id" = "auth"."uid"()));



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


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";


















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
