import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChecklistTaskBox from "./ChecklistTaskBox";
import { taskStatus } from "../utils/lanesAndStatus";
import { TaskCardWrapper } from "../assets/styled-components/TaskCardWrapper";
import ConfirmationWindow from "./ConfirmationWindow";
import Menus from "./Menu";
import Modal from "./Modal";
import { completedTask } from "../utils/calculate";
import toast from "react-hot-toast";
import CreateEditTask from "../components/CreateEditTask";
import {
  useDeleteTaskMutation,
  useEditChecklistByTaskAndChecklistIdMutation,
  useEditTaskMutation,
} from "../slices/taskApiSlice";
import PriorityTag from "./PriorityTag";
import DateTag from "./DateTag";
const TaskCard = ({
  ele,
  title,
  toggleCollapseMode,
  expandedChecklistsId,
  setExpandedChecklistsId,
}) => {
  const doneTask = completedTask(ele?.checklist);
  const totalTask = ele.checklist.length;
  const expanded = expandedChecklistsId?.includes(ele.id);
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask, { isLoading }] = useEditTaskMutation();
  const [editChecklistByTaskAndChecklistId, { isLoading: mutatingChecklist }] =
    useEditChecklistByTaskAndChecklistIdMutation();

  const onConfirmDelete = async () => {
    await deleteTask(ele.id).unwrap();
  };
  const onMutateTaskStatus = async (newStatus) => {
    const fieldsToUpdate = { status: newStatus };
    const taskId = ele.id;
    try {
      await editTask({ fieldsToUpdate, taskId }).unwrap();
      // to remove its state of expanded on mutating status so that when it
      // comes backs to same lane chekclist will not be expanded already
      toast.success("Status updated");
      setExpandedChecklistsId(() => {
        localStorage.setItem(
          `expandedChecklistId:${title}`,
          JSON.stringify(
            expandedChecklistsId.filter((checklistId) => checklistId !== ele.id)
          )
        );

        return expandedChecklistsId.filter(
          (checklistId) => checklistId !== ele.id
        );
      });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDoneChange = async (checklistId, e) => {
    const taskId = ele.id;
    const checkListStatus = { done: e.target.checked };
    try {
      await editChecklistByTaskAndChecklistId({
        taskId,
        checkListStatus,
        checklistId,
      }).unwrap();
      toast.success("Task updated");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const returnShareLink = (id) => {
    return `${window.location.href.split("/home")[0]}/share/${id}`;
  };
  return (
    <TaskCardWrapper $title={title}>
      <div className="priority-menu">
        <PriorityTag priority={ele.priority} />
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={ele.id} />
              <Menus.List id={ele.id}>
                <Modal.Open name="edit">
                  <Menus.Button>Edit</Menus.Button>
                </Modal.Open>
                <CopyToClipboard
                  text={returnShareLink(ele.id)}
                  onCopy={() => toast.success("Share link copied")}
                >
                  <Menus.Button>Share</Menus.Button>
                </CopyToClipboard>
                <Modal.Open name="delete">
                  <Menus.Button deleteBtn>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window windowName="delete">
                <ConfirmationWindow
                  confirmTo="delete"
                  onConfirm={onConfirmDelete}
                />
              </Modal.Window>
              <Modal.Window windowName="edit">
                <CreateEditTask taskToEdit={ele} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </div>

      <p
        data-tooltip-id="title"
        data-tooltip-content={ele.title}
        className="title"
        data-tooltip-variant="dark"
      >
        {ele.title}
      </p>
      <Tooltip id="title" />
      <div className="checklist-toggle-container">
        <p className="checklist-head">
          <span>Checklist</span>{" "}
          <span className="checklist-detail">
            ({doneTask} / {totalTask})
          </span>
        </p>
        <button
          className="collapse-expand-btn"
          onClick={() => toggleCollapseMode(ele.id)}
        >
          {expanded ? (
            <IoIosArrowUp className="expand-icon" />
          ) : (
            <IoIosArrowDown className="expand-icon" />
          )}
        </button>
      </div>
      {expanded && (
        <div className="checklist-tasks">
          {ele.checklist.map((checklist) => (
            <ChecklistTaskBox
              checklist={checklist}
              key={checklist._id}
              changeCheckList={handleDoneChange}
              disabled={mutatingChecklist}
            />
          ))}
        </div>
      )}

      <div
        className={`mutate-status-container ${
          ele["due date"] ? "" : "justify-end"
        }`}
      >
        {ele["due date"] && (
          <DateTag date={ele["due date"]} status={ele.status} />
        )}
        <p className="mutate-btns-container">
          {Object.keys(taskStatus).map((status) => {
            if (status === title?.toUpperCase()) return;
            return (
              <button
                className="mutate-status-btn"
                key={status}
                onClick={() => onMutateTaskStatus(taskStatus[status])}
                disabled={isLoading}
              >
                {status}
              </button>
            );
          })}
        </p>
      </div>
    </TaskCardWrapper>
  );
};

export default TaskCard;
