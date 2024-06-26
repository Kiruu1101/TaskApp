import React, { useEffect, useState } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import TaskCard from "./TaskCard";
import { SwinLaneWrapper } from "../assets/styled-components/SwinLaneWrapper";
import Modal from "./Modal";
import CreateEditTask from "./CreateEditTask";
import useLocalStorageState from "../hooks/useLocalStorageState";
import CardShimmer from "./CardShimmer";

const SwimLane = ({ title, data, isFetching }) => {
  const [value, setValue] = useLocalStorageState(
    [],
    `expandedChecklistId:${title}`
  );

  const [expandedChecklistsId, setExpandedChecklistsId] = useState(value);
  const toggleCollapseMode = (id) => {
    setExpandedChecklistsId((prev) => {
      if (prev.includes(id)) {
        return prev.filter((taskId) => taskId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const collapseAll = () => {
    setExpandedChecklistsId([]);
  };
  useEffect(() => {
    setValue(expandedChecklistsId);
  }, [setValue, expandedChecklistsId]);
  return (
    <SwinLaneWrapper>
      <div className="swinlane-head">
        <h3>{title}</h3>
        <span className="icons">
          {title === "To do" && (
            <Modal>
              <Modal.Open name="create-task">
                <IoAdd className="add" />
              </Modal.Open>
              <Modal.Window windowName="create-task">
                <CreateEditTask />
              </Modal.Window>
            </Modal>
          )}
          <VscCollapseAll className="collapse-all" onClick={collapseAll} />
        </span>
      </div>
      <div className="task-card">
        {data?.map((ele) => {
          return isFetching ? (
            <CardShimmer key={ele.id} />
          ) : (
            <TaskCard
              ele={ele}
              key={ele.id}
              title={title}
              toggleCollapseMode={toggleCollapseMode}
              expandedChecklistsId={expandedChecklistsId}
              setExpandedChecklistsId={setExpandedChecklistsId}
            />
          );
        })}
      </div>
    </SwinLaneWrapper>
  );
};

export default SwimLane;
