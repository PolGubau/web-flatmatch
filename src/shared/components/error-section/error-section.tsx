import {
	ArrowReloadHorizontalIcon,
	Copy01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "~/shared/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";

interface ErrorSectionProps {
	onReset: () => void;
	error?: Error;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: any;
	titleKey?: string;
	descriptionKey?: string;
	/** ID único del error para tracking */
	errorId?: string;
	/** Nombre del componente donde ocurrió el error */
	componentName?: string;
}

/**
 * Obtiene un mensaje de error user-friendly basado en el tipo de error
 */
function getUserFriendlyMessage(error?: Error): string {
	if (!error) return "";

	const message = error.message.toLowerCase();

	// Errores de red
	if (message.includes("fetch") || message.includes("network")) {
		return "connection_error_message";
	}

	// Errores de memoria (común en móviles)
	if (message.includes("memory") || message.includes("quota")) {
		return "memory_error_message";
	}

	// Errores de permisos
	if (message.includes("permission") || message.includes("denied")) {
		return "permission_error_message";
	}

	return "error_boundary_default_message";
}

/**
 * Componente genérico para mostrar errores con retry.
 * Muestra información útil sin exponer detalles técnicos sensibles.
 */
export const ErrorSection = ({
	onReset,
	error,
	icon,
	titleKey = "something_went_wrong",
	descriptionKey,
	errorId,
	componentName,
}: ErrorSectionProps) => {
	const { t } = useTranslation();
	const [showDetails, setShowDetails] = useState(false);

	// Usar mensaje específico si no se proporciona descriptionKey
	const finalDescriptionKey = descriptionKey || getUserFriendlyMessage(error);

	const copyErrorDetails = () => {
		const details = [
			`Error ID: ${errorId || "N/A"}`,
			`Component: ${componentName || "Unknown"}`,
			`Type: ${error?.name || "Unknown"}`,
			`Message: ${error?.message || "No message"}`,
			`Time: ${new Date().toISOString()}`,
			`User Agent: ${navigator.userAgent}`,
			`URL: ${window.location.href}`,
		].join("\n");

		navigator.clipboard
			.writeText(details)
			.then(() => {
				toast.success(
					t("error_details_copied", {
						defaultValue: "Error details copied to clipboard",
					}),
				);
			})
			.catch(() => {
				toast.error(t("copy_failed", { defaultValue: "Failed to copy" }));
			});
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-8">
			{icon && (
				<HugeiconsIcon
					className="text-destructive opacity-80"
					icon={icon}
					size={64}
				/>
			)}

			<div className="flex flex-col gap-3 text-center max-w-md">
				<h2 className="text-2xl font-semibold text-foreground">
					{/* @ts-expect-error - dynamic translation key */}
					{t(titleKey)}
				</h2>

				<p className="text-foreground/70">
					{/* @ts-expect-error - dynamic translation key */}
					{t(finalDescriptionKey)}
				</p>

				{/* Mostrar error ID si existe (útil para soporte) */}
				{errorId && (
					<p className="text-xs text-foreground/50 font-mono">
						{t("error_id", { defaultValue: "Error ID" })}: {errorId}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2 w-full max-w-md">
				<Button className="w-full" onClick={onReset} variant="default">
					<HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={16} />
					{t("retry")}
				</Button>

				{/* Detalles técnicos colapsables (útil para debugging sin ser intrusivo) */}
				{error && (
					<Collapsible onOpenChange={setShowDetails} open={showDetails}>
						<CollapsibleTrigger asChild>
							<Button className="w-full text-xs" size="sm" variant="ghost">
								{showDetails
									? t("hide_technical_details", {
											defaultValue: "Hide technical details",
										})
									: t("show_technical_details", {
											defaultValue: "Show technical details",
										})}
							</Button>
						</CollapsibleTrigger>

						<CollapsibleContent className="mt-2">
							<div className="bg-foreground/5 rounded-lg p-4 text-left space-y-2">
								{componentName && (
									<div className="text-xs">
										<span className="font-semibold text-foreground/70">
											Component:
										</span>
										<span className="ml-2 font-mono text-foreground/60">
											{componentName}
										</span>
									</div>
								)}

								<div className="text-xs">
									<span className="font-semibold text-foreground/70">
										Type:
									</span>
									<span className="ml-2 font-mono text-foreground/60">
										{error.name}
									</span>
								</div>

								<div className="text-xs">
									<span className="font-semibold text-foreground/70">
										Message:
									</span>
									<p className="mt-1 font-mono text-foreground/60 break-words">
										{error.message}
									</p>
								</div>

								<Button
									className="w-full mt-2"
									onClick={copyErrorDetails}
									size="sm"
									variant="outline"
								>
									<HugeiconsIcon icon={Copy01Icon} size={14} />
									{t("copy_error_details", {
										defaultValue: "Copy error details",
									})}
								</Button>
							</div>
						</CollapsibleContent>
					</Collapsible>
				)}
			</div>
		</div>
	);
};
