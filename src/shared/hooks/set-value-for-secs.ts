import { useState } from "react";

export const setValueForSecs = (secs = 2) => {
	const [isTrue, setIsTrue] = useState<boolean>(false);

	// when action is triggered set true for secs, then return to false
	const setTrue = () => {
		setIsTrue(true);
		setTimeout(() => {
			setIsTrue(false);
		}, secs * 1000);
	};

	return { isTrue, setTrue };
};
