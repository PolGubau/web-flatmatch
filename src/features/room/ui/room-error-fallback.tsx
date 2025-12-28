import { Home09Icon } from "@hugeicons/core-free-icons";
import { ErrorSection } from "~/shared/components/error-section";

interface RoomErrorFallbackProps {
  onReset: () => void;
  error?: Error;
}

export const RoomErrorFallback = ({
  onReset,
  error,
}: RoomErrorFallbackProps) => {
  return (
    <ErrorSection
      descriptionKey="room_error_description"
      error={error}
      icon={Home09Icon}
      onReset={onReset}
      titleKey="room_error_title"
    />
  );
};
