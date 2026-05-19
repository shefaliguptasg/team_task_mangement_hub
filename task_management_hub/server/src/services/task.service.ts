import { v4 as uuid } from "uuid";
import type { CreateTaskDto, Task } from "../types/task.type.js";

const tasks: Task[] = [];

export const TaskService = {
  getAll: () => tasks,

  create: (task: CreateTaskDto) => {
    const newTask = {
      id: uuid(),
      ...task,
    };

    tasks.push(newTask);

    return newTask;
  },

  delete: (id: string) => {
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);

    return true;
  },
};
