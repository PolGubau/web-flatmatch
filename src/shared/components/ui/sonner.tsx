import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps, toast as t } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--canvas)",
					"--normal-border": "var(--foreground/10)",
					"--normal-text": "var(--foreground)",
				} as React.CSSProperties
			}
			theme={theme as ToasterProps["theme"]}
			{...props}
		/>
	);
};

export { Toaster };

export const toast = t;
