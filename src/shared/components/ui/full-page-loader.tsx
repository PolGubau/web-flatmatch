import { useTranslation } from "react-i18next";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { LoadingSpinner } from "./loading-spinner";

interface FullPageLoaderProps {
  text?: TranslationKey;
  size?: "sm" | "md" | "lg" | "xl";
}

export const FullPageLoader = ({ text, size = "lg" }: FullPageLoaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <LoadingSpinner size={size} text={text ? t(text) : undefined} />
    </div>
  );
};
