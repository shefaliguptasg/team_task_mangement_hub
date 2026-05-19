import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import api from "../../api/axios.js";

import type { newTask, TaskState } from "./task.type.js";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/tasks");

      return response.data.data;
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data as { message?: string })?.message
          : undefined;

      return thunkAPI.rejectWithValue(
        message || "Failed to fetch tasks",
      );
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: newTask, thunkAPI) => {
    try {
      const response = await api.post("/tasks", task);

      return response.data.data;
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data as { message?: string })?.message
          : undefined;

      return thunkAPI.rejectWithValue(
        message || "Failed to create task",
      );
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/tasks/${id}`);

      return id;
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data as { message?: string })?.message
          : undefined;

      return thunkAPI.rejectWithValue(
        message || "Failed to delete task",
      );
    }
  },
);

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  search: "",
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {


    // FETCH TASKS

    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });

    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;

      state.error = (action.payload as string) || "Something went wrong";
    });

    // CREATE TASK

    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;

      state.tasks.unshift(action.payload);
    });

    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;

      state.error = (action.payload as string) || "Something went wrong";
    });

    // DELETE TASK

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;

      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;

      state.error = (action.payload as string) || "Something went wrong";
    });
  },
});

export const { setSearch, clearError } = taskSlice.actions;

export default taskSlice.reducer;
