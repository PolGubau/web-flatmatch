import { UserCircleIcon } from "@hugeicons/core-free-icons";
import { ErrorSection } from "~/shared/components/error-section";

interface ProfileErrorFallbackProps {
  onReset: () => void;
  error?: Error;
}

export const ProfileErrorFallback = ({
  onReset,
  error,
}: ProfileErrorFallbackProps) => {
  return (
    <ErrorSection
      descriptionKey="profile_error_description"
      error={error}
      icon={UserCircleIcon}
      onReset={onReset}
      titleKey="profile_error_title"
    />
  );
};
