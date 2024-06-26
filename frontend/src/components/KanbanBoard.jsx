import React from "react";
import SwimLane from "./SwimLane";
import { swimlanes } from "../utils/lanesAndStatus";
import { KanbanBoardWrapper } from "../assets/styled-components/KanbanBoardWrapper";
import Menus from "./Menu";
import { useGetAllTaskQuery } from "../slices/taskApiSlice";
import Loader from "./Loader";
import { useOutletContext } from "react-router-dom";
const KanbanBoard = () => {
  const { daysFilter } = useOutletContext();

  const queryParams = { filter: daysFilter };
  const {
    data: tasks,
    isLoading,
    isFetching,
  } = useGetAllTaskQuery(queryParams);
  let data = tasks?.manipulatedTaskObj;
  return (
    <Menus>
      <KanbanBoardWrapper>
        <div className="kanban-container">
          {isLoading ? (
            <Loader />
          ) : (
            swimlanes.map((lane) => (
              <SwimLane
                title={lane.title}
                data={data[lane.title]}
                key={lane.title}
                isFetching={isFetching}
              />
            ))
          )}
        </div>
      </KanbanBoardWrapper>
    </Menus>
  );
};

export default KanbanBoard;
