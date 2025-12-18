import { t } from "i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Drawer } from "~/shared/components/ui/drawer";
import { useSession } from "~/shared/context/session-context";
import { useConversationsQuery } from "../model/queries/use-conversations.query";
import { ChatMessages } from "./chat-messages";
import { ConversationList } from "./conversation-list";
import { EmptyChatState } from "./empty-chat-state";

interface ChatPageProps {
  initialConversationId?: string;
}

export default function ChatPage({ initialConversationId }: ChatPageProps) {
  const { session } = useSession();
  const navigate = useNavigate();
  const { data: conversations = [], isLoading } = useConversationsQuery();

  const activeConversation = conversations.find(
    (c) => c.id === initialConversationId,
  );

  // Si no hay conversación seleccionada pero hay conversaciones disponibles,
  // seleccionar la primera automáticamente
  useEffect(() => {
    if (!initialConversationId && conversations.length > 0 && !isLoading) {
      navigate(`/chat/${conversations[0].id}`, { replace: true });
    }
  }, [initialConversationId, conversations, isLoading, navigate]);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-foreground/50">Debes iniciar sesión</p>
      </div>
    );
  }

  const userId = session.user.id;

  return (
    <div className="h-full divide-x divide-foreground/20 overflow-hidden grid grid-cols-[auto_1fr]">
      {/* Lista de conversaciones */}
      <aside className="md:w-80 h-full">
        <div className="p-4">
          <h1 className="text-xl font-bold">{t("messages")}</h1>
        </div>
        <ConversationList
          activeConversationId={initialConversationId}
          currentUserId={userId}
          isLoading={isLoading}
        />
      </aside>

      {/* Chat activo */}
      <div className="grid grid-cols-1 h-full">
        {activeConversation ? (
          <ChatMessages
            conversationId={activeConversation.id}
            currentUserId={userId}
            otherUserName={activeConversation.otherParticipant.name}
          />
        ) : <EmptyChatState />}
      </div>
    </div>
  );
}
