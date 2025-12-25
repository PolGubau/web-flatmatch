import {
  Alert01Icon,
  ArrowReloadHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Component, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { errorHandler } from "~/shared/utils/error-handler";
import { Button } from "../ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
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
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorHandler.logError(error, "ErrorBoundary");
    console.error("Component stack:", errorInfo.componentStack);
  }

  handleReset = () => {
    this.setState({ error: undefined, hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error?: Error;
  onReset: () => void;
}

const DefaultErrorFallback = ({
  error,
  onReset,
}: DefaultErrorFallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-8">
      <HugeiconsIcon
        className="text-destructive opacity-80"
        icon={Alert01Icon}
        size={64}
      />
      <div className="flex flex-col gap-2 text-center max-w-md">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("something_went_wrong" as any)}
        </h2>
        <p className="text-foreground/70">
          {error?.message || t("error_boundary_default_message" as any)}
        </p>
      </div>
      <Button onClick={onReset} variant="default">
        <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={16} />
        {t("try_again" as any)}
      </Button>
    </div>
  );
};

export const ErrorBoundary = ErrorBoundaryClass;
