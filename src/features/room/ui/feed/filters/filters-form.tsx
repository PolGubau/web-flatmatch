import { t } from "i18next";
import { parseAsInteger, useQueryState } from "nuqs";
import { Input } from "~/shared/components/ui/input/input";
import { cn } from "~/shared/utils/utils";

const availableLocations = [
	"Barcelona",
	"Girona",
	"Tarragona",
	"Lleida",
	"Milano",
	"Roma",
];
export const FiltersForm = () => {
	const [location, setLocation] = useQueryState("location");
	const [minPrice, setMinPrice] = useQueryState("minPrice", parseAsInteger);
	const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger);

	return (
		<section className="flex flex-col gap-4">
			<fieldset>
				<legend>{t("location")}</legend>
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
					{availableLocations.map((av_location) => {
						const isChecked = av_location === location;
						return (
							<li className="w-full h-full" key={av_location}>
								<button
									className={cn(
										"p-4 transition-all w-full h-full  rounded-xl outline-none flex items-center justify-center font-medium text-sm md:text-base hover:scale-[1.03] focus:scale-[1.03]",
										{
											" bg-foreground/10": !isChecked,
											"ring-2 ring-foreground bg-foreground/20": isChecked,
										},
									)}
									onClick={() => setLocation(av_location)}
									type="button"
								>
									<input
										checked={isChecked}
										hidden
										id={av_location}
										name="av_location"
										onChange={() => setLocation(av_location)}
										type="radio"
										value={av_location}
									/>
									<span className="capitalize">{av_location}</span>
								</button>
							</li>
						);
					})}
				</ul>
			</fieldset>

			<fieldset>
				<legend>{t("price_range")}</legend>
				<div className="grid gap-4 md:grid-cols-2">
					<Input
						label={"min_price"}
						onChange={(e) =>
							setMinPrice(e.target.value ? parseInt(e.target.value) : 0)
						}
						placeholder="0"
						type="number"
						value={minPrice ?? ""}
					/>
					<Input
						label={"max_price"}
						onChange={(e) =>
							setMaxPrice(e.target.value ? parseInt(e.target.value) : 1000)
						}
						placeholder="1000"
						type="number"
						value={maxPrice ?? ""}
					/>
				</div>
			</fieldset>
		</section>
	);
};
