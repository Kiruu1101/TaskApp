import React from "react";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "../slices/taskApiSlice";
import Logo from "../components/Logo";
import { Tooltip } from "react-tooltip";
import Loader from "../components/Loader";
import PriorityTag from "../components/PriorityTag";
import Error from "../components/Error";
import { completedTask } from "../utils/calculate";
import ChecklistTaskBox from "../components/ChecklistTaskBox";
import DateTag from "../components/DateTag";
import { SharePageWrapper } from "../assets/styled-components/SharePageWrapper";
import toast from "react-hot-toast";
const SharePage = () => {
  const { taskId } = useParams();
  const { data, error, isLoading } = useGetTaskQuery(taskId);
  const task = data && data?.task;
  if (isLoading)
    return (
      <SharePageWrapper>
        <Loader />
      </SharePageWrapper>
    );
  if (error)
    return (
      <SharePageWrapper>
        <Error
          errorStatus={error.status}
          message={
            error.status === 404
              ? "Seems like task is deleted"
              : "Something Went Wrong"
          }
          sharePage
        />
      </SharePageWrapper>
    );
  return (
    <SharePageWrapper>
      <div className="header">
        <Logo sharepage />
      </div>
      <div className="task-container">
        <PriorityTag priority={task.priority} />
        <p
          data-tooltip-id="title"
          data-tooltip-content={task.title}
          className="title"
          data-tooltip-variant="dark"
        >
          {task.title}
        </p>
        <Tooltip id="title" place="left" />
        <p className="checklist-detail">
          <span>Checklist</span> <span>(</span>
          <span>{completedTask(task.checklist)}</span>
          <span>/</span>
          <span>{task.checklist.length}</span>
          <span>)</span>
        </p>
        <div className="checklist-container">
          <div className="task-boxes">
            {task.checklist.map((checklist) => (
              <ChecklistTaskBox
                checklist={checklist}
                key={checklist._id}
                changeCheckList={() => toast.error("Public Page, Read only")}
              />
            ))}
          </div>
        </div>
        {task["due date"] && (
          <p className="due-date-container">
            <span className="text">Due Date</span>
            <DateTag
              publicPage
              date={task["due date"]}
              status={task.status}
              share
            />
          </p>
        )}
      </div>
    </SharePageWrapper>
  );
};

export default SharePage;
