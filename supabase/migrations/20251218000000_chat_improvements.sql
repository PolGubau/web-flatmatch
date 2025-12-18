-- Mejoras para el sistema de chat
-- Agrega receiver_id a messages y configura Row Level Security

-- 1. Agregar receiver_id a la tabla messages si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'messages' 
        AND column_name = 'receiver_id'
    ) THEN
        ALTER TABLE "public"."messages" 
        ADD COLUMN "receiver_id" uuid;
        
        -- Agregar foreign key
        ALTER TABLE "public"."messages" 
        ADD CONSTRAINT "messages_receiver_id_fkey" 
        FOREIGN KEY (receiver_id) 
        REFERENCES "public"."users"(id) 
        ON DELETE CASCADE;
        
        -- Crear índice para mejorar performance
        CREATE INDEX IF NOT EXISTS idx_messages_receiver 
        ON public.messages USING btree (receiver_id);
    END IF;
END $$;

-- 2. Configurar Row Level Security para conversations
-- Los usuarios solo pueden ver conversaciones donde son participantes
DROP POLICY IF EXISTS "Users can view their own conversations" ON "public"."conversations";
CREATE POLICY "Users can view their own conversations"
ON "public"."conversations"
FOR SELECT
USING (
  auth.uid() = participant_1_id OR auth.uid() = participant_2_id
);

-- Los usuarios pueden crear conversaciones donde son uno de los participantes
DROP POLICY IF EXISTS "Users can create conversations" ON "public"."conversations";
CREATE POLICY "Users can create conversations"
ON "public"."conversations"
FOR INSERT
WITH CHECK (
  auth.uid() = participant_1_id OR auth.uid() = participant_2_id
);

-- Los usuarios pueden actualizar conversaciones donde son participantes
DROP POLICY IF EXISTS "Users can update their conversations" ON "public"."conversations";
CREATE POLICY "Users can update their conversations"
ON "public"."conversations"
FOR UPDATE
USING (
  auth.uid() = participant_1_id OR auth.uid() = participant_2_id
);

-- 3. Configurar Row Level Security para messages
-- Los usuarios pueden ver mensajes de sus conversaciones
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON "public"."messages";
CREATE POLICY "Users can view messages in their conversations"
ON "public"."messages"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
  )
);

-- Los usuarios pueden enviar mensajes en sus conversaciones
DROP POLICY IF EXISTS "Users can send messages in their conversations" ON "public"."messages";
CREATE POLICY "Users can send messages in their conversations"
ON "public"."messages"
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = conversation_id
    AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
  )
);

-- Los usuarios pueden actualizar el estado de lectura de mensajes que reciben
DROP POLICY IF EXISTS "Users can update read status of received messages" ON "public"."messages";
CREATE POLICY "Users can update read status of received messages"
ON "public"."messages"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
  )
  AND sender_id != auth.uid()
);

-- 4. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Crear trigger para actualizar updated_at en conversations
DROP TRIGGER IF EXISTS update_conversations_updated_at ON "public"."conversations";
CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON "public"."conversations"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. Habilitar Realtime para las tablas de chat (si no están ya habilitadas)
DO $$
BEGIN
    -- Agregar conversations si no está en la publicación
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'conversations'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
    END IF;
    
    -- Agregar messages si no está en la publicación
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'messages'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE messages;
    END IF;
END $$;
