import React, { useRef, useState } from "react";
import { priorities } from "../utils/priority";
import ChecklistTaskBox from "./ChecklistTaskBox";
import { CreateEditContainerWrapper } from "../assets/styled-components/CreateEditTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { completedTask, formatedDate } from "../utils/calculate";
import toast from "react-hot-toast";
import {
  useCreateTaskMutation,
  useEditTaskMutation,
} from "../slices/taskApiSlice";
const CreateEditTask = ({ onCloseModal, taskToEdit }) => {
  const initialErrorState = {
    title: "",
    priority: "",
    checklistArr: "",
    checklistEmpty: "",
  };
  const [title, setTitle] = useState(() => {
    return taskToEdit ? taskToEdit.title : "";
  });
  const [taskPriority, setTaskPriority] = useState(() => {
    return taskToEdit ? taskToEdit.priority : "";
  });
  const [checkLists, setCheckLists] = useState(() => {
    return taskToEdit ? taskToEdit.checklist : [];
  });
  const [dueDate, setDueDate] = useState(() => {
    return taskToEdit && taskToEdit["due date"]
      ? formatedDate(taskToEdit["due date"], "MM-DD-YYYY")
      : null;
  });
  const [error, setError] = useState(initialErrorState);
  const [showCalendar, setShowCalendar] = useState(false);
  const addTaskContainerRef = useRef(null);
  const totalChecklist = checkLists.length;
  const completedChecklist = completedTask(checkLists);
  const [editTask] = useEditTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const toggleCalendarVisibility = () => {
    setShowCalendar(!showCalendar);
  };
  const pickDate = (e) => {
    setDueDate(e);
    setShowCalendar(false);
  };
  const handleDeleteCheckList = (id) => {
    setCheckLists((prev) => prev.filter((checklist) => checklist._id !== id));
  };

  const handleDoneChange = (id, e) => {
    const newArray = checkLists.map((checkList) =>
      checkList._id === id
        ? { ...checkList, done: e.target.checked }
        : checkList
    );
    setCheckLists(newArray);
  };
  const handleTaskChange = (e, id) => {
    setCheckLists((prev) =>
      prev.map((checklist) => {
        if (checklist._id === id) {
          return {
            ...checklist,
            task: e.target.value,
          };
        }
        return checklist;
      })
    );
  };

  const handleAddChecklist = () => {
    const newChecklist = {
      _id: Math.ceil(Math.random() * 100000000000000 + 1),
      task: "",
      done: false,
    };
    setCheckLists([...checkLists, newChecklist]);
    setTimeout(() => {
      if (addTaskContainerRef.current) {
        const lastChecklistItem = addTaskContainerRef.current.lastChild;
        lastChecklistItem.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 0);
  };

  const onCreateEdit = async () => {
    if (!title) {
      setError({ ...initialErrorState, title: "Title is required" });
      return toast.error("Title is required");
    } else {
      setError(initialErrorState);
    }
    if (!taskPriority) {
      setError({ ...initialErrorState, priority: "Priority is required" });
      return toast.error("Priority is required");
    } else {
      setError(initialErrorState);
    }
    if (checkLists.length === 0) {
      setError({
        ...initialErrorState,
        checklistArr: "Create atleast one subtask",
      });
      return toast.error("To create task at least one sub task is required");
    } else {
      setError(initialErrorState);
    }

    if (checkLists.some((checklist) => checklist.task === "")) {
      setError({
        ...initialErrorState,
        checklistEmpty: "Checklist task cannot be empty",
      });
      return toast.error("Checklist cannot be empty");
    } else {
      setError(initialErrorState);
    }

    let Task = {
      title,
      priority: taskPriority,
      checklist: checkLists.map((ele) => {
        const { _id, ...rest } = ele;
        return { ...rest };
      }),
    };
    if (dueDate) {
      Task["due date"] = formatedDate(dueDate, "MM-DD-YYYY");
    }

    if (taskToEdit) {
      const taskId = taskToEdit.id;
      const fieldsToUpdate = Task;
      try {
        await editTask({ fieldsToUpdate, taskId }).unwrap();
        toast.success("Task edited");
        onCloseModal();
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      try {
        await createTask(Task).unwrap();
        toast.success("New task created");
        onCloseModal();
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <CreateEditContainerWrapper>
      <div className="contents">
        <div className="title-box">
          <p className="title-label">
            Title<span className="asteric">*</span>
          </p>
          <input
            type="text"
            className="title-input"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error.title && <p className="error">{error.title}</p>}
        </div>
        <div className="select-priority-box">
          <div className="priority-btn-flex">
            <p className="select-label">
              Select Priority
              <span className="asteric">*</span>
            </p>
            <div className="priority-btns-container">
              {priorities.map((priority) => {
                return (
                  <button
                    id={`${priority}`}
                    className={
                      taskPriority === priority
                        ? "priority-btn active"
                        : "priority-btn"
                    }
                    key={priority}
                    onClick={() => setTaskPriority(priority)}
                  >
                    <span className={`${priority}`}></span>
                    <span>{priority} priority</span>
                  </button>
                );
              })}
            </div>
          </div>
          {error.priority && <p className="error">{error.priority}</p>}
        </div>
        <p className="checklist-detail">
          Checklist (<span>{completedChecklist}</span>/
          <span>{totalChecklist}</span>)<span className="asteric">*</span>
        </p>
        {error.checklistArr && <p className="error">{error.checklistArr}</p>}
        {totalChecklist > 0 && (
          <div className="checklist-container" ref={addTaskContainerRef}>
            {checkLists.map((checkList) => (
              <ChecklistTaskBox
                checklist={checkList}
                createEdit
                key={checkList._id || checkList.id}
                deleteCheckList={handleDeleteCheckList}
                changeCheckList={handleDoneChange}
                changeTask={handleTaskChange}
              />
            ))}
          </div>
        )}

        {error.checklistEmpty && (
          <p className="error">{error.checklistEmpty}</p>
        )}
        <button className="add-checklist" onClick={handleAddChecklist}>
          + Add
        </button>
      </div>
      <div className="cta-btns">
        <div className="duedate-btn">
          <button
            className="cta-btn due-date-btn"
            onClick={toggleCalendarVisibility}
          >
            {dueDate ? formatedDate(dueDate, "MM-DD-YYYY") : "Select Due Date"}
          </button>
          <div className="calendar">
            {showCalendar && (
              <DatePicker selected={dueDate} onChange={pickDate} inline />
            )}
          </div>
        </div>
        <div className="cancel-save-btns">
          <button onClick={onCloseModal} className="cta-btn cancel-btn">
            cancel
          </button>
          <button className="cta-btn save-btn" onClick={onCreateEdit}>
            Save
          </button>
        </div>
      </div>
    </CreateEditContainerWrapper>
  );
};

export default CreateEditTask;
