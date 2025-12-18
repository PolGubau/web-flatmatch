import { Message02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const EmptyChatState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <HugeiconsIcon
        className="w-16 h-16 text-foreground/20 mb-4"
        icon={Message02Icon}
      />
      <h3 className="text-lg font-semibold mb-2">
        Selecciona una conversación
      </h3>
      <p className="text-sm text-foreground/50">
        Elige una conversación de la lista para empezar a chatear
      </p>
    </div>
  );
};
