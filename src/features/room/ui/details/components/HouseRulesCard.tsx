import { Badge } from "~/shared/components/ui/badge";

type HouseRulesCardProps = {
  rules: Record<string, boolean | string | number>;
};

export const HouseRulesCard = ({ rules }: HouseRulesCardProps) => {
  const booleanRules = Object.entries(rules).filter(
    ([, value]) => typeof value === "boolean",
  ) as [string, boolean][];

  if (booleanRules.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-foreground/10 pt-6 mt-8">
      <header>
        <h3 className="text-xl">House Rules</h3>
      </header>
      <div className="grid gap-4">
        {booleanRules.map(([key, value]) => (
          <div
            className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            key={key}
          >
            <span className="text-sm font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <Badge variant={value ? "success" : "secondary"}>
              {value ? "Allowed" : "Not allowed"}
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
};
