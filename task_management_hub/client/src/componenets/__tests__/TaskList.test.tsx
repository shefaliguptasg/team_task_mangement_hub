import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskList from "../TaskList.tsx";
import { Task } from "../../features/tasks/task.type.ts";


describe("TaskList", () => {
  it("renders empty state when no tasks are provided", () => {
    render(<TaskList tasks={[]} onDelete={() => {}} />);

    expect(screen.getByText(/No tasks found/i)).toBeInTheDocument();
  });

  it("renders tasks and calls onDelete when delete is clicked", () => {
    const deleteTask = vi.fn();
    const tasks: Task[] = [
      {
        id: "task-1",
        title: "Sample Task",
        description: "Test description",
        priority: "LOW",
        status: "TODO",
      },
    ];

    render(<TaskList tasks={tasks} onDelete={deleteTask} />);

    expect(screen.getByText("Sample Task")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(deleteTask).toHaveBeenCalledWith("task-1");
  });
});
