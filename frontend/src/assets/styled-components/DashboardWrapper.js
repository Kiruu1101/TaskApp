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

// Styled components for "Add People" text and pop-ups

export const AddPeopleWrapper = styled.div`
  display: fixed;
  align-items: left;
  color: gray;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 55rem; /* Adjust spacing as needed */
  margin-left: 0.5rem;

  svg {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 500px;
  text-align: left;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    .cancel {
      background: none;
      border: 1px solid var(--red);
      font-weight: 600;
      color: var(--red);
      border-radius: 10px;
      text-align: center;

      width: 49%;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .add {
      background: #17a2b8;
      border: none;
      color: white;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      width: 49%
    }
  }

  .confirm {
    background: #17a2b8;
    border: none;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    width: 60%;
    text-align: center;
    margin: 0 auto;
    display: block;
  }
  &.confirmation-content {
    text-align: center;
    padding: 2rem;
    h4{
      // font-size: 1.2rem;
      margin-bottom: 1rem;
      margin-top: 2 rem;
    }
  }
`;
export const ErrorMessage = styled.p`
  color: var(--red);
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

