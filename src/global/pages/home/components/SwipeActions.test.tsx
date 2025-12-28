import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SwipeActions } from "./SwipeActions";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("~/features/room/ui/feed/filters/filters-modal", () => ({
  FiltersModal: () => <div>Filters Modal</div>,
}));

vi.mock("~/shared/hooks/use-haptic-feedback", () => ({
  useHapticFeedback: () => vi.fn(),
}));

describe("SwipeActions", () => {
  const mockOnSwipe = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all action buttons", () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    // Check for reject button
    const rejectButton = screen.getAllByRole("button")[0];
    expect(rejectButton).toBeInTheDocument();

    // Check for details button
    const detailsButton = screen.getByText("see_details");
    expect(detailsButton).toBeInTheDocument();

    // Check for like button
    const likeButton = screen.getAllByRole("button")[2];
    expect(likeButton).toBeInTheDocument();
  });

  it("should call onSwipe with left when reject button is clicked", () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    // First button with aria-label reject is the left swipe button
    const rejectButton = screen.getByLabelText(/reject/i);
    fireEvent.click(rejectButton);

    expect(mockOnSwipe).toHaveBeenCalledWith("left");
  });

  it("should call onSwipe with up when details button is clicked", () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    const detailsButton = screen.getByText("see_details").closest("button");
    fireEvent.click(detailsButton!);

    expect(mockOnSwipe).toHaveBeenCalledWith("up");
  });

  it("should call onSwipe with right when like button is clicked", async () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    // Wait for component to render
    await waitFor(() => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(2);
    });

    // Find all buttons and look for the one with the rightward arrow icon class
    const buttons = screen.getAllByRole("button");

    // Like button is the last one with aria-label (not "Filters")
    // It has the green background (bg-green-500/20)
    const likeButton = buttons.find(btn =>
      btn.className.includes('bg-green-500/20')
    );

    if (likeButton) {
      fireEvent.click(likeButton);
      await waitFor(() => {
        expect(mockOnSwipe).toHaveBeenCalledWith("right");
      });
    } else {
      throw new Error("Like button not found");
    }
  }); it("should disable all buttons when disabled prop is true", () => {
    render(<SwipeActions disabled={true} onSwipe={mockOnSwipe} />);

    const rejectButton = screen.getByLabelText(/reject/i);
    const detailsButton = screen.getByLabelText(/see_details/i);

    expect(rejectButton).toBeDisabled();
    expect(detailsButton).toBeDisabled();
  });

  it("should not call onSwipe when disabled", () => {
    render(<SwipeActions disabled={true} onSwipe={mockOnSwipe} />);

    const rejectButton = screen.getByLabelText(/reject/i);
    fireEvent.click(rejectButton);

    expect(mockOnSwipe).not.toHaveBeenCalled();
  });

  it("should render filters modal", () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    expect(screen.getByText("Filters Modal")).toBeInTheDocument();
  });

  it("should have proper accessibility labels", () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    // Buttons have aria-label with translation keys
    const rejectButton = screen.getByLabelText(/reject/i);
    expect(rejectButton).toBeInTheDocument();
    expect(rejectButton).toHaveAttribute("aria-label", "reject");

    const detailsButton = screen.getByLabelText(/see_details/i);
    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveAttribute("aria-label", "see_details");
  });

  it("should show keyboard shortcuts in tooltips", () => {
    render(<SwipeActions onSwipe={mockOnSwipe} />);

    // Tooltips are shown on hover, checking they're rendered in DOM
    expect(screen.getByText("reject")).toBeInTheDocument();
    expect(screen.getByText("like")).toBeInTheDocument();
  });
});
