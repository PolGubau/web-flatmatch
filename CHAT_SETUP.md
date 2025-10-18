# Configuración del Chat en Supabase

## Pasos para configurar el chat en Supabase

### 1. Crear las tablas

Ejecuta el siguiente SQL en el SQL Editor de Supabase:

```sql
-- Tabla de conversaciones
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    participant_1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    participant_2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
    last_message_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- Asegurar que no haya conversaciones duplicadas
    CONSTRAINT unique_conversation UNIQUE (participant_1_id, participant_2_id),
    -- Asegurar que los participantes sean diferentes
    CONSTRAINT different_participants CHECK (participant_1_id != participant_2_id)
);

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT now(),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_conversations_participant_1 ON public.conversations(participant_1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_participant_2 ON public.conversations(participant_2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON public.conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON public.messages(sent_at DESC);
```

### 2. Configurar Row Level Security (RLS)

Ejecuta el siguiente SQL para habilitar RLS y crear las políticas:

```sql
-- Habilitar RLS en ambas tablas
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas para conversaciones
-- Los usuarios pueden ver conversaciones donde son participantes
CREATE POLICY "Users can view their own conversations" ON public.conversations
    FOR SELECT
    USING (
        auth.uid() = participant_1_id OR 
        auth.uid() = participant_2_id
    );

-- Los usuarios pueden crear nuevas conversaciones
CREATE POLICY "Users can create conversations" ON public.conversations
    FOR INSERT
    WITH CHECK (
        auth.uid() = participant_1_id OR 
        auth.uid() = participant_2_id
    );

-- Los usuarios pueden actualizar conversaciones donde son participantes
CREATE POLICY "Users can update their conversations" ON public.conversations
    FOR UPDATE
    USING (
        auth.uid() = participant_1_id OR 
        auth.uid() = participant_2_id
    );

-- Políticas para mensajes
-- Los usuarios pueden ver mensajes de sus conversaciones
CREATE POLICY "Users can view messages from their conversations" ON public.messages
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE id = messages.conversation_id
            AND (
                participant_1_id = auth.uid() OR 
                participant_2_id = auth.uid()
            )
        )
    );

-- Los usuarios pueden enviar mensajes a sus conversaciones
CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT
    WITH CHECK (
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE id = conversation_id
            AND (
                participant_1_id = auth.uid() OR 
                participant_2_id = auth.uid()
            )
        )
    );

-- Los usuarios pueden marcar sus mensajes como leídos
CREATE POLICY "Users can mark messages as read" ON public.messages
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE id = messages.conversation_id
            AND (
                participant_1_id = auth.uid() OR 
                participant_2_id = auth.uid()
            )
        )
    );
```

### 3. Configurar Realtime

Habilita Realtime para la tabla de mensajes:

1. Ve a `Database` > `Replication` en el panel de Supabase
2. Encuentra la tabla `messages`
3. Activa el switch para habilitar Realtime
4. Marca las opciones: `INSERT`, `UPDATE`, `DELETE`

O ejecuta este SQL:

```sql
-- Habilitar Realtime para mensajes
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
```

### 4. Función de actualización automática de updated_at

```sql
-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para la tabla conversations
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 5. Regenerar tipos de TypeScript

Después de crear las tablas, regenera los tipos de TypeScript:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/global/supabase/types.ts
```

O si estás usando Supabase CLI local:

```bash
npx supabase gen types typescript --local > src/global/supabase/types.ts
```

## Uso en la aplicación

### Iniciar una conversación desde el detalle de una room

Puedes añadir un botón "Enviar mensaje" en el componente de detalle de room:

```tsx
import { useGetOrCreateConversationMutation } from "~/features/chat/model/mutations/chat.mutations";
import { useNavigate } from "@remix-run/react";

function RoomDetail({ room }) {
  const navigate = useNavigate();
  const createConversation = useGetOrCreateConversationMutation();

  const handleStartChat = async () => {
    const conversationId = await createConversation.mutateAsync({
      otherUserId: room.ownerId,
      roomId: room.id,
    });
    navigate(`/chat?conversationId=${conversationId}`);
  };

  return (
    <button onClick={handleStartChat}>
      Enviar mensaje al propietario
    </button>
  );
}
```

## Características implementadas

✅ Lista de conversaciones con metadata (último mensaje, contador de no leídos)
✅ Ventana de chat con mensajes en tiempo real
✅ Envío de mensajes
✅ Marca mensajes como leídos automáticamente
✅ Subscripción a nuevos mensajes en tiempo real
✅ Avatar y nombre del otro participante
✅ Timestamps de mensajes
✅ UI responsive (móvil/desktop)
✅ Arquitectura hexagonal (entities, infra, model, ui)
✅ React Query para caché y sincronización
✅ Row Level Security para proteger datos

## Próximos pasos opcionales

- [ ] Indicador de "escribiendo..."
- [ ] Notificaciones push para nuevos mensajes
- [ ] Adjuntar imágenes a mensajes
- [ ] Eliminar conversaciones
- [ ] Buscar en mensajes
- [ ] Emojis y reacciones
- [ ] Mensajes de voz
