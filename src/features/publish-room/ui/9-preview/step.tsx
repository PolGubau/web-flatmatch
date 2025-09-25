import { RoomTinderCardUI } from "~/features/room/ui/room-tinder-card-ui";
import { useFormState } from "../../model/useFormState";
import RoomDetails from "~/features/room/ui/details/room-details";

export const RoomPreview = () => {
	const { data } = useFormState();

	return (
		<div>
			<h1>Preview</h1>
			<RoomTinderCardUI title={data.title} description={data.description} images={data.images} price={data.price} verification={{
				verifiedAt: null,
				verifiedBy: null,
				notes: null,
				verificationType: null,
			}} />
			<RoomDetails room={data} />
			{JSON.stringify(data, null, 2)}
		</div>
	);
};
