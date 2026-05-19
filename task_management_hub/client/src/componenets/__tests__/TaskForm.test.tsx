import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskForm from "../TaskForm.tsx";

describe("TaskForm", () => {
  it("renders all fields and the submit button", () => {
    render(<TaskForm onSubmit={() => {}} />);

    expect(screen.getByPlaceholderText(/Enter task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter task description/i)).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
  });

  it("submits valid form data and resets the form", async () => {
    const handleSubmit = vi.fn();

    render(<TaskForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
      target: { value: "New task" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter task description"), {
      target: { value: "A short description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        title: "New task",
        description: "A short description",
        priority: "LOW",
        status: "TODO",
      });
    });

    expect(screen.getByPlaceholderText("Enter task title")).toHaveValue("");
  });

  it("shows validation error when title is empty", async () => {
    render(<TaskForm onSubmit={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });
  });
});
