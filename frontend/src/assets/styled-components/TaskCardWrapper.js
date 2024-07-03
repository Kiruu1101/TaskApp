import styled from "styled-components";
export const TaskCardWrapper = styled.aside`
  background-color: white;
  margin: 1rem 0;
  padding: 1rem;
  height: auto;
  width: 100%;
  border-radius: 20px;
  .priority-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu-icon {
    font-size: 1.2rem;
  }
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 1.8rem;
    width: 60%;
  }

  .assignee-input {
    display: flex;
    align-items: left;
    margin-top: 1rem;

    label {
      font-size: 1rem;
      font-weight: 600;
      margin-right: 1rem;
    }

    input {
      flex: 1;
      height: 2rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      outline: none;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
      }
    }
  }

  .checklist-toggle-container {
    display: flex;
    font-family: "Inter";
    align-items: center;
    justify-content: space-between;
  }
  .checklist-head {
    font-size: 1rem;
    font-weight: 500;
  }
  .checklist-detail {
    font-size: 0.8rem;
    font-weight: 600;
  }
  .collapse-expand-btn {
    width: 21px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(236, 236, 236);
    border: none;
  }
  .expand-icon {
    font-size: 1.125rem;
    color: gray;
  }

  .mutate-status-container {
    font-family: "Inter";
    margin-top: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .mutate-btns-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .mutate-status-btn {
    font-size: 0.6rem;
    background-color: transparent;
    padding: 0.4rem 0.6rem;
    color: rgb(118, 117, 117);
    background-color: rgb(219, 219, 219);
    font-weight: 600;
    border-radius: 6px;
    border: transparent;
    cursor: pointer;
  }
`;
