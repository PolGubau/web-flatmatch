# Configuración del Sistema de Chat en Supabase

## 📋 Pasos a seguir

### 1. Aplicar las migraciones pendientes

Tienes 2 migraciones importantes para el chat:

```bash
# En tu terminal, desde la raíz del proyecto:

# Si estás en desarrollo local con Supabase local:
pnpm supabase migration up

# O si quieres aplicar a producción:
pnpm db:push
```

### 2. Verificar las migraciones aplicadas

Las migraciones que se aplicarán son:

#### **20251201000000_fix_chat_foreign_keys.sql**
- ✅ Corrige las foreign keys de `conversations` y `messages` para apuntar a `public.users` en vez de `auth.users`
- Esto permite que PostgREST pueda hacer joins correctamente

#### **20251218000000_chat_improvements.sql** (recién creada)
- ✅ Agrega el campo `receiver_id` a la tabla `messages`
- ✅ Configura todas las políticas de Row Level Security (RLS)
- ✅ Crea trigger para actualizar `updated_at` automáticamente
- ✅ Habilita Realtime para las tablas `conversations` y `messages`

### 3. Regenerar los tipos de TypeScript

Después de aplicar las migraciones, regenera los tipos:

```bash
pnpm gen:types
```

### 4. Verificar en Supabase Dashboard

Ve al Dashboard de Supabase y verifica:

1. **Tabla `conversations`:**
   - ✅ Tiene columnas: `id`, `participant_1_id`, `participant_2_id`, `room_id`, `last_message_at`, `created_at`, `updated_at`
   - ✅ Las foreign keys apuntan a `public.users`
   - ✅ Tiene políticas RLS habilitadas

2. **Tabla `messages`:**
   - ✅ Tiene columnas: `id`, `conversation_id`, `sender_id`, `receiver_id`, `content`, `sent_at`, `is_read`, `created_at`
   - ✅ Las foreign keys apuntan a `public.users`
   - ✅ Tiene políticas RLS habilitadas

3. **Realtime:**
   - ✅ En "Database" → "Replication", verifica que `conversations` y `messages` estén habilitadas

### 5. Probar el chat

Una vez aplicadas las migraciones:

1. Navega a `/chat` en tu aplicación
2. Deberías ver la lista de conversaciones (vacía si es primera vez)
3. Para crear una conversación, necesitas darle like a una habitación
4. Envía un mensaje y verifica que se guarda en la BD
5. Abre en otra pestaña con otro usuario y verifica que los mensajes llegan en tiempo real

## 🔍 Estructura final de la base de datos

### Tabla: `conversations`
```sql
- id (uuid, PK)
- participant_1_id (uuid, FK → public.users)
- participant_2_id (uuid, FK → public.users)
- room_id (uuid, FK → rooms) [opcional]
- last_message_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

### Tabla: `messages`
```sql
- id (uuid, PK)
- conversation_id (uuid, FK → conversations)
- sender_id (uuid, FK → public.users)
- receiver_id (uuid, FK → public.users)
- content (text)
- sent_at (timestamp)
- is_read (boolean)
- created_at (timestamp)
```

## 🔐 Políticas RLS configuradas

### Conversations:
- ✅ Los usuarios pueden ver conversaciones donde son participantes
- ✅ Los usuarios pueden crear conversaciones donde son participantes
- ✅ Los usuarios pueden actualizar sus conversaciones

### Messages:
- ✅ Los usuarios pueden ver mensajes de sus conversaciones
- ✅ Los usuarios pueden enviar mensajes en sus conversaciones
- ✅ Los usuarios pueden marcar como leídos mensajes que reciben

## 🚨 Troubleshooting

### Error: "Could not find a relationship"
- Asegúrate de que las foreign keys apunten a `public.users` (migración 20251201000000)
- Regenera los tipos con `pnpm gen:types`

### Los mensajes no llegan en tiempo real
- Verifica que Realtime esté habilitado en el Dashboard
- Verifica que las tablas estén en la publicación: `ALTER PUBLICATION supabase_realtime ADD TABLE messages;`

### Error de permisos (RLS)
- Verifica que las políticas RLS estén aplicadas correctamente
- En el Dashboard: Database → Policies
