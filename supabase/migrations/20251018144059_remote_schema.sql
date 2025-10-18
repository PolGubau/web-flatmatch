drop extension if exists "pg_net";


  create table "public"."conversations" (
    "id" uuid not null default gen_random_uuid(),
    "participant_1_id" uuid not null,
    "participant_2_id" uuid not null,
    "room_id" uuid,
    "last_message_at" timestamp with time zone default now(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."conversations" enable row level security;


  create table "public"."messages" (
    "id" uuid not null default gen_random_uuid(),
    "conversation_id" uuid not null,
    "sender_id" uuid not null,
    "content" text not null,
    "sent_at" timestamp with time zone default now(),
    "is_read" boolean default false,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."messages" enable row level security;

CREATE UNIQUE INDEX conversations_pkey ON public.conversations USING btree (id);

CREATE INDEX idx_conversations_last_message ON public.conversations USING btree (last_message_at DESC);

CREATE INDEX idx_conversations_participant_1 ON public.conversations USING btree (participant_1_id);

CREATE INDEX idx_conversations_participant_2 ON public.conversations USING btree (participant_2_id);

CREATE INDEX idx_messages_conversation ON public.messages USING btree (conversation_id);

CREATE INDEX idx_messages_sender ON public.messages USING btree (sender_id);

CREATE INDEX idx_messages_sent_at ON public.messages USING btree (sent_at DESC);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX unique_conversation ON public.conversations USING btree (participant_1_id, participant_2_id);

alter table "public"."conversations" add constraint "conversations_pkey" PRIMARY KEY using index "conversations_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."conversations" add constraint "conversations_participant_1_id_fkey" FOREIGN KEY (participant_1_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."conversations" validate constraint "conversations_participant_1_id_fkey";

alter table "public"."conversations" add constraint "conversations_participant_2_id_fkey" FOREIGN KEY (participant_2_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."conversations" validate constraint "conversations_participant_2_id_fkey";

alter table "public"."conversations" add constraint "conversations_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL not valid;

alter table "public"."conversations" validate constraint "conversations_room_id_fkey";

alter table "public"."conversations" add constraint "different_participants" CHECK ((participant_1_id <> participant_2_id)) not valid;

alter table "public"."conversations" validate constraint "different_participants";

alter table "public"."conversations" add constraint "unique_conversation" UNIQUE using index "unique_conversation";

alter table "public"."messages" add constraint "messages_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_conversation_id_fkey";

alter table "public"."messages" add constraint "messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_sender_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.rooms_with_metadata(p_user_id uuid)
 RETURNS TABLE(id uuid, owner_id uuid, title text, description text, type text, status text, location jsonb, price jsonb, commodities jsonb, rules jsonb, timings jsonb, who_is_living jsonb, contact jsonb, created_at timestamp with time zone, updated_at timestamp with time zone, preferences jsonb, images jsonb, owner json, interaction json, verified json)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.rooms_with_metadata_for_user(p_user_id uuid)
 RETURNS TABLE(id uuid, owner_id uuid, title text, description text, type text, status text, location text, price numeric, commodities text[], rules text[], timings text[], who_is_living text[], contact text, created_at timestamp with time zone, updated_at timestamp with time zone, preferences jsonb, images text[], owner json, interaction json, verified json)
 LANGUAGE plpgsql
AS $function$BEGIN
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
END;$function$
;

grant delete on table "public"."conversations" to "anon";

grant insert on table "public"."conversations" to "anon";

grant references on table "public"."conversations" to "anon";

grant select on table "public"."conversations" to "anon";

grant trigger on table "public"."conversations" to "anon";

grant truncate on table "public"."conversations" to "anon";

grant update on table "public"."conversations" to "anon";

grant delete on table "public"."conversations" to "authenticated";

grant insert on table "public"."conversations" to "authenticated";

grant references on table "public"."conversations" to "authenticated";

grant select on table "public"."conversations" to "authenticated";

grant trigger on table "public"."conversations" to "authenticated";

grant truncate on table "public"."conversations" to "authenticated";

grant update on table "public"."conversations" to "authenticated";

grant delete on table "public"."conversations" to "service_role";

grant insert on table "public"."conversations" to "service_role";

grant references on table "public"."conversations" to "service_role";

grant select on table "public"."conversations" to "service_role";

grant trigger on table "public"."conversations" to "service_role";

grant truncate on table "public"."conversations" to "service_role";

grant update on table "public"."conversations" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";


  create policy "Users can create conversations"
  on "public"."conversations"
  as permissive
  for insert
  to public
with check (((auth.uid() = participant_1_id) OR (auth.uid() = participant_2_id)));



  create policy "Users can update their conversations"
  on "public"."conversations"
  as permissive
  for update
  to public
using (((auth.uid() = participant_1_id) OR (auth.uid() = participant_2_id)));



  create policy "Users can view their own conversations"
  on "public"."conversations"
  as permissive
  for select
  to public
using (((auth.uid() = participant_1_id) OR (auth.uid() = participant_2_id)));



  create policy "Users can mark messages as read"
  on "public"."messages"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.participant_1_id = auth.uid()) OR (conversations.participant_2_id = auth.uid()))))));



  create policy "Users can send messages"
  on "public"."messages"
  as permissive
  for insert
  to public
with check (((sender_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.participant_1_id = auth.uid()) OR (conversations.participant_2_id = auth.uid())))))));



  create policy "Users can view messages from their conversations"
  on "public"."messages"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.participant_1_id = auth.uid()) OR (conversations.participant_2_id = auth.uid()))))));


CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


