import type { TranslationKey } from "~/shared/i18n/i18n";
import { OptionItem } from "./item";

type Option<T> = {
  value: T;
  label: TranslationKey;
};
export type OptionListProps<T extends Option<string>> = {
  options: T[];
  selectedOption: T["value"] | null;
  onSelectOption: (option: T["value"] | null) => void;
  name: string;
};
export const OptionList = <T extends Option<string>>({
  options,
  name,
  selectedOption,
  onSelectOption,
}: OptionListProps<T>) => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
      {options.map((option) => {
        const isChecked = option.value === selectedOption;

        const toggleThisLocation = () => {
          onSelectOption(isChecked ? null : option.value);
        };

        return (
          <OptionItem
            isChecked={isChecked}
            key={option.value}
            label={option.label}
            name={name}
            onSelect={toggleThisLocation}
            option={option.value}
          />
        );
      })}
    </ul>
  );
};
