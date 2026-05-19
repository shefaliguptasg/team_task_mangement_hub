import { render ,screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorAlert from "../ErrorElert.tsx";

describe("ErrorAlert", () => {
  it("renders the error message when provided", () => {
    render(<ErrorAlert message="something went wrong"></ErrorAlert>);
    expect(screen.getByText("something went wrong")).toBeInTheDocument();
  });
});
