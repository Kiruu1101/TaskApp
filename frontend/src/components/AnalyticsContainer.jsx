import React from "react";
import { Container, Item } from "../assets/styled-components/Analytics";

const AnalyticsContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const AnalyticsItem = ({ children, value }) => {
  return (
    <Item>
      <p className="indentaion-and-text">
        <span className="indentation"></span>
        <span className="text">{children}</span>
      </p>
      <span className="value">{value}</span>
    </Item>
  );
};
AnalyticsContainer.AnalyticsItem = AnalyticsItem;
export default AnalyticsContainer;
