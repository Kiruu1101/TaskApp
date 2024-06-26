import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
  getAnalytics,
  getTask,
  updateChecklistById,
} from "../controllers/taskcontroller.js";
import {
  taskEditValidation,
  taskInputValidation,
  validateParamsId,
  validateToggleChecklist,
  queryValidationForGetAllTask,
} from "../middlewares/validationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router
  .route("/")
  .get(authMiddleware, queryValidationForGetAllTask, getAllTask)
  .post(authMiddleware, taskInputValidation, createTask);
router.route("/analytics").get(authMiddleware, getAnalytics);
router
  .route("/:taskId/checklist/:checklistId")
  .patch(
    authMiddleware,
    validateParamsId,
    validateToggleChecklist,
    updateChecklistById
  );
router
  .route("/single/:taskId")
  .get(validateParamsId, getTask)
  .patch(authMiddleware, validateParamsId, taskEditValidation, editTask)
  .delete(authMiddleware, validateParamsId, deleteTask);
export default router;
