import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js"

export const getTasks = (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Tasks fetched successfully",
    data: TaskService.getAll(),
  });
};

export const createTask = (req: Request, res: Response) => {
  const task = TaskService.create(req.body);

  res.status(201).json({
    success: true,
    message: "Task created",
    data: task,
  });
};

export const deleteTask = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: "Task id is required",
    });
  }

  const deleted = TaskService.delete(taskId);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.json({
    success: true,
    message: "Task deleted",
  });
};