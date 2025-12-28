import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorSection } from "./error-section";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ErrorSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with default props", () => {
    render(<ErrorSection />);

    expect(screen.getByText("error_title")).toBeInTheDocument();
    expect(screen.getByText("error_description")).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <ErrorSection
        description={"custom_description" as any}
        title={"custom_title" as any}
      />,
    );

    expect(screen.getByText("custom_title")).toBeInTheDocument();
    expect(screen.getByText("custom_description")).toBeInTheDocument();
  });

  it("should render navigation buttons by default", () => {
    render(<ErrorSection />);

    expect(screen.getByText("go_back")).toBeInTheDocument();
    expect(screen.getByText("go_home")).toBeInTheDocument();
  });

  it("should not render navigation buttons when withoutNavigation is true", () => {
    render(<ErrorSection withoutNavigation={true} />);

    expect(screen.queryByText("go_back")).not.toBeInTheDocument();
    expect(screen.queryByText("go_home")).not.toBeInTheDocument();
  });

  it("should call navigate when go back button is clicked", () => {
    render(<ErrorSection />);

    const backButton = screen.getByText("go_back").closest("button");
    backButton?.click();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("should render home link with correct href", () => {
    render(<ErrorSection />);

    const homeLink = screen.getByText("go_home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render icon", () => {
    render(<ErrorSection />);

    // Check that an svg is rendered
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have proper semantic structure", () => {
    render(<ErrorSection />);

    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
