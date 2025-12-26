import { LockIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { t } from "i18next";
import { Eye, EyeClosed } from "lucide-react";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import type { TranslationKey } from "~/shared/i18n/i18n";
import type { Breakpoints } from "~/shared/types/common";
import { cn } from "~/shared/utils/utils";
import { inputTheme } from "./theme";

type Props = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  icon?: IconSvgElement;
  autoComplete?: "current-password" | "new-password";
  label?: TranslationKey;
  size?: Breakpoints;
};
export const PasswordInput = ({
  className,
  icon = LockIcon,
  placeholder = "********",
  label,
  autoComplete = "current-password",
  size = "md",
  ...props
}: Props) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="flex gap-2" htmlFor={props.id}>
        <span className="text-sm">{t(label)}</span>
      </label>
    )}
    <PasswordToggleField.Root>
      <div
        className={cn(
          "flex flex-nowrap items-center justify-center gap-2",
          inputTheme,
        )}
        data-size={size}
        data-slot="input"
      >
        <div className="relative w-full flex-1 h-full flex justify-start items-center">
          {icon && (
            <HugeiconsIcon
              className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/60! size-[22px]"
              icon={icon}
            />
          )}
          <PasswordToggleField.Input
            autoComplete={autoComplete}
            className={cn(
              "text-inherit flex w-full h-full outline-0",
              {
                "pl-7!": !!icon,
              },
              className,
            )}
            data-size={size}
            data-slot="input"
            placeholder={placeholder}
            {...props}
          />
        </div>

        <PasswordToggleField.Toggle className="text-inherit mr-1 leading-[1] flex items-center justify-center aspect-square rounded-lg focus-visible:outline-[2px] focus-visible:outline-accent focus-visible:outline-offset-[2px]">
          <PasswordToggleField.Icon hidden={<EyeClosed />} visible={<Eye />} />
        </PasswordToggleField.Toggle>
      </div>
    </PasswordToggleField.Root>
  </div>
);
