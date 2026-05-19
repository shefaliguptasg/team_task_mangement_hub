import { Router } from "express";
import { TaskSchema } from "../schemas/task.schema.js";
import { createTask, deleteTask, getTasks } from "../controller/task.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { authorizeDelete } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getTasks);

router.post(
  "/",
  validate(TaskSchema),
  createTask
);

router.delete(
  "/:id",
  authorizeDelete,
  deleteTask
);

export default router;