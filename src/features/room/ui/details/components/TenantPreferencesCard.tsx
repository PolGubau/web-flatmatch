import type { Preferences } from "~/entities/room/room";
import { Badge } from "~/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

type TenantPreferencesCardProps = {
	preferences: Preferences;
};

type PreferenceItemProps = {
	label: string;
	children: React.ReactNode;
};

const PreferenceItem = ({ label, children }: PreferenceItemProps) => (
	<div className="py-2">
		<span className="text-sm font-medium block mb-2">{label}</span>
		{children}
	</div>
);

export const TenantPreferencesCard = ({
	preferences,
}: TenantPreferencesCardProps) => {
	const hasAgePreference = preferences.age !== undefined;
	const hasGenderPreference = preferences.gender !== undefined;
	const hasOccupationPreference = preferences.currentOccupation !== undefined;

	if (!hasAgePreference && !hasGenderPreference && !hasOccupationPreference) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Tenant Preferences</CardTitle>
				<CardDescription>
					Landlord preferences for potential tenants
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{/* Age Range */}
					{hasAgePreference && (
						<div className="flex items-center justify-between py-2">
							<span className="text-sm font-medium">Age range</span>
							<Badge variant="secondary">
								{preferences.age.min} - {preferences.age.max} years
							</Badge>
						</div>
					)}

					{/* Gender Preference */}
					{hasGenderPreference && (
						<PreferenceItem label="Gender preference">
							<div className="flex flex-wrap gap-2">
								{preferences.gender.female && (
									<Badge variant="outline">Female</Badge>
								)}
								{preferences.gender.male && <Badge variant="outline">Male</Badge>}
								{preferences.gender.non_binary && (
									<Badge variant="outline">Non-binary</Badge>
								)}
								{preferences.gender.prefer_not_to_say && (
									<Badge variant="outline">Any</Badge>
								)}
							</div>
						</PreferenceItem>
					)}

					{/* Occupation Preference */}
					{hasOccupationPreference && (
						<PreferenceItem label="Preferred occupation">
							<div className="flex flex-wrap gap-2">
								{preferences.currentOccupation.student && (
									<Badge variant="outline">Student</Badge>
								)}
								{preferences.currentOccupation.employed && (
									<Badge variant="outline">Employed</Badge>
								)}
								{preferences.currentOccupation.unemployed && (
									<Badge variant="outline">Unemployed</Badge>
								)}
							</div>
						</PreferenceItem>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
