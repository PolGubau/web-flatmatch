import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatErrorFallback } from "./chat-error-fallback";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ChatErrorFallback", () => {
  const mockOnReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error message", () => {
    render(<ChatErrorFallback onReset={mockOnReset} />);

    expect(screen.getByText(/chat_error_title/i)).toBeInTheDocument();
    expect(screen.getByText(/chat_error_description/i)).toBeInTheDocument();
  });

  it("should render retry button", () => {
    render(<ChatErrorFallback onReset={mockOnReset} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("should call onReset when retry button is clicked", () => {
    render(<ChatErrorFallback onReset={mockOnReset} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    retryButton.click();

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("should display error icon", () => {
    render(<ChatErrorFallback onReset={mockOnReset} />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render with custom error message", () => {
    const customError = new Error("Connection failed");
    render(<ChatErrorFallback error={customError} onReset={mockOnReset} />);

    expect(screen.getByText("Connection failed")).toBeInTheDocument();
  });

  it("should display message icon", () => {
    render(<ChatErrorFallback onReset={mockOnReset} />);

    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
