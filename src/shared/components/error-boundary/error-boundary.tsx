import {
  Alert01Icon,
  ArrowReloadHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Component, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ts } from "~/shared/i18n/translation-helpers";
import { errorHandler } from "~/shared/utils/error-handler";
import { logger } from "~/shared/utils/logger";
import { ErrorSection } from "../error-section";
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
    logger.error("Component stack", error, {
      componentStack: errorInfo.componentStack,
    });
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
        <ErrorSection
          error={this.state.error}
          icon={Alert01Icon}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ErrorBoundaryClass;
