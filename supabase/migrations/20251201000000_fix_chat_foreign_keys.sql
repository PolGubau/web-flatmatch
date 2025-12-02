-- Fix foreign keys to point to public.users instead of auth.users
-- This allows PostgREST to properly join conversations with user data

-- Drop old foreign keys that reference auth.users
ALTER TABLE "public"."conversations" DROP CONSTRAINT IF EXISTS "conversations_participant_1_id_fkey";
ALTER TABLE "public"."conversations" DROP CONSTRAINT IF EXISTS "conversations_participant_2_id_fkey";
ALTER TABLE "public"."messages" DROP CONSTRAINT IF EXISTS "messages_sender_id_fkey";

-- Add new foreign keys that reference public.users
ALTER TABLE "public"."conversations" 
  ADD CONSTRAINT "conversations_participant_1_id_fkey" 
  FOREIGN KEY (participant_1_id) 
  REFERENCES "public"."users"(id) 
  ON DELETE CASCADE;

ALTER TABLE "public"."conversations" 
  ADD CONSTRAINT "conversations_participant_2_id_fkey" 
  FOREIGN KEY (participant_2_id) 
  REFERENCES "public"."users"(id) 
  ON DELETE CASCADE;

ALTER TABLE "public"."messages" 
  ADD CONSTRAINT "messages_sender_id_fkey" 
  FOREIGN KEY (sender_id) 
  REFERENCES "public"."users"(id) 
  ON DELETE CASCADE;
