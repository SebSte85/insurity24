import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Progress } from "../progress";

describe("Progress Component", () => {
  it("renders with the correct value", () => {
    render(<Progress value={50} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
