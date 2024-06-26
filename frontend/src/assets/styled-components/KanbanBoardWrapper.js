import styled from "styled-components";
export const KanbanBoardWrapper = styled.div`
  height: calc(100vh - 8.7rem);
  .kanban-container {
    height: 100%;
    display: flex;
    overflow-x: scroll;
    padding: 0 2rem;
    justify-content: space-between;
    gap: 2rem;
    &::-webkit-scrollbar {
      height: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--primary-400);
      border-radius: 20px;
    }
  }
`;
