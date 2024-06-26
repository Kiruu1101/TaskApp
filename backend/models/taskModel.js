import mongoose from "mongoose";
import { priorities, taskStatus } from "../utils/utility.js";
const ChecklistSchema = new mongoose.Schema({ task: String, done: Boolean });
const TaskSchema = new mongoose.Schema(
  {
    title: String,
    priority: {
      type: String,
    },
    "due date": {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus["TO DO"],
    },
    checklist: [ChecklistSchema],

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
