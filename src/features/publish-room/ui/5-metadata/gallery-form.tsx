import {
	Camera01Icon,
	CheckmarkCircle02Icon,
	DeleteIcon,
	ImageUpload01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { EditableRoom } from "~/entities/room/editable-room";
import { compressImage } from "~/shared/utils/image-compression";
import { logger } from "~/shared/utils/logger";
import { cn } from "~/shared/utils/utils";
import type { Step5SchemaType } from "./step";

type Image = EditableRoom["images"]["gallery"][number];
type Props = {
	onChangeImages: UseFormSetValue<Step5SchemaType>;
	onChangeMain: (index: number) => void;
	images: Image[];
	mainIndex: number;
};

// Límite de tamaño de archivo: 5MB (para evitar problemas en móviles)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 10;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export function GalleryForm({
	onChangeImages,
	onChangeMain,
	images,
	mainIndex,
}: Props) {
	const { t } = useTranslation();
	const objectUrlsRef = useRef<Set<string>>(new Set());
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	// Limpiar URLs de objetos cuando el componente se desmonte
	useEffect(() => {
		return () => {
			// Liberar memoria de todos los object URLs creados
			for (const url of objectUrlsRef.current) {
				try {
					URL.revokeObjectURL(url);
				} catch (error) {
					logger.error("Error revoking object URL", error);
				}
			}
			objectUrlsRef.current.clear();
		};
	}, []);

	// Validar y procesar archivos
	const processFiles = useCallback(
		async (fileList: FileList | File[]) => {
			setIsProcessing(true);
			const files = Array.from(fileList);

			try {
				const errors: string[] = [];

				// Verificar límite de imágenes
				const totalImages = images.length + files.length;
				if (totalImages > MAX_IMAGES) {
					errors.push(
						t("max_images_exceeded", {
							defaultValue: `Maximum ${MAX_IMAGES} images allowed`,
							max: MAX_IMAGES,
						}),
					);
					setIsProcessing(false);
					toast.error(errors.join("\n"));
					return;
				}

				// Procesar archivos en paralelo
				const processPromises = files.map(async (file) => {
					// Validar tipo
					if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
						errors.push(
							t("invalid_file_type", {
								defaultValue: `${file.name}: Invalid file type`,
								fileName: file.name,
							}),
						);
						logger.warn(`File ${file.name} has invalid type`, {
							type: file.type,
						});
						return null;
					}

					// Validar tamaño antes de comprimir
					if (file.size > MAX_FILE_SIZE * 2) {
						// Si es más del doble, avisar
						logger.warn(`File ${file.name} is very large, compressing...`, {
							size: file.size,
							sizeMB: (file.size / (1024 * 1024)).toFixed(2),
						});
					}

					try {
						// Comprimir imagen
						const compressedFile = await compressImage(file, {
							maxSizeMB: 1,
							maxWidthOrHeight: 1920,
							quality: 0.85,
						});

						// Validar tamaño después de comprimir
						if (compressedFile.size > MAX_FILE_SIZE) {
							const sizeMB = (compressedFile.size / (1024 * 1024)).toFixed(2);
							errors.push(
								t("file_too_large", {
									defaultValue: `${file.name}: File too large (${sizeMB}MB)`,
									fileName: file.name,
									size: sizeMB,
								}),
							);
							logger.warn(
								`File ${file.name} still too large after compression`,
								{
									maxSize: MAX_FILE_SIZE,
									size: compressedFile.size,
								},
							);
							return null;
						}

						return compressedFile;
					} catch (error) {
						logger.error(`Error compressing ${file.name}`, error);
						errors.push(
							t("error_compressing_image", {
								defaultValue: `${file.name}: Error processing image`,
								fileName: file.name,
							}),
						);
						return null;
					}
				});

				// Esperar a que todas las imágenes se procesen
				const processedFiles = await Promise.all(processPromises);
				const successfulFiles = processedFiles.filter(
					(file): file is File => file !== null,
				);

				// Mostrar errores si los hay
				if (errors.length > 0) {
					toast.error(errors.join("\n"), {
						duration: 5000,
					});
				}

				// Añadir archivos válidos a los existentes
				if (successfulFiles.length > 0) {
					const newImages = [...images, ...successfulFiles];
					onChangeImages("images.gallery", newImages, {
						shouldValidate: true,
					});

					toast.success(
						t("images_added", {
							count: successfulFiles.length,
							defaultValue: `${successfulFiles.length} image(s) added and optimized`,
						}),
					);
				}
			} catch (error) {
				logger.error("Error processing files", error);
				toast.error(
					t("error_uploading_images", {
						defaultValue: "Error uploading images",
					}),
				);
			} finally {
				setIsProcessing(false);
			}
		},
		[images, onChangeImages, t],
	);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		processFiles(files);

		// Reset input para permitir seleccionar los mismos archivos de nuevo
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Drag & Drop handlers
	const handleDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// Solo desactivar si salimos del contenedor principal
		if (e.currentTarget === e.target) {
			setIsDragging(false);
		}
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			const files = e.dataTransfer.files;
			if (files && files.length > 0) {
				processFiles(files);
			}
		},
		[processFiles],
	);

	// Eliminar imagen
	const handleDelete = useCallback(
		(index: number) => {
			const filteredImages = images.filter((_, i) => i !== index);
			onChangeImages("images.gallery", filteredImages, {
				shouldValidate: true,
			});

			// Ajustar el índice de la imagen principal si es necesario
			if (mainIndex === index) {
				onChangeMain(0);
			} else if (mainIndex > index) {
				onChangeMain(mainIndex - 1);
			}

			toast.success(t("image_deleted", { defaultValue: "Image deleted" }));
		},
		[images, mainIndex, onChangeImages, onChangeMain, t],
	);

	// Crear URL de imagen de forma segura
	const getSrc = useCallback((image: Image) => {
		if (typeof image === "string") {
			return image;
		}

		try {
			const url = URL.createObjectURL(image);
			objectUrlsRef.current.add(url);
			return url;
		} catch (error) {
			logger.error("Error creating object URL (iOS memory issue?)", error);
			return "";
		}
	}, []);

	const hasImages = images && images.length > 0;
	const canAddMore = images.length < MAX_IMAGES;

	return (
		<div className="space-y-4">
			{/* Header con contador */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">{t("upload_images")}</h3>
				<span className="text-sm text-foreground/60">
					{images.length} / {MAX_IMAGES}
				</span>
			</div>

			{/* Zona de drop */}
			<button
				className={cn(
					"relative border-2 border-dashed rounded-lg transition-all",
					isDragging
						? "border-primary bg-primary/5 scale-[1.02]"
						: "border-foreground/20 hover:border-foreground/40",
					!canAddMore && "opacity-50 cursor-not-allowed",
				)}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onKeyDown={(e) => {
					if (canAddMore && (e.key === "Enter" || e.key === " ")) {
						e.preventDefault();
						fileInputRef.current?.click();
					}
				}}
				tabIndex={canAddMore ? 0 : -1}
				type="button"
			>
				<label
					className={cn(
						"flex flex-col items-center justify-center gap-3 p-8 cursor-pointer",
						!canAddMore && "cursor-not-allowed",
					)}
				>
					<div
						className={cn(
							"p-4 rounded-full transition-colors",
							isDragging ? "bg-primary/20" : "bg-foreground/5",
						)}
					>
						<HugeiconsIcon
							className={cn(
								"transition-colors",
								isDragging ? "text-primary" : "text-foreground/60",
							)}
							icon={isDragging ? ImageUpload01Icon : Camera01Icon}
							size={32}
						/>
					</div>

					<div className="text-center space-y-1">
						<p className="font-medium text-foreground">
							{isDragging
								? t("drop_images_here", { defaultValue: "Drop images here" })
								: t("click_or_drag_images", {
										defaultValue: "Click to upload or drag and drop",
									})}
						</p>
						<p className="text-sm text-foreground/60">
							{t("image_requirements", {
								defaultValue: "PNG, JPG, WEBP up to 5MB",
							})}
						</p>
					</div>

					<input
						accept={ACCEPTED_IMAGE_TYPES.join(",")}
						capture="environment"
						disabled={!canAddMore || isProcessing}
						hidden
						multiple
						onChange={handleFileChange}
						ref={fileInputRef}
						type="file"
					/>
				</label>

				{/* Overlay de procesamiento */}
				{isProcessing && (
					<div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
						<div className="flex flex-col items-center gap-2">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
							<p className="text-sm text-foreground/60">
								{t("processing_images", { defaultValue: "Processing..." })}
							</p>
						</div>
					</div>
				)}
			</button>

			{/* Galería de imágenes */}
			{hasImages && (
				<div className="space-y-3">
					<p className="text-sm text-foreground/70">
						{t("tap_to_set_cover", {
							defaultValue: "Tap an image to set it as cover",
						})}
					</p>

					<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						{images.map((image, i) => {
							const imageSrc = getSrc(image);
							const isMain = mainIndex === i;

							return (
								<li
									className={cn(
										"relative group aspect-square rounded-lg overflow-hidden transition-all",
										"hover:shadow-lg hover:scale-[1.02]",
										isMain &&
											"ring-4 ring-primary ring-offset-2 ring-offset-background",
									)}
									// biome-ignore lint/suspicious/noArrayIndexKey: ok
									key={`image-${i}`}
								>
									{/* Imagen */}
									<button
										aria-label={
											isMain
												? t("cover_image", { defaultValue: "Cover image" })
												: t("set_as_cover", { defaultValue: "Set as cover" })
										}
										className="w-full h-full relative"
										onClick={() => onChangeMain(i)}
										type="button"
									>
										<img
											alt={`Upload ${i + 1}`}
											className={cn(
												"w-full h-full object-cover transition-all",
												"group-hover:brightness-90",
											)}
											src={imageSrc}
										/>

										{/* Badge de cover */}
										{isMain && (
											<div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-lg">
												<HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
												{t("cover", { defaultValue: "Cover" })}
											</div>
										)}

										{/* Overlay hover */}
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
											{!isMain && (
												<span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
													{t("set_as_cover", { defaultValue: "Set as cover" })}
												</span>
											)}
										</div>
									</button>

									{/* Botón eliminar */}
									<button
										aria-label={t("delete_image", {
											defaultValue: "Delete image",
										})}
										className={cn(
											"absolute top-2 right-2 p-1.5 rounded-full transition-all",
											"bg-destructive/90 hover:bg-destructive text-background/90",
											"opacity-0 group-hover:opacity-100",
											"focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2",
										)}
										onClick={() => handleDelete(i)}
										type="button"
									>
										<HugeiconsIcon icon={DeleteIcon} size={16} />
									</button>

									{/* Número de imagen */}
									<div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs font-medium">
										{i + 1}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
