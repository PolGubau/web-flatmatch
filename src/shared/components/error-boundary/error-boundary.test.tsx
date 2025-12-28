import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { errorHandler } from "~/shared/utils/error-handler";
import { ErrorBoundary } from "./error-boundary";

vi.mock("~/shared/utils/error-handler", () => ({
  errorHandler: {
    logError: vi.fn(),
  },
}));

vi.mock("~/shared/utils/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

describe("ErrorBoundary", () => {
  it("should render children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render error fallback when error occurs", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => { });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    // Check that error fallback is rendered by looking for the error message
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    expect(errorHandler.logError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it("should render custom fallback when provided", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => { });

    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it("should call onReset when reset button is clicked", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => { });
    const onReset = vi.fn();

    render(
      <ErrorBoundary onReset={onReset}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    // Get the button (it's the only button)
    const resetButton = screen.getByRole("button");
    resetButton.click();

    expect(onReset).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it("should reset error state after clicking reset", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => { });

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/test error/i)).toBeInTheDocument();

    const resetButton = screen.getByRole("button");
    resetButton.click();

    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("No error")).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it("should display error message in fallback", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => { });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/test error/i)).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
