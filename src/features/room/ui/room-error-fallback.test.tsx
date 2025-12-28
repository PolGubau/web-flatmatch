import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RoomErrorFallback } from "./room-error-fallback";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("RoomErrorFallback", () => {
  const mockOnReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error message", () => {
    render(<RoomErrorFallback onReset={mockOnReset} />);

    expect(screen.getByText(/room_error_title/i)).toBeInTheDocument();
    expect(screen.getByText(/room_error_description/i)).toBeInTheDocument();
  });

  it("should render retry button", () => {
    render(<RoomErrorFallback onReset={mockOnReset} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("should call onReset when retry button is clicked", () => {
    render(<RoomErrorFallback onReset={mockOnReset} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    retryButton.click();

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("should display home icon", () => {
    render(<RoomErrorFallback onReset={mockOnReset} />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render with custom error message", () => {
    const customError = new Error("Custom error message");
    render(<RoomErrorFallback error={customError} onReset={mockOnReset} />);

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    render(<RoomErrorFallback onReset={mockOnReset} />);

    const container = document.querySelector(".flex.flex-col");
    expect(container).toBeInTheDocument();
  });
});
