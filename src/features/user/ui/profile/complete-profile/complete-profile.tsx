import type { User } from "~/entities/user/user";
import { ChangeBioForm } from "./change-bio-form";
import { ChangeBirthdateForm } from "./change-birthdate-form";
import { ChangeGenderForm } from "./change-gender-form";
import { ChangeOccupationForm } from "./change-occupation-form";

type Props = {
	aboutMe: User["aboutMe"] | null;
	userId: User["id"];
	occupation: User["occupation"] | null;
	birthDate: User["birthDate"] | null;
	gender: User["gender"] | null;
};

export function CompleteProfile({ aboutMe, userId, occupation, birthDate, gender }: Props) {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="text-lg font-semibold">Complete Your profile</h2>
			<ul className="flex flex-col gap-2">
				{!aboutMe && (
					<li className="bg-foreground/5 rounded-xl p-2">
						<ChangeBioForm aboutMe={aboutMe ?? ""} userId={userId} />
					</li>
				)}
				{!occupation && (
					<li className="bg-foreground/5 rounded-xl p-2">
						<ChangeOccupationForm occupation={occupation ?? "employed"} userId={userId} />
					</li>
				)}
				{!birthDate && (
					<li className="bg-foreground/5 rounded-xl p-2">
						<ChangeBirthdateForm birthDate={birthDate} userId={userId} />
					</li>
				)}
				{!gender && (
					<li className="bg-foreground/5 rounded-xl p-2">
						<ChangeGenderForm gender={gender} userId={userId} />
					</li>
				)}
			</ul>
		</section>
	);
}
