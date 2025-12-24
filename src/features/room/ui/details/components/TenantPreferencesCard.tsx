import { useTranslation } from "react-i18next";
import type { RoomPreferences } from "~/entities/room/editable-room.schema";
import { Badge } from "~/shared/components/ui/badge";

type TenantPreferencesCardProps = {
  preferences: RoomPreferences;
}; type PreferenceItemProps = {
  label: string;
  children: React.ReactNode;
};

const PreferenceItem = ({ label, children }: PreferenceItemProps) => (
  <div className="grid grid-cols-[1fr_2fr] items-center py-2">
    <span className="text-sm font-medium block mb-2">{label}</span>
    {children}
  </div>
);

export const TenantPreferencesCard = ({
  preferences,
}: TenantPreferencesCardProps) => {
  const { t } = useTranslation();
  const hasAgePreference = preferences.age !== undefined;
  const hasGenderPreference = preferences.gender !== undefined;
  const hasOccupationPreference = preferences.currentOccupation !== undefined;

  if (!hasAgePreference && !hasGenderPreference && !hasOccupationPreference) {
    return null;
  }

  return (
    <section className="space-y-4 border-t border-foreground/10 pt-6 mt-8">
      <header>
        <h3 className="text-xl">{t("tenant_preferences")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("landlord_preferences")}
        </p>
      </header>
      <div className="space-y-3">
        {/* Age Range */}
        {hasAgePreference && (<PreferenceItem label={t("age_range")}>
          <p className="text-sm">
            {preferences.age.min} - {preferences.age.max} years
          </p>
        </PreferenceItem>
        )}

        {/* Gender Preference */}
        {hasGenderPreference && (
          <PreferenceItem label={t("gender_preference")}>
            <div className="flex flex-wrap gap-2">
              {preferences.gender.female && (
                <Badge variant="outline">{t("female")}</Badge>
              )}
              {preferences.gender.male && <Badge variant="outline">{t("male")}</Badge>}
              {preferences.gender.non_binary && (
                <Badge variant="outline">{t("non_binary")}</Badge>
              )}
              {preferences.gender.prefer_not_to_say && (
                <Badge variant="outline">{t("any")}</Badge>
              )}
            </div>
          </PreferenceItem>
        )}

        {/* Occupation Preference */}
        {hasOccupationPreference && (
          <PreferenceItem label={t("preferred_occupation")}>
            <div className="flex flex-wrap gap-2">
              {preferences.currentOccupation.student && (
                <Badge variant="outline">{t("student")}</Badge>
              )}
              {preferences.currentOccupation.employed && (
                <Badge variant="outline">{t("employed")}</Badge>
              )}
              {preferences.currentOccupation.unemployed && (
                <Badge variant="outline">{t("unemployed")}</Badge>
              )}
            </div>
          </PreferenceItem>
        )}
      </div>
    </section>
  );
};
