import { t } from 'i18next';
import type { TranslationKey } from '~/shared/i18n/i18n';
import { cn } from '~/shared/utils/utils';

type Props = {
  label: TranslationKey;
  option: string;
  isChecked: boolean;
  onSelect: () => void;
  name: string;
}
export const OptionItem = ({ option, label, isChecked, onSelect, name }: Props) => {
  return (
    <li className="w-full h-full">
      <button
        className={cn(
          "p-4 transition-all cursor-pointer w-full h-full rounded-xl outline-none flex items-center justify-center font-medium text-sm md:text-base hover:scale-[1.03] focus:scale-[1.03]",
          {
            " bg-foreground/10": !isChecked,
            "ring-2 ring-foreground bg-foreground/20": isChecked,
          },
        )}
        onClick={onSelect}
        type="button"
      >
        <input
          checked={isChecked}
          defaultValue={option}
          hidden
          id={option}
          name={name}
          type="radio"
        />
        <span className="capitalize">{t(label)}</span>
      </button>
    </li>
  )
}
