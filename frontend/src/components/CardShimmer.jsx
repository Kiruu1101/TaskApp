import React from "react";
import styled from "styled-components";
const CardShimmerWrapper = styled.aside`
  @keyframes shimmer {
    to {
      background-position-x: 0%;
    }
  }
  background: linear-gradient(
    -45deg,
    rgb(228, 232, 237) 45%,
    rgb(250, 250, 250) 50%,
    rgb(228, 232, 237) 55%
  );
  background-size: 300%;
  background-position-x: 100%;
  margin: 1rem 0px;
  padding: 1rem;
  height: 212.56px;
  width: 100%;
  border-radius: 20px;
  animation: shimmer 1s linear infinite;
`;
const CardShimmer = () => {
  return (
    <CardShimmerWrapper>
      <div className="shimmer"></div>
    </CardShimmerWrapper>
  );
};

export default CardShimmer;
