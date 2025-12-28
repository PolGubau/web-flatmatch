import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProfileErrorFallback } from "./profile-error-fallback";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ProfileErrorFallback", () => {
  const mockOnReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error message", () => {
    render(<ProfileErrorFallback onReset={mockOnReset} />);

    expect(screen.getByText("profile_error_title")).toBeInTheDocument();
    expect(
      screen.getByText("profile_error_description"),
    ).toBeInTheDocument();
  });

  it("should render retry button", () => {
    render(<ProfileErrorFallback onReset={mockOnReset} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("should call onReset when retry button is clicked", () => {
    render(<ProfileErrorFallback onReset={mockOnReset} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    retryButton.click();

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("should display title and description", () => {
    render(<ProfileErrorFallback onReset={mockOnReset} />);

    expect(screen.getByText(/profile_error_title/i)).toBeInTheDocument();
    expect(screen.getByText(/profile_error_description/i)).toBeInTheDocument();
  });

  it("should render with custom error message", () => {
    const customError = new Error("User not found");
    render(<ProfileErrorFallback error={customError} onReset={mockOnReset} />);

    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  it("should display user icon", () => {
    render(<ProfileErrorFallback onReset={mockOnReset} />);

    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
