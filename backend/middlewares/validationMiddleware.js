import { validationResult, body, param, query } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/customErrors.js";
import { priorities, taskStatus } from "../utils/utility.js";
import mongoose from "mongoose";
import TaskModel from "../models/taskModel.js";
import UserModel from "../models/userModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = result
          .array()
          .map((error) => error.msg)
          .join(",");

        if (
          errors?.split(",")?.join(",")?.includes("no task") ||
          errors?.split(",")?.join(",")?.includes?.("no checklist")
        ) {
          throw new NotFoundError(errors);
        } else if (errors.split(",").join(",").startsWith("You are")) {
          throw new UnAuthorizedError(errors);
        } else if (errors) throw new BadRequestError(errors);
      }
      next();
    },
  ];
};

const taskInputValidation = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("priority")
    .notEmpty()
    .withMessage("task priority is required")
    .isIn(priorities)
    .withMessage("Priority should be high,low or moderate only"),
  body("checklist")
    .isArray({ min: 1 })
    .withMessage(
      "Checklist needs to be an array with atleast one expected element"
    ),
  body("status")
    .default("To do")
    .isIn(Object.values(taskStatus))
    .withMessage("status needs to either To do, In Progress,Done or Backlog"),
  body("checklist.*.task").notEmpty().withMessage("task cannot be empty"),
  body("checklist.*.done").isBoolean().withMessage("done needs be a boolean"),
  body("due date")
    .optional()
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new BadRequestError("Invalid due date");
      }
      return true;
    }),
]);
// I cannot use taskInputValidation for edit task as i will send patch request to the edit route which
//  means i don't need to send all fields to edit only field which required updation is send to edit route
// Basically for status mutation now
const taskEditValidation = withValidationErrors([
  body("title").optional().notEmpty().withMessage("title cannot be empty"),
  body("priority")
    .optional()
    .notEmpty()
    .withMessage("task priority cannot be empty")
    .isIn(priorities)
    .withMessage("Priority should be high,low or moderate only"),
  body("checklist")
    .optional()
    .isArray({ min: 1 })
    .withMessage(
      "Checklist needs to be an array with atleast one expected element"
    ),
  body("status")
    .optional()
    .isIn(Object.values(taskStatus))
    .withMessage("status needs to either To do, In Progress,Done or Backlog"),
  body("checklist.*.task")
    .optional()
    .notEmpty()
    .withMessage("task cannot be empty"),
  body("checklist.*.done")
    .optional()
    .isBoolean()
    .withMessage("done needs to be a boolean"),
  body("due date")
    .optional()
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new BadRequestError("Invalid due date");
      }
      return true;
    }),
]);

const queryValidationForGetAllTask = withValidationErrors([
  query("filter")
    .optional()
    .isIn(["today", "week", "month"])
    .withMessage("Filter needs to be either day,week or month"),
]);
const validateParamsId = withValidationErrors([
  param("taskId").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error(`task id is invalid mongodb id`);
    const task = await TaskModel.findById(value);
    if (!task) throw new Error(`no task with ${value} id`);
    if (req.method === "GET") return;

    const isOwner = task.createdBy.toString() === req.user._id.toString();
    if (!isOwner)
      throw new UnAuthorizedError("You are not authorized to mutate this task");
  }),
  param("checklistId")
    .optional()
    .custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new Error(`checklist id is invalid mongodb id`);
      const { taskId } = req.params;
      const task = await TaskModel.findById(taskId);

      const requiredChecklist = task?.checklist.some(
        (checklist) => checklist._id.toString() === value
      );

      if (!requiredChecklist)
        throw new Error(
          `no checklist found with ${value} id for the task  of ${taskId} id`
        );
    }),
]);
const validateToggleChecklist = withValidationErrors([
  body("done")
    .notEmpty()
    .withMessage("done field is required")
    .isBoolean()
    .withMessage("done needs to be either true or false"),
]);

const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw new BadRequestError("email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast of 8 character"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirmation password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new BadRequestError(
          "Password and confirmation password do not match"
        );
      }
      return true;
    }),
]);
const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("This field is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("This field is required"),
]);

const validateUpdateUserInput = withValidationErrors([
  body("name").optional().notEmpty().withMessage("name field cannot be empty"),
  body("oldPassword")
    .optional()
    .notEmpty()
    .withMessage("Old password needed to update password")
    .custom((value, { req }) => {
      if (value && !req.body.password)
        throw new Error(
          "New password is required when updating the old password"
        );
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("New Password needs to be of 8 character")
    .custom((value, { req }) => {
      if (value && !req.body.oldPassword)
        throw new Error(
          "Old password is required to validate before changing password"
        );
      return true;
    }),
]);

export {
  taskInputValidation,
  taskEditValidation,
  validateParamsId,
  validateToggleChecklist,
  queryValidationForGetAllTask,
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput,
};
