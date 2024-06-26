import { StatusCodes } from "http-status-codes";
import TaskModel from "../models/taskModel.js";
import {
  calculateDateRange,
  dueDateNotExceeded,
  formatDate,
  taskStatus,
} from "../utils/utility.js";
import mongoose from "mongoose";

// @desc Get all task
// @desc Get /api/v1/tasks
// @desc private

const getAllTask = async (req, res) => {
  let filterDays = req.query.filter || "today";

  const tasks = await TaskModel.aggregate([
    {
      $match: {
        createdBy: req.user._id,
        createdAt: {
          $gt: calculateDateRange(filterDays),
        },
      },
    },
    { $sort: { updatedAt: 1 } },
    {
      $group: {
        _id: "$status",
        tasks: {
          $push: {
            id: "$_id",
            title: "$title",
            checklist: "$checklist",
            priority: "$priority",
            "due date": {
              $dateToString: { format: "%m-%d-%Y", date: "$due date" },
            },
            status: "$status",
          },
        },
      },
    },
  ]);
  // tasks output
  //------------------------------------------------------------//
  //     "tasks": [
  //         {
  //             "_id": "Done",
  //             "tasks": [
  //                 {
  //                     "id": "65d589e164727ea7af3d9209",
  //                     "title": "User Testing",
  //                     "checklist": [
  //                         [Objects]
  //                     ],
  //                     "priority": "moderate",
  //
  //                     "status": "Done"
  //                 }
  //             ]
  //         },
  //          { _id: 'Backlog', tasks: [ [Object] ] },
  //  { _id: 'To do', tasks: [ [Object], [Object], [Object] ] },
  //     ]
  // ---------------------------------------------------------------------//

  let manipulatedTaskObj = {};
  tasks.forEach(({ tasks, _id }) => {
    manipulatedTaskObj[_id] = tasks;
  });
  // manipulatedTaskObj output
  //------------------------------------------------------------------------//
  // {
  //    Backlog: [
  //    [Object]
  //    ],
  //    'To do': [
  //      [Object]
  //    ],
  //    Done: [
  //      [Object]
  //    ]
  //  }
  // still one status missing which was not created by user  yet, in here that is "In Progress"
  //-----------------------------------------------------------------------//

  //-----------------------------------------------------------------------//
  const emptyStatus = Object.values(taskStatus).filter(
    (status) => !Object.keys(manipulatedTaskObj).includes(status)
  );

  if (emptyStatus.length > 0) {
    emptyStatus.forEach((status) => {
      manipulatedTaskObj[status] = [];
    });
  }
  // pushing [] for the status that is not created yet
  //---------------------------------------------------------------------------//
  //   {
  //     "manipulatedTaskObj": {
  //         "Done": [
  //          [Object]
  //         ],
  //         "Backlog": [
  //            [Object]
  //         ],
  //         "To do": [
  //           [Object]
  //         ],
  //         "In Progress": []
  //     }
  // }
  // this is the response i will send to frontend
  //---------------------------------------------------------------------------//
  res.status(StatusCodes.OK).json({ manipulatedTaskObj });
};

// @desc create task
// @desc post /api/v1/tasks
// @desc private
const createTask = async (req, res) => {
  let newTask = {};
  if (req.body["due date"]) {
    console.log();
    newTask = {
      ...req.body,
      "due date": formatDate(req.body?.["due date"]),
    };
  } else {
    newTask = { ...req.body };
  }
  newTask.createdBy = req.user._id;
  const task = await TaskModel.create(newTask);
  res.status(StatusCodes.CREATED).json({ task });
};

// @desc Get analytics of task
// @desc Get /api/v1/tasks/analytics
// @desc private
const getAnalytics = async (req, res) => {
  const tasks = await TaskModel.find({ createdBy: req.user._id });
  const statusWiseAnalyitcs = tasks.reduce(
    (acc, task) => {
      let status = task.status;
      if (acc.hasOwnProperty(status)) {
        acc[status]++;
      } else {
        acc[status] = 1;
      }
      return acc;
    },
    {
      "To do": 0,
      Backlog: 0,
      "In Progress": 0,
      Done: 0,
    }
  );
  const priorityWiseAnalytics = tasks.reduce(
    (acc, task) => {
      if (task.status === "Done") return acc;
      const priority = task.priority;
      if (acc.hasOwnProperty(priority)) {
        acc[priority]++;
      } else {
        acc[priority] = 1;
      }
      return acc;
    },
    {
      high: 0,
      low: 0,
      moderate: 0,
    }
  );
  const notCompletedTasksWithDueDateAnalytics = tasks.reduce((acc, task) => {
    if (
      (task["due date"] && task.status === "Done") ||
      (task["due date"] &&
        task.status !== "Done" &&
        !dueDateNotExceeded(task["due date"])) ||
      !task["due date"]
    )
      return acc;
    if (
      task["due date"] &&
      task.status !== "Done" &&
      dueDateNotExceeded(task["due date"])
    ) {
      return acc + 1;
    }
  }, 0);
  res.status(StatusCodes.OK).json({
    ...statusWiseAnalyitcs,
    ...priorityWiseAnalytics,
    "due date": notCompletedTasksWithDueDateAnalytics,
  });
};
// @desc update single checklist
// @desc Get /api/v1/task/:taskId/checklist/:checklistId
// @desc private
const updateChecklistById = async (req, res) => {
  const { taskId, checklistId } = req.params;
  const task = await TaskModel.findById(taskId);
  const checklist = task.checklist.find(
    (checklist) => checklist._id.toString() === checklistId
  );
  checklist.done = req.body.done;
  await task.save();

  res.status(StatusCodes.OK).json({ task });
};

// @desc Get single task
// @desc Get /api/v1/tasks/single/:taskId
// @desc private
const getTask = async (req, res) => {
  const { taskId } = req.params;
  //populating the task with user name and email id
  // in case in future to show who created that task in public page
  const task = await TaskModel.findById(taskId).populate(
    "createdBy",
    "name email -_id"
  );
  res.status(StatusCodes.OK).json({ task });
};

// @desc edit single task
// @desc (put/patch) /api/v1/tasks/single/:taskId
// @desc private
const editTask = async (req, res) => {
  const { taskId } = req.params;

  let updateValueObj = {};
  if (req.body["due date"]) {
    updateValueObj = {
      ...req.body,
      ["due date"]: formatDate(req.body?.["due date"]),
    };
  } else {
    updateValueObj = { ...req.body };
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    updateValueObj,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ updatedTask });
};

// @desc delete single task
// @desc delete /api/v1/tasks/single/:taskId
// @desc private
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await TaskModel.findByIdAndDelete(taskId);
  res.status(StatusCodes.OK).json({ message: "Task deleted" });
};
export {
  getAllTask,
  getAnalytics,
  getTask,
  deleteTask,
  editTask,
  createTask,
  updateChecklistById,
};
