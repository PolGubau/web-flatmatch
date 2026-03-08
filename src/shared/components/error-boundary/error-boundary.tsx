import { Alert01Icon } from "@hugeicons/core-free-icons";
import {
  cloneElement,
  Component,
  isValidElement,
  type ReactNode,
} from "react";
import { errorHandler } from "~/shared/utils/error-handler";
import { logger } from "~/shared/utils/logger";
import { ErrorSection } from "../error-section";

type ErrorBoundaryFallbackProps = {
  error?: Error;
  errorId?: string;
  componentName?: string;
  onReset: () => void;
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  onReset?: () => void;
  /** Nombre del componente/sección para mejor tracking */
  name?: string;
  /** Información adicional de contexto */
  context?: Record<string, unknown>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
}

/**
 * Genera un ID único para el error para facilitar el tracking
 */
function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Extrae información útil del error sin exponer detalles sensibles
 */
function getErrorDetails(error: Error): {
  type: string;
  message: string;
  isNetworkError: boolean;
  isMemoryError: boolean;
} {
  const message = error.message || "Unknown error";
  const type = error.name || "Error";

  // Detectar tipos comunes de errores
  const isNetworkError =
    message.includes("fetch") ||
    message.includes("network") ||
    message.includes("Failed to fetch") ||
    type === "NetworkError";

  const isMemoryError =
    message.includes("memory") ||
    message.includes("quota") ||
    message.includes("createObjectURL");

  return {
    isMemoryError,
    isNetworkError,
    message,
    type,
  };
}

class ErrorBoundaryClass extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = generateErrorId();
    return {
      error,
      errorId,
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { name, context } = this.props;
    const errorDetails = getErrorDetails(error);

    // Log completo con contexto
    const logContext = {
      ...context,
      componentName: name || "Unknown",
      errorDetails,
      errorId: this.state.errorId,
      userAgent: navigator.userAgent,
      viewport: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    };

    errorHandler.logError(error, `ErrorBoundary${name ? ` (${name})` : ""}`);
    logger.error("Component error caught", error, logContext);

    // Log del component stack (útil para debugging)
    if (errorInfo.componentStack) {
      logger.error("Component stack trace", undefined, {
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId,
      });
    }

    // Guardar errorInfo en el estado para mostrarlo si es necesario
    this.setState({ errorInfo });
  }

  handleReset = () => {
    logger.info("Error boundary reset", {
      componentName: this.props.name,
      errorId: this.state.errorId,
    });

    this.setState({
      error: undefined,
      errorId: undefined,
      errorInfo: undefined,
      hasError: false,
    });

    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const fallbackProps: ErrorBoundaryFallbackProps = {
          componentName: this.props.name,
          error: this.state.error,
          errorId: this.state.errorId,
          onReset: this.handleReset,
        };

        if (typeof this.props.fallback === "function") {
          return this.props.fallback(fallbackProps);
        }

        if (isValidElement(this.props.fallback)) {
          return cloneElement(
            this.props.fallback,
            fallbackProps as Record<string, unknown>,
          );
        }

        return this.props.fallback;
      }

      return (
        <ErrorSection
          componentName={this.props.name}
          error={this.state.error}
          errorId={this.state.errorId}
          icon={Alert01Icon}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ErrorBoundaryClass;
