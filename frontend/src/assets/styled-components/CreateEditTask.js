import styled from "styled-components";

export const CreateEditContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 650px;
  height: 500px;

  .title-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 0.3rem;
  }

  .title-label,
  .select-label,
  .checklist-detail {
    font-size: 1rem;
    font-weight: 500;
  }

  .asteric {
    color: var(--red);
    letter-spacing: 1.3px;
  }

  .title-input {
    border: 1px solid rgb(226, 226, 226);
    height: 40px;
    color: rgb(155, 149, 159);
    font-size: 1rem;
    border-radius: 7px;
    padding: 1.2rem;
    &::placeholder {
      color: gainsboro;
    }
    &:active,
    &:focus {
      outline: rgb(226, 226, 226);
    }
  }

  .select-priority-box {
    margin-top: 1.5rem;
  }

  .priority-btn-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .error {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--red);
    margin-top: 0.8rem;
  }

  .priority-btns-container {
    display: flex;
    gap: 1.3rem;
  }

  .priority-btn {
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    color: rgb(118, 117, 117);
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 5px;
    gap: 0.5rem;
    background-color: inherit;
  }

  .active {
    background-color: rgb(226, 226, 226);
  }

  .high,
  .low,
  .moderate {
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }

  .high {
    background-color: var(--red);
  }

  .low {
    background-color: rgb(99, 192, 91);
  }

  .moderate {
    background-color: var(--blue);
  }

  .checklist-detail {
    margin: 1.4rem 0 0.4rem 0;
    font-size: 0.9rem;
  }

  .checklist-container {
    max-height: 11rem;
    overflow-y: scroll;
    padding: 0 0.2rem;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--primary-400);
    }
  }

  .add-checklist {
    font-size: 1rem;
    background-color: transparent;
    letter-spacing: 1.7px;
    color: rgb(155, 149, 159);
    margin-top: 1.2rem;
    cursor: pointer;
    border: transparent;
  }

  .calendar {
    position: fixed;
    bottom: 5rem;
  }

  .cta-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cta-btn {
    font-size: 1.2rem;
    padding: 0.5rem 2.5rem;
    border-radius: 10px;
    border: none;
    background-color: transparent;
    transition: all 0.3s;
    cursor: pointer;
  }

  .due-date-btn {
    border: 1.3px solid rgb(226, 226, 226);
    color: rgb(118, 117, 117);
  }

  .cancel-btn {
    border: 1.3px solid var(--red);
    background-color: var(--white);
    color: var(--red);
    font-weight: 600;
  }

  .save-btn {
    border: 1.3px solid var(--primary-500);
    color: var(--white);
    background-color: var(--primary-500);
  }

  .cancel-save-btns {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .assignee-box {
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
  }

  .assignee-items {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .assign-button {
    background-color: white;
  border-width: 1px;
  border-radius: 10px;
  border-color: gray;
  align-item: right;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
  }

  .assignee-list {
    position: absolute;
    padding : 1rem;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 200px;
    overflow-y: auto;

    .assignee-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-bottom: none;
      }

      span {
        margin-right: 10px;
      }
    }
  }

  .assignee-input {
    border: 1px solid rgb(226, 226, 226);
    height: 40px;
    width: 560px;
    color: rgb(155, 149, 159);
    font-size: 1rem;
    border-radius: 7px;
    padding: 1.2rem;
    margin-left: 10px;
    // background-color: white;
    &::placeholder {
      color: gainsboro;
    }
    &:active,
    &:focus {
      outline: rgb(226, 226, 226);
    }
  }
`;
export const AssignButton = styled.button`
  background-color: white;
  border-width: 1px;
  border-radius: 10px;
  color: gray;
  border-color: var(--gray);
  align-item: center;
  font-size: 0.9rem;
  padding: 5px;
  // margin-right:0px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: white;
  }
`;
export const AssigneeContainer = styled.div`
  position: relative;
  padding: 1rem;
  width: 565px;
  margin-left: 10px;
`;