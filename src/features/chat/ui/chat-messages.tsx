import { Sent02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/shared/components/ui/button";
import { ErrorSection } from "~/shared/components/ui/error-section";
import { Input } from "~/shared/components/ui/input/input";
import { useMarkAsReadMutation } from "../model/mutations/use-mark-as-read.mutation";
import { useSendMessageMutation } from "../model/mutations/use-send-message.mutation";
import { useMessagesQuery } from "../model/queries/use-messages.query";
import { useRealtimeMessages } from "../model/use-realtime-messages";
import { ChatMessagesSkeleton } from "./chat-messages-skeleton";
import { MessageItem } from "./message-item";

interface ChatMessagesProps {
  conversationId: string;
  currentUserId: string;
  otherUserName: string;
}

export const ChatMessages = ({
  conversationId,
  currentUserId,
  otherUserName,
}: ChatMessagesProps) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useMessagesQuery(conversationId);
  const sendMessage = useSendMessageMutation(conversationId);
  const markAsRead = useMarkAsReadMutation();

  // Suscribirse a mensajes en tiempo real
  useRealtimeMessages(conversationId);

  // Scroll automático al final cuando llegan nuevos mensajes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Solo necesitamos reaccionar a cambios en la cantidad de mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Marcar como leídos cuando se abre la conversación
  // biome-ignore lint/correctness/useExhaustiveDependencies: Solo queremos ejecutar esto cuando cambia conversationId
  useEffect(() => {
    if (conversationId) {
      markAsRead.mutate(conversationId);
    }
  }, [conversationId]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    sendMessage.mutate(trimmed, {
      onSuccess: () => {
        setInputValue("");
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return <ChatMessagesSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <ErrorSection
          description="error_loading_messages_description"
          title="error_loading_messages"
          withoutNavigation
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="p-4 border-b border-foreground/20 flex items-center gap-3">
        <h2 className="font-semibold text-lg">{otherUserName}</h2>
      </header>

      {/* Messages */}
      <section
        className="flex-1 overflow-y-auto p-4 space-y-1"
        ref={messagesContainerRef}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-foreground/50">
              {t("no_messages_start_conversation")}
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.senderId === currentUserId;
            const prevMessage = messages[index - 1];
            const showTime =
              !prevMessage ||
              message.sentAt.getTime() - prevMessage.sentAt.getTime() >
              5 * 60 * 1000; // 5 minutos

            return (
              <MessageItem
                isOwn={isOwn}
                key={message.id}
                message={message}
                showTime={showTime}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </section>

      {/* Input */}
      <div className="p-4 border-t border-foreground/20">
        <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
          <Input
            className="w-full"
            disabled={sendMessage.isPending}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            type="text"
            value={inputValue}
          />
          <Button
            disabled={!inputValue.trim() || sendMessage.isPending}
            onClick={handleSend}
            size={"icon"}
            type="button"
          >
            <HugeiconsIcon className="size-5" icon={Sent02Icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};
