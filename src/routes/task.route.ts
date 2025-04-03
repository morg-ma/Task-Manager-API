import { Router } from "express";
import * as taskHandler from "../handlers/task.handler";
import * as taskValidate from "../middlewares/task.middleware";

const router = Router();

// GET
router.get("/", taskValidate.validateQueryParams, taskHandler.filteredTasks);
router.get("/:id", taskValidate.validateTaskId, taskHandler.getTaskById);

// POST
router.post("/", taskValidate.validateInsertTask, taskHandler.createTask);

// PUT
router.put(
  "/:id",
  taskValidate.validateTaskId,
  taskValidate.validateUpdateTask,
  taskHandler.updateTask
);

// DELETE
router.delete("/:id", taskValidate.validateTaskId, taskHandler.deleteTask);


export default router;
