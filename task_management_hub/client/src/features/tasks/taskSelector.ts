import { createSelector } from "@reduxjs/toolkit";
import { Task } from "./task.type.js";

export const selectFilteredTasks =
  createSelector(
    [
      (state) => state.tasks.tasks,
      (state) => state.tasks.search,
    ],
    (tasks, search) => {
      return tasks.filter((task :Task) =>
        task.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
  );