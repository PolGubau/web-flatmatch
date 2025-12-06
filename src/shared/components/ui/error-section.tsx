import { Alert01Icon, ArrowLeftIcon, Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import type { TranslationKey } from "~/shared/i18n/i18n";
import { Button } from "./button";

type ErrorSectionProps = {
  title?: TranslationKey;
  description?: TranslationKey;
  icon?: IconSvgElement;
  withoutNavigation?: boolean;
};

export const ErrorSection = ({
  title = "error_title",
  description = "error_description",
  withoutNavigation = false,
  icon = Alert01Icon,
}: ErrorSectionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <HugeiconsIcon className="text-error opacity-80" icon={icon} size={64} />
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground">{t(title)}</h2>
        <p className="text-foreground/70 max-w-md">{t(description)}</p>
      </div>
      {!withoutNavigation && <nav className="gap-4 flex justify-between items-center">
        <Button onClick={goBack} variant={"link"}>
          <HugeiconsIcon icon={ArrowLeftIcon} size={16} />
          {t("go_back")}
        </Button>
        <Link to="/">
          <Button variant={"link"}>
            <HugeiconsIcon icon={Home01Icon} size={16} />
            {t("go_home")}</Button>
        </Link>
      </nav>}
    </section>
  );
};
