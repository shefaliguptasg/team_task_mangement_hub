import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../SearchBar.tsx";

describe("SearchBar", () => {
  it("renders with the given value and placeholder", () => {
    render(<SearchBar value="test value" onChange={() => {}} />);

    expect(screen.getByPlaceholderText("Search by title")).toHaveValue(
      "test value",
    );
  });

  it("calls onChange when the user types", () => {
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    fireEvent.change(screen.getByPlaceholderText("Search by title"), {
      target: { value: "updated" },
    });

    expect(handleChange).toHaveBeenCalledWith("updated");
  });
});
