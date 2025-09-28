create type "public"."Gender" as enum ('male', 'prefer_not_to_say', 'female', 'other', 'unknown');

create type "public"."RentType" as enum ('shared-room', 'private-room', 'entire-flat');

create type "public"."room-action" as enum ('like', 'dislike');

create table "public"."room_images" (
    "id" uuid not null default gen_random_uuid(),
    "room_id" uuid,
    "url" text not null,
    "position" integer not null,
    "is_main" boolean default false
);


alter table "public"."room_images" enable row level security;

create table "public"."room_user_interactions" (
    "user_id" uuid not null,
    "room_id" uuid not null,
    "last_action_at" timestamp with time zone default now(),
    "action" "room-action" not null
);


alter table "public"."room_user_interactions" enable row level security;

create table "public"."room_verifications" (
    "id" uuid not null default gen_random_uuid(),
    "room_id" uuid,
    "verified_by" uuid not null,
    "verification_type" text not null,
    "date" timestamp with time zone not null default now(),
    "notes" text
);


create table "public"."rooms" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid not null default auth.uid(),
    "title" text not null,
    "description" text not null,
    "status" text not null default 'available'::text,
    "location" jsonb not null,
    "price" jsonb not null,
    "commodities" jsonb not null default '{}'::jsonb,
    "rules" jsonb not null default '{}'::jsonb,
    "timings" jsonb not null default '{}'::jsonb,
    "who_is_living" jsonb not null default '{}'::jsonb,
    "contact" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "preferences" jsonb not null,
    "images" jsonb,
    "rent_type" "RentType" not null default 'private-room'::"RentType"
);


alter table "public"."rooms" enable row level security;

create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "lastname" text not null,
    "email" text not null,
    "phone" text,
    "avatar_url" text,
    "birth_date" date,
    "gender" text,
    "occupation" text,
    "about_me" text,
    "languages_spoken" text[],
    "is_verified" jsonb not null default '{"email": false, "phone": false, "idCheck": false}'::jsonb,
    "preferences" jsonb,
    "auth_provider" text,
    "provider_id" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "email_confirmed_at" timestamp with time zone,
    "phone_confirmed_at" timestamp with time zone,
    "last_sign_in_at" timestamp with time zone,
    "encrypted_password" text,
    "confirmation_token" text,
    "confirmation_sent_at" timestamp with time zone,
    "recovery_token" text,
    "recovery_sent_at" timestamp with time zone,
    "email_change_token_current" text,
    "email_change" text,
    "email_change_sent_at" timestamp with time zone,
    "is_sso_user" boolean default false,
    "deleted_at" timestamp with time zone
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX room_images_pkey ON public.room_images USING btree (id);

CREATE UNIQUE INDEX room_verifications_pkey ON public.room_verifications USING btree (id);

CREATE UNIQUE INDEX rooms_pkey ON public.rooms USING btree (id);

CREATE UNIQUE INDEX user_saved_rooms_pkey ON public.room_user_interactions USING btree (user_id, room_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."room_images" add constraint "room_images_pkey" PRIMARY KEY using index "room_images_pkey";

alter table "public"."room_user_interactions" add constraint "user_saved_rooms_pkey" PRIMARY KEY using index "user_saved_rooms_pkey";

alter table "public"."room_verifications" add constraint "room_verifications_pkey" PRIMARY KEY using index "room_verifications_pkey";

alter table "public"."rooms" add constraint "rooms_pkey" PRIMARY KEY using index "rooms_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."room_images" add constraint "room_images_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE not valid;

alter table "public"."room_images" validate constraint "room_images_room_id_fkey";

alter table "public"."room_user_interactions" add constraint "user_saved_rooms_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE not valid;

alter table "public"."room_user_interactions" validate constraint "user_saved_rooms_room_id_fkey";

alter table "public"."room_user_interactions" add constraint "user_saved_rooms_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."room_user_interactions" validate constraint "user_saved_rooms_user_id_fkey";

alter table "public"."room_verifications" add constraint "room_verifications_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE not valid;

alter table "public"."room_verifications" validate constraint "room_verifications_room_id_fkey";

alter table "public"."room_verifications" add constraint "room_verifications_verification_type_check" CHECK ((verification_type = ANY (ARRAY['offline'::text, 'online'::text]))) not valid;

alter table "public"."room_verifications" validate constraint "room_verifications_verification_type_check";

alter table "public"."room_verifications" add constraint "room_verifications_verified_by_fkey" FOREIGN KEY (verified_by) REFERENCES users(id) not valid;

alter table "public"."room_verifications" validate constraint "room_verifications_verified_by_fkey";

alter table "public"."rooms" add constraint "rooms_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."rooms" validate constraint "rooms_owner_id_fkey";

alter table "public"."rooms" add constraint "rooms_status_check" CHECK ((status = ANY (ARRAY['available'::text, 'booked'::text, 'unlisted'::text]))) not valid;

alter table "public"."rooms" validate constraint "rooms_status_check";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_gender_check" CHECK ((gender = ANY (ARRAY['male'::text, 'female'::text, 'other'::text, 'prefer_not_to_say'::text]))) not valid;

alter table "public"."users" validate constraint "users_gender_check";

alter table "public"."users" add constraint "users_occupation_check" CHECK ((occupation = ANY (ARRAY['student'::text, 'employed'::text, 'unemployed'::text, 'other'::text]))) not valid;

alter table "public"."users" validate constraint "users_occupation_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
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
end;$function$
;

create or replace view "public"."rooms_with_metadata" as  SELECT r.id,
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
    i.action AS interaction_action,
    i.last_action_at AS interaction_last_action_at,
    i.user_id AS interaction_user_id,
    v.id AS verification_id,
    v.verified_by,
    v.verification_type,
    v.date AS verified_at,
    v.notes AS verification_notes
   FROM ((rooms r
     LEFT JOIN room_user_interactions i ON ((i.room_id = r.id)))
     LEFT JOIN room_verifications v ON ((v.room_id = r.id)));


CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."room_images" to "anon";

grant insert on table "public"."room_images" to "anon";

grant references on table "public"."room_images" to "anon";

grant select on table "public"."room_images" to "anon";

grant trigger on table "public"."room_images" to "anon";

grant truncate on table "public"."room_images" to "anon";

grant update on table "public"."room_images" to "anon";

grant delete on table "public"."room_images" to "authenticated";

grant insert on table "public"."room_images" to "authenticated";

grant references on table "public"."room_images" to "authenticated";

grant select on table "public"."room_images" to "authenticated";

grant trigger on table "public"."room_images" to "authenticated";

grant truncate on table "public"."room_images" to "authenticated";

grant update on table "public"."room_images" to "authenticated";

grant delete on table "public"."room_images" to "service_role";

grant insert on table "public"."room_images" to "service_role";

grant references on table "public"."room_images" to "service_role";

grant select on table "public"."room_images" to "service_role";

grant trigger on table "public"."room_images" to "service_role";

grant truncate on table "public"."room_images" to "service_role";

grant update on table "public"."room_images" to "service_role";

grant delete on table "public"."room_user_interactions" to "anon";

grant insert on table "public"."room_user_interactions" to "anon";

grant references on table "public"."room_user_interactions" to "anon";

grant select on table "public"."room_user_interactions" to "anon";

grant trigger on table "public"."room_user_interactions" to "anon";

grant truncate on table "public"."room_user_interactions" to "anon";

grant update on table "public"."room_user_interactions" to "anon";

grant delete on table "public"."room_user_interactions" to "authenticated";

grant insert on table "public"."room_user_interactions" to "authenticated";

grant references on table "public"."room_user_interactions" to "authenticated";

grant select on table "public"."room_user_interactions" to "authenticated";

grant trigger on table "public"."room_user_interactions" to "authenticated";

grant truncate on table "public"."room_user_interactions" to "authenticated";

grant update on table "public"."room_user_interactions" to "authenticated";

grant delete on table "public"."room_user_interactions" to "service_role";

grant insert on table "public"."room_user_interactions" to "service_role";

grant references on table "public"."room_user_interactions" to "service_role";

grant select on table "public"."room_user_interactions" to "service_role";

grant trigger on table "public"."room_user_interactions" to "service_role";

grant truncate on table "public"."room_user_interactions" to "service_role";

grant update on table "public"."room_user_interactions" to "service_role";

grant delete on table "public"."room_verifications" to "anon";

grant insert on table "public"."room_verifications" to "anon";

grant references on table "public"."room_verifications" to "anon";

grant select on table "public"."room_verifications" to "anon";

grant trigger on table "public"."room_verifications" to "anon";

grant truncate on table "public"."room_verifications" to "anon";

grant update on table "public"."room_verifications" to "anon";

grant delete on table "public"."room_verifications" to "authenticated";

grant insert on table "public"."room_verifications" to "authenticated";

grant references on table "public"."room_verifications" to "authenticated";

grant select on table "public"."room_verifications" to "authenticated";

grant trigger on table "public"."room_verifications" to "authenticated";

grant truncate on table "public"."room_verifications" to "authenticated";

grant update on table "public"."room_verifications" to "authenticated";

grant delete on table "public"."room_verifications" to "service_role";

grant insert on table "public"."room_verifications" to "service_role";

grant references on table "public"."room_verifications" to "service_role";

grant select on table "public"."room_verifications" to "service_role";

grant trigger on table "public"."room_verifications" to "service_role";

grant truncate on table "public"."room_verifications" to "service_role";

grant update on table "public"."room_verifications" to "service_role";

grant delete on table "public"."rooms" to "anon";

grant insert on table "public"."rooms" to "anon";

grant references on table "public"."rooms" to "anon";

grant select on table "public"."rooms" to "anon";

grant trigger on table "public"."rooms" to "anon";

grant truncate on table "public"."rooms" to "anon";

grant update on table "public"."rooms" to "anon";

grant delete on table "public"."rooms" to "authenticated";

grant insert on table "public"."rooms" to "authenticated";

grant references on table "public"."rooms" to "authenticated";

grant select on table "public"."rooms" to "authenticated";

grant trigger on table "public"."rooms" to "authenticated";

grant truncate on table "public"."rooms" to "authenticated";

grant update on table "public"."rooms" to "authenticated";

grant delete on table "public"."rooms" to "service_role";

grant insert on table "public"."rooms" to "service_role";

grant references on table "public"."rooms" to "service_role";

grant select on table "public"."rooms" to "service_role";

grant trigger on table "public"."rooms" to "service_role";

grant truncate on table "public"."rooms" to "service_role";

grant update on table "public"."rooms" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "user can manage saved rooms"
on "public"."room_user_interactions"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "anyone can read rooms"
on "public"."rooms"
as permissive
for select
to public
using (true);


create policy "owner can delete room"
on "public"."rooms"
as permissive
for delete
to public
using ((auth.uid() = owner_id));


create policy "owner can insert room"
on "public"."rooms"
as permissive
for insert
to public
with check ((auth.uid() = owner_id));


create policy "owner can update room"
on "public"."rooms"
as permissive
for update
to public
using ((auth.uid() = owner_id));


create policy "delete own user"
on "public"."users"
as permissive
for delete
to public
using ((id = auth.uid()));


create policy "select all users"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "update own user"
on "public"."users"
as permissive
for update
to public
using ((id = auth.uid()));


CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION set_updated_at();


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


  create policy "Anyone can view room images"
  on "storage"."objects"
  as permissive
  for select
  to public
using (true);



  create policy "Authenticated users can upload room images"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((auth.role() = 'authenticated'::text));



