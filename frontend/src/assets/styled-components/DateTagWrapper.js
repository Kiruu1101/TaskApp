import styled from "styled-components";
export const DateTagWrapper = styled.span`
  font-family: "Inter";
  padding: ${(props) => (props.$share ? "0.5rem 1.3rem" : "0.3rem 0.8rem")};
  border-radius: 10px;
  font-size: ${(props) => (props.$share ? "1rem" : "0.7rem")};
  background-color: var(--red);
  font-weight: 600;
  color: white;
  &.exceeded {
    background-color: var(--red);
  }
  &.not-exceeded {
    background-color: ${(props) =>
      props.$public ? "var(--red)" : "rgb(226, 226, 226)"};
    color: ${(props) => (props.$public ? "rgb(255,255,255)" : "var(--black)")};
  }
  &.done {
    background-color: ${(props) =>
      props.$public ? "var(--red)" : "var(--green)"};
  }
`;
