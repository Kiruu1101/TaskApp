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
    gap: 1 rem;
    span {
      color: var(--black);
    }
  }
  .kanban {
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;
// 
export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .cancel {
    background-color: #e74c3c;
    color: #fff;
    border: none;
  }

  .add {
    background-color: #2ecc71;
    color: #fff;
    border: none;
  }

  .confirm {
    background-color: #3498db;
    color: #fff;
    border: none;
  }
`;

export const AddPeopleWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #3498db; /* Example color */

  &:hover {
    text-decoration: underline;
  }
`;

