export const useEnv = () => {
	const isLocal = import.meta.env.VITE_IS_LOCAL === "true";
	return { isLocal };
};
