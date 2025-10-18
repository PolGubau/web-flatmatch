# 📱 Feature Chat - Implementación Completa

## ✅ Archivos creados

### **Entities** (Modelos de dominio)
- ✅ `src/entities/message/conversation.ts` - Interfaces de Conversation y ConversationWithMetadata
- ✅ `src/entities/message/message.ts` - Ya existía

### **Infraestructura** (Capa de datos)
- ✅ `src/features/chat/infra/chat-api.ts` - API calls a Supabase (getConversations, getMessages, sendMessage, markAsRead, subscribeToMessages)
- ✅ `src/features/chat/types/dtos.ts` - DTOs y mappers de BD a dominio

### **Modelo** (Lógica de negocio)
- ✅ `src/features/chat/model/services/chat.service.ts` - Servicios de conversaciones y mensajes
- ✅ `src/features/chat/model/queries/conversations.query.ts` - Query para lista de conversaciones
- ✅ `src/features/chat/model/queries/messages.query.ts` - Query para mensajes con suscripción realtime
- ✅ `src/features/chat/model/mutations/chat.mutations.ts` - Mutaciones (enviar mensaje, marcar como leído, crear conversación)

### **UI** (Componentes visuales)
- ✅ `src/features/chat/ui/conversation-list.tsx` - Lista de conversaciones con búsqueda
- ✅ `src/features/chat/ui/conversation-item.tsx` - Item individual de conversación
- ✅ `src/features/chat/ui/chat-window.tsx` - Ventana principal de chat con mensajes
- ✅ `src/features/chat/ui/message-bubble.tsx` - Burbuja de mensaje individual
- ✅ `src/features/chat/ui/start-chat-button.tsx` - Botón para iniciar chat desde room details

### **Página**
- ✅ `app/routes/chat.tsx` - Página principal de chat actualizada

### **Exportaciones**
- ✅ `src/features/chat/index.ts` - Barrel export de componentes y hooks

### **Documentación**
- ✅ `CHAT_SETUP.md` - Instrucciones completas de configuración en Supabase

## 🎯 Funcionalidades implementadas

### Core
- [x] **Lista de conversaciones** con último mensaje, tiempo relativo y contador de no leídos
- [x] **Ventana de chat** con scroll automático y mensajes propios/ajenos diferenciados
- [x] **Envío de mensajes** en tiempo real
- [x] **Recepción de mensajes** con Supabase Realtime
- [x] **Marcar mensajes como leídos** automáticamente al abrir conversación
- [x] **Crear conversación** desde cualquier lugar (botón en room details)
- [x] **Query params** para abrir conversaciones directamente (`/chat?conversation=xxx`)

### UX
- [x] Loading states en todos los componentes
- [x] Empty states cuando no hay conversaciones/mensajes
- [x] Avatars con iniciales si no hay imagen
- [x] Timestamps relativos (hace 5 min, hace 2 horas, etc.)
- [x] Diseño responsive (móvil/desktop)
- [x] Contador de mensajes no leídos en badge
- [x] Indicador visual de conversación activa
- [x] Disabled states en botones mientras se envían mensajes

### Arquitectura
- [x] **Arquitectura hexagonal** (entities → infra → model → ui)
- [x] **React Query** para caché, invalidación y sincronización
- [x] **Realtime subscriptions** con cleanup automático
- [x] **Type safety** completo con TypeScript
- [x] **Row Level Security** (políticas en SQL)

## 📋 Pasos para activar el chat

### 1. Ejecutar SQL en Supabase

Abre el **SQL Editor** en tu proyecto de Supabase y ejecuta el script completo que está en `CHAT_SETUP.md`, sección "1. Crear las tablas"

### 2. Configurar RLS

Ejecuta el segundo bloque SQL de `CHAT_SETUP.md`, sección "2. Configurar Row Level Security (RLS)"

### 3. Habilitar Realtime

Opción A: Desde el dashboard
- Ve a `Database` → `Replication`
- Busca la tabla `messages`
- Activa el switch de Realtime
- Marca: INSERT, UPDATE, DELETE

Opción B: Ejecuta el SQL de la sección "3. Configurar Realtime" en `CHAT_SETUP.md`

### 4. Regenerar tipos de TypeScript

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/global/supabase/types.ts
```

O con CLI local:
```bash
npx supabase gen types typescript --local > src/global/supabase/types.ts
```

### 5. (Opcional) Añadir botón de chat en room details

Ejemplo de uso en cualquier componente donde tengas una room:

```tsx
import { StartChatButton } from "~/features/chat";

function RoomDetail({ room }) {
  return (
    <div>
      {/* ...otros detalles de la room */}
      <StartChatButton
        ownerId={room.ownerId}
        roomId={room.id}
        ownerName={room.contact.owner.name}
      />
    </div>
  );
}
```

## 🚀 Uso

### Navegar al chat
```
/chat
```

### Abrir conversación específica
```
/chat?conversation=uuid-de-conversacion
```

### Iniciar chat desde código
```tsx
import { useGetOrCreateConversationMutation } from "~/features/chat";

const createConv = useGetOrCreateConversationMutation();
const conversationId = await createConv.mutateAsync({
  otherUserId: "user-id",
  roomId: "room-id" // opcional
});
navigate(\`/chat?conversation=\${conversationId}\`);
```

## 🎨 Personalización

### Colores
Los componentes usan las variables CSS del proyecto:
- `bg-primary` para mensajes propios
- `bg-neutral-200/dark:bg-neutral-700` para mensajes recibidos
- `text-foreground` para texto principal

### Iconos
Usa `@hugeicons/react`:
- `Message01Icon` - Icono de mensaje
- `Loading01Icon` - Loading spinner
- `Sent02Icon` - Icono de enviar

## 🔒 Seguridad

✅ **Row Level Security (RLS)** habilitado en todas las tablas
✅ Solo los participantes pueden ver sus conversaciones
✅ Solo los participantes pueden enviar mensajes
✅ Los mensajes se filtran automáticamente por permisos
✅ No se puede acceder a conversaciones de otros usuarios

## 📊 Base de datos

### Tabla: `conversations`
- `id` (UUID, PK)
- `participant_1_id` (UUID, FK → users)
- `participant_2_id` (UUID, FK → users)
- `room_id` (UUID, FK → rooms, nullable)
- `last_message_at` (TIMESTAMPTZ)
- `created_at`, `updated_at` (TIMESTAMPTZ)
- **Constraint**: participantes únicos y diferentes

### Tabla: `messages`
- `id` (UUID, PK)
- `conversation_id` (UUID, FK → conversations)
- `sender_id` (UUID, FK → users)
- `content` (TEXT)
- `sent_at` (TIMESTAMPTZ)
- `is_read` (BOOLEAN)
- `created_at` (TIMESTAMPTZ)

### Índices creados
- `idx_conversations_participant_1`
- `idx_conversations_participant_2`
- `idx_conversations_last_message`
- `idx_messages_conversation`
- `idx_messages_sender`
- `idx_messages_sent_at`

## 🐛 Troubleshooting

### Error: "conversations table does not exist"
→ Ejecuta el SQL de creación de tablas en Supabase

### Los mensajes no llegan en tiempo real
→ Verifica que Realtime esté habilitado para la tabla `messages`

### Errores de tipos TypeScript
→ Regenera los tipos con `npx supabase gen types typescript`

### No puedo ver conversaciones de otros usuarios
→ Correcto, RLS está funcionando. Solo ves tus propias conversaciones.

## 📚 Dependencias necesarias

Ya están instaladas en el proyecto:
- ✅ `@tanstack/react-query` - Manejo de estado y caché
- ✅ `@supabase/supabase-js` - Cliente de Supabase
- ✅ `date-fns` - Formateo de fechas
- ✅ `react-router` - Navegación
- ✅ `@hugeicons/react` - Iconos

## 🎉 ¡Listo!

Después de seguir los pasos de configuración en Supabase, tu chat estará completamente funcional con mensajería en tiempo real, notificaciones de mensajes no leídos, y una UI profesional.
