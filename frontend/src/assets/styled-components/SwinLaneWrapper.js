import styled from "styled-components";
export const SwinLaneWrapper = styled.div`
  width: 400px;
  height: 97%;
  border-radius: 15px;
  background-color: var(--primary-300);
  padding: 1rem;
  flex-shrink: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 15px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-400);
    border-radius: 15px;
    cursor: pointer;
  }
  .swinlane-head {
    display: flex;
    background-color: inherit;
    top: 0;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-weight: 500;
    }
  }
  .icons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .add,
  .collapse-all {
    font-size: 1.5rem;
    color: #858585;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
