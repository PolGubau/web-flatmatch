import type { FieldError, FieldErrors } from "react-hook-form";

type ErrorMessageProps = {
  error?: FieldError | FieldErrors | unknown;
  fallback?: string;
};

/**
 * Componente para mostrar errores de formulario de forma consistente
 * Maneja tanto errores simples como anidados
 */
export const ErrorMessage = ({ error, fallback }: ErrorMessageProps) => {
  if (!error) return null;

  // Si es un error simple con mensaje
  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    return (
      <p className="text-error text-sm p-4 rounded-xl bg-error/10">
        {error.message}
      </p>
    );
  }

  // Si es un objeto de errores anidados
  const errorMessages: string[] = [];
  const extractErrors = (obj: unknown, path = ""): void => {
    if (!obj || typeof obj !== "object") return;

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (value && typeof value === "object") {
        if ("message" in value && typeof value.message === "string") {
          errorMessages.push(`${currentPath}: ${value.message}`);
        } else {
          extractErrors(value, currentPath);
        }
      }
    }
  };

  extractErrors(error);

  if (errorMessages.length === 0 && fallback) {
    return (
      <p className="text-error text-sm p-4 rounded-xl bg-error/10">{fallback}</p>
    );
  }

  if (errorMessages.length === 0) return null;

  return (
    <div className="text-error text-sm p-4 rounded-xl bg-error/10 space-y-1">
      {errorMessages.map((msg, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: only for error messages
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};
