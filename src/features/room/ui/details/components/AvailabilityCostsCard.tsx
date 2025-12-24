import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import i18n from "i18next";
import { Clock, Euro } from "lucide-react";
import { currencyFormat } from "~/shared/utils/formatters/numbers/currencyFormat";

type AvailabilityCostsCardProps = {
  availableFrom: Date | null;
  minimumStay?: {
    value?: number;
    unit?: string;
  };
  deposit: number;
  currency: string;
};

export const AvailabilityCostsCard = ({
  availableFrom,
  minimumStay,
  deposit,
  currency,
}: AvailabilityCostsCardProps) => {
  return (
    <section className="space-y-4 border-t border-foreground/10 pt-6 mt-8">
      <header>
        <h3 className="text-xl">Availability & Costs</h3>
      </header>
      <div className="grid gap-6">
        {availableFrom && (
          <div className="flex items-center gap-6">
            <HugeiconsIcon
              className="text-muted-foreground"
              icon={Calendar03Icon}
              size={25}
            />
            <div>
              <p className="text-sm font-medium">Available from</p>
              <p className="text-sm text-muted-foreground">
                {format(availableFrom, "PPP", { locale: es })}
              </p>
            </div>
          </div>
        )}
        {minimumStay?.value && (
          <div className="flex items-center gap-6">
            <Clock className="text-muted-foreground" size={25} />
            <div>
              <p className="text-sm font-medium">Minimum stay</p>
              <p className="text-sm text-muted-foreground">
                {minimumStay.value} {minimumStay.unit}s
              </p>
            </div>
          </div>
        )}
        {deposit > 0 && (
          <div className="flex items-center gap-6">
            <Euro className="text-muted-foreground" size={25} />
            <div>
              <p className="text-sm font-medium">Deposit</p>
              <p className="text-sm text-muted-foreground">
                {currencyFormat(deposit, currency, i18n.language)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
