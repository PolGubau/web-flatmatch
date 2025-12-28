import { t } from "i18next";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ErrorBoundary } from "~/shared/components/error-boundary/error-boundary";
import { Button } from "~/shared/components/ui/button";
import { Drawer } from "~/shared/components/ui/drawer";
import { useSession } from "~/shared/context/session-context";
import { useConversationsQuery } from "../model/queries/use-conversations.query";
import { ChatMessages } from "./chat-messages";
import { ConversationList } from "./conversation-list";
import { ConversationListSkeleton } from "./conversation-list-skeleton";
import { EmptyChatState } from "./empty-chat-state";

interface ChatPageProps {
  initialConversationId?: string;
}

export default function ChatPage({ initialConversationId }: ChatPageProps) {
  const { session } = useSession();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    data: conversations = [],
    isLoading,
    refetch,
  } = useConversationsQuery();

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

  // Cerrar drawer al seleccionar conversación en móvil
  useEffect(() => {
    if (initialConversationId) {
      setIsDrawerOpen(false);
    }
  }, [initialConversationId]);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-foreground/50">Debes iniciar sesión</p>
      </div>
    );
  }

  const userId = session.user.id;

  const conversationListContent = (
    <>
      <div className="px-4 md:block hidden">
        <h1 className="text-xl font-bold">{t("messages")}</h1>
      </div>
      {isLoading ? (
        <ConversationListSkeleton />
      ) : (
        <ConversationList
          activeConversationId={initialConversationId}
          currentUserId={userId}
          isLoading={isLoading}
        />
      )}
    </>
  );

  return (
    <ErrorBoundary onReset={refetch}>
      <div className="h-full divide-x divide-foreground/20 overflow-hidden grid grid-cols-1 md:grid-cols-[auto_1fr]">
        {/* Desktop: Sidebar visible */}
        <aside className="hidden md:block md:w-80 h-full">
          {conversationListContent}
        </aside>

        {/* Mobile: Drawer para lista de conversaciones */}
        <Drawer
          classNames={{
            body: "p-0",
          }}
          onOpenChange={setIsDrawerOpen}
          open={isDrawerOpen}
          title={t("messages")}
        >
          {conversationListContent}
        </Drawer>

        {/* Chat activo */}
        <div className="grid grid-cols-1 h-full">
          {activeConversation ? (
            <ChatMessages
              conversationId={activeConversation.id}
              currentUserId={userId}
              onOpenConversations={() => setIsDrawerOpen(true)}
              otherUserName={activeConversation.otherParticipant.name}
            />
          ) : (
            <div className="flex flex-col h-full">
              {/* Header en móvil cuando no hay chat activo */}
              <header className="p-4 border-b border-muted md:hidden flex items-center gap-3">
                <Button
                  onClick={() => setIsDrawerOpen(true)}
                  size="icon"
                  variant="ghost"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-bold">{t("messages")}</h1>
              </header>
              <EmptyChatState />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
