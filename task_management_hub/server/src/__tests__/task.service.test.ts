import { TaskService } from "../services/task.service.js";

describe("TaskService", () => {
  it("creates a task with an id and includes it in the task list", () => {
    const task = TaskService.create({
      title: "Test task",
      description: "Service test",
      priority: "MEDIUM",
      status: "TODO",
    });

    expect(task.id).toBeTruthy();
    expect(task).toMatchObject({
      title: "Test task",
      description: "Service test",
      priority: "MEDIUM",
      status: "TODO",
    });
    expect(TaskService.getAll()).toContainEqual(task);

    TaskService.delete(task.id);
  });

  it("returns false when deleting a task that does not exist", () => {
    expect(TaskService.delete("nonexistent-id")).toBe(false);
  });

  it("removes a task when delete is called with an existing id", () => {
    const task = TaskService.create({
      title: "Delete test",
      priority: "LOW",
      status: "TODO",
    });

    expect(TaskService.delete(task.id)).toBe(true);
    expect(TaskService.getAll()).not.toContainEqual(task);
  });
});
