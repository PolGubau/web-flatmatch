import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { cn } from "~/shared/utils/utils";

type Feature = {
  key: string;
  value: boolean;
  icon?: IconSvgElement;
  label: TranslationKey;
};

type FeaturesListProps = {
  title: string;
  features: Feature[];
  className?: string;
};

export const FeaturesList = ({
  title,
  features,
  className,
}: FeaturesListProps) => {
  const { t } = useTranslation();

  return (
    <section
      className={cn(
        "space-y-4 border-t border-foreground/10 pt-6 mt-8",
        className,
      )}
    >
      <header>
        <h3 className="text-xl">{title}</h3>
      </header>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {features.map((feature) => (
          <li
            className={cn("flex items-center gap-4", {
              "opacity-30": !feature.value,
            })}
            key={feature.key}
          >
            {feature.icon && (
              <HugeiconsIcon icon={feature.icon} size={25} />
            )}
            <span
              className={cn({
                "line-through": !feature.value,
              })}
            >
              {t(feature.label)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
