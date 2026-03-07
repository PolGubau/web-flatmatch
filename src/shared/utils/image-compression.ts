import { logger } from "./logger";

interface CompressionOptions {
	maxSizeMB?: number;
	maxWidthOrHeight?: number;
	useWebWorker?: boolean;
	quality?: number;
}

const DEFAULT_OPTIONS: CompressionOptions = {
	maxSizeMB: 1, // 1MB máximo
	maxWidthOrHeight: 1920, // Full HD
	quality: 0.8, // 80% calidad
	useWebWorker: true,
};

/**
 * Comprime una imagen usando Canvas API
 * Fallback nativo sin dependencias externas
 */
async function compressImageNative(
	file: File,
	options: CompressionOptions = DEFAULT_OPTIONS,
): Promise<File> {
	const { maxSizeMB = 1, maxWidthOrHeight = 1920, quality = 0.8 } = options;

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const img = new Image();

			img.onload = () => {
				try {
					// Calcular nuevas dimensiones manteniendo aspect ratio
					let { width, height } = img;
					if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
						if (width > height) {
							height = (height / width) * maxWidthOrHeight;
							width = maxWidthOrHeight;
						} else {
							width = (width / height) * maxWidthOrHeight;
							height = maxWidthOrHeight;
						}
					}

					// Crear canvas y comprimir
					const canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;

					const ctx = canvas.getContext("2d");
					if (!ctx) {
						reject(new Error("Could not get canvas context"));
						return;
					}

					// Dibujar imagen redimensionada
					ctx.drawImage(img, 0, 0, width, height);

					// Convertir a blob
					canvas.toBlob(
						(blob) => {
							if (!blob) {
								reject(new Error("Could not compress image"));
								return;
							}

							// Verificar tamaño
							const sizeMB = blob.size / 1024 / 1024;
							if (sizeMB > maxSizeMB) {
								// Si aún es muy grande, reducir calidad
								const newQuality = Math.max(0.5, quality * 0.8);
								logger.warn(
									`Image still too large (${sizeMB.toFixed(2)}MB), reducing quality to ${newQuality}`,
								);

								canvas.toBlob(
									(newBlob) => {
										if (!newBlob) {
											reject(new Error("Could not compress image"));
											return;
										}

										const compressedFile = new File([newBlob], file.name, {
											type: file.type,
											lastModified: Date.now(),
										});

										resolve(compressedFile);
									},
									file.type,
									newQuality,
								);
							} else {
								const compressedFile = new File([blob], file.name, {
									type: file.type,
									lastModified: Date.now(),
								});

								resolve(compressedFile);
							}
						},
						file.type,
						quality,
					);
				} catch (error) {
					reject(error);
				}
			};

			img.onerror = () => reject(new Error("Could not load image"));
			img.src = e.target?.result as string;
		};

		reader.onerror = () => reject(new Error("Could not read file"));
		reader.readAsDataURL(file);
	});
}

/**
 * Comprime una imagen antes de subirla
 * @param file Archivo de imagen a comprimir
 * @param options Opciones de compresión
 * @returns Archivo comprimido
 */
export async function compressImage(
	file: File,
	options: CompressionOptions = DEFAULT_OPTIONS,
): Promise<File> {
	try {
		const originalSizeMB = file.size / 1024 / 1024;

		logger.info("Compressing image", {
			name: file.name,
			originalSize: `${originalSizeMB.toFixed(2)}MB`,
			type: file.type,
		});

		const compressedFile = await compressImageNative(file, options);

		const compressedSizeMB = compressedFile.size / 1024 / 1024;
		const reduction = ((1 - compressedSizeMB / originalSizeMB) * 100).toFixed(
			1,
		);

		logger.info("Image compressed successfully", {
			compressedSize: `${compressedSizeMB.toFixed(2)}MB`,
			name: file.name,
			reduction: `${reduction}%`,
		});

		return compressedFile;
	} catch (error) {
		logger.error("Error compressing image, using original", error);
		// Si falla la compresión, devolver el archivo original
		return file;
	}
}

