import styled from "styled-components";
export const DashboardWrapper = styled.section`
  width: calc(100vw - 250px);
  height: 100%;

  .dashboard-header,
  .title-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
  .dashboard-header {
    span {
      color: rgb(128, 128, 128);
    }
  }
  .title-filter-container {
    .title {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
  .select-filter {
    border: none;
    cursor: pointer;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border: none;
    }
  }
  .greet-user {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
      color: var(--black);
    }
  }
  .kanban {
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;
