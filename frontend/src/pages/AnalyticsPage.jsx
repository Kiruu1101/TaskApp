import React from "react";

import { useGetAnalyticsQuery } from "../slices/taskApiSlice";
import Loader from "../components/Loader";

import AnalyticsContainer from "../components/AnalyticsContainer";
import { AnalysticsPageWrapper } from "../assets/styled-components/AnalyticsPageWrapper";
const AnalyticsPage = () => {
  const { data, isLoading } = useGetAnalyticsQuery();

  if (isLoading)
    return (
      <AnalysticsPageWrapper>
        <Loader />
      </AnalysticsPageWrapper>
    );
  return (
    <AnalysticsPageWrapper>
      <div className="head">Analytics</div>
      <div className="content">
        <AnalyticsContainer>
          <AnalyticsContainer.AnalyticsItem value={data["Backlog"]}>
            Backlog Tasks
          </AnalyticsContainer.AnalyticsItem>
          <AnalyticsContainer.AnalyticsItem value={data["To do"]}>
            To-do Tasks
          </AnalyticsContainer.AnalyticsItem>
          <AnalyticsContainer.AnalyticsItem value={data["In Progress"]}>
            In-Progress Tasks
          </AnalyticsContainer.AnalyticsItem>
          <AnalyticsContainer.AnalyticsItem value={data["Done"]}>
            Completed Tasks
          </AnalyticsContainer.AnalyticsItem>
        </AnalyticsContainer>
        <AnalyticsContainer>
          <AnalyticsContainer.AnalyticsItem value={data["low"]}>
            Low Priority
          </AnalyticsContainer.AnalyticsItem>
          <AnalyticsContainer.AnalyticsItem value={data["high"]}>
            High Priority
          </AnalyticsContainer.AnalyticsItem>
          <AnalyticsContainer.AnalyticsItem value={data["moderate"]}>
            Moderate Priority
          </AnalyticsContainer.AnalyticsItem>
          <AnalyticsContainer.AnalyticsItem value={data["due date"]}>
            Due Date Tasks
          </AnalyticsContainer.AnalyticsItem>
        </AnalyticsContainer>
      </div>
    </AnalysticsPageWrapper>
  );
};

export default AnalyticsPage;
