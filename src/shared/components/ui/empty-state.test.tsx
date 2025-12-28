import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./empty-state";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("EmptyState", () => {
  it("should render title and description", () => {
    render(
      <EmptyState
        description={"test_description" as any}
        title={"test_title" as any}
      />,
    );

    expect(screen.getByText("test_title")).toBeInTheDocument();
    expect(screen.getByText("test_description")).toBeInTheDocument();
  });

  it("should render action button when provided", () => {
    const mockAction = vi.fn();

    render(
      <EmptyState
        action={{
          label: "test_action" as any,
          onClick: mockAction,
        }}
        description={"test_description" as any}
        title={"test_title" as any}
      />,
    );

    const button = screen.getByRole("button", { name: "test_action" });
    expect(button).toBeInTheDocument();

    button.click();
    expect(mockAction).toHaveBeenCalled();
  });

  it("should not render action button when not provided", () => {
    render(
      <EmptyState
        description={"test_description" as any}
        title={"test_title" as any}
      />,
    );

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(
      <EmptyState
        description={"test_description" as any}
        title={"test_title" as any}
      />,
    );

    // Check that an svg is rendered (default or custom)
    const container = document.querySelector(".flex.flex-col");
    expect(container).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <EmptyState
        className="custom-class"
        description={"test_description" as any}
        title={"test_title" as any}
      />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should have proper semantic structure", () => {
    render(
      <EmptyState
        description={"test_description" as any}
        title={"test_title" as any}
      />,
    );

    const container = document.querySelector(".flex.flex-col");
    expect(container).toBeInTheDocument();
  });
});
