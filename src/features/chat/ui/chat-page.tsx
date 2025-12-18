import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useSession } from "~/shared/context/session-context";
import { useConversationsQuery } from "../model/queries/use-conversations.query";
import { ChatMessages } from "./chat-messages";
import { ConversationList } from "./conversation-list";
import { EmptyChatState } from "./empty-chat-state";

export default function ChatPage() {
  const { session } = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  // Leer conversationId de la URL al cargar
  useEffect(() => {
    const conversationIdFromUrl = searchParams.get("conversationId");
    if (conversationIdFromUrl) {
      setActiveConversationId(conversationIdFromUrl);
      // Limpiar el parámetro de la URL después de usarlo
      searchParams.delete("conversationId");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const { data: conversations = [] } = useConversationsQuery();
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-foreground/50">Debes iniciar sesión</p>
      </div>
    );
  }

  const userId = session.user.id;

  return (
    <div className="flex h-[calc(100vh-4rem)] max-h-[800px]">
      {/* Lista de conversaciones */}
      <div className="w-80 border-r border-border bg-card flex-shrink-0">
        <div className="p-4 border-b border-border/50">
          <h1 className="text-xl font-bold">Mensajes</h1>
        </div>
        <ConversationList
          activeConversationId={activeConversationId}
          currentUserId={userId}
          onSelectConversation={setActiveConversationId}
        />
      </div>

      {/* Chat activo */}
      <div className="flex-1 bg-background">
        {activeConversation ? (
          <ChatMessages
            conversationId={activeConversation.id}
            currentUserId={userId}
            otherUserName={activeConversation.otherParticipant.name}
          />
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}
