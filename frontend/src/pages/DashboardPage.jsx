import React, { useEffect, useState } from "react";
import { DashboardWrapper } from "../assets/styled-components/DashboardWrapper";
import KanbanBoard from "../components/KanbanBoard";
import { formatedDate } from "../utils/calculate";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FaUserFriends } from 'react-icons/fa';
import styled from "styled-components";

// Customized styled icon to have an outline effect
const OutlineUserFriends = styled(FaUserFriends)`
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5; /* Increase the stroke width for better visibility */
  font-size: 1.5rem; /* Increase size if needed */
`;

const DashboardPage = () => {
  const { daysFilter, setDayFilter, search, pathname } = useOutletContext();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!daysFilter) setDayFilter("week");
  }, [daysFilter, setDayFilter]);

  const onChange = (e) => {
    setDayFilter(e.target.value);
    const searchParams = new URLSearchParams(search);
    searchParams.set("filter", e.target.value);
    navigate(`${pathname}?${searchParams}`);
  };

  const handleAddEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      setIsModalOpen(false);
      setIsConfirmationOpen(true);
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }
  };

  return (
    <DashboardWrapper>
      <div className="dashboard-header">
        <h3 className="greet-user">
          <span>Welcome! </span> <span>{`${user.name}`}</span>
        </h3>
        <span>{formatedDate(Date.now(), "D MMM,YYYY")}</span>
      </div>
      <div className="title-filter-container">
        <h2 className="title">Board</h2>
        <AddPeopleWrapper onClick={() => setIsModalOpen(true)}>
          <OutlineUserFriends /> Add People
        </AddPeopleWrapper>

        <select
          name="filter"
          id="filter"
          value={daysFilter}
          className="select-filter"
          onChange={onChange}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <KanbanBoard />

      {isModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <h4>Add people to the Board</h4>
            <input
              type='email'
              placeholder="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            <div className="modal-buttons">
              <button className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="add" onClick={handleAddEmail}>
                Add Email
              </button>
            </div>
          </ModalContent>
        </ModalWrapper>
      )}

      {isConfirmationOpen && (
        <ModalWrapper>
          <ModalContent className="confirmation-content">
            <h4>{email} is added to the board</h4>
            <button className="confirm" onClick={() => setIsConfirmationOpen(false)}>
              Okay, got it!
            </button>
          </ModalContent>
        </ModalWrapper>
      )}
    </DashboardWrapper>
  );
};

export default DashboardPage;

// Styled components for "Add People" text and pop-ups
const AddPeopleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  cursor: pointer;
  font-size: 1.2rem; /* Increase text size if needed */
  margin-left: 20px; /* Adjust spacing to move it closer to the title */

  svg {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
`;

const ModalWrapper = styled.div`
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
  padding: 40px; /* Increase padding for larger modals */
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 500px; /* Increase width for larger modal */
  text-align: left; /* Default left alignment for input modal */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.2rem; /* Increase font size */
  }

  input {
    width: 100%;
    padding: 1rem; /* Increase input padding */
    margin-bottom: 1rem;
    font-size: 1.1rem; /* Increase input font size */
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    .cancel {
      background: none;
      border: 2px solid red;
      color: red;
      border-radius: 20px;
      text-align: center;
      width: 48%;
      padding: 0.75rem 1rem; /* Increase button padding */
      cursor: pointer;
      font-size: 1rem; /* Increase button font size */
    }

    .add {
      background: #17a2b8;
      border: none;
      color: white;
      padding: 0.75rem 1rem; /* Increase button padding */
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      width: 48%;
      font-size: 1rem; /* Increase button font size */
    }
  }

  .confirm {
    background: #17a2b8;
    border: none;
    color: white;
    padding: 0.75rem 1rem; /* Increase button padding */
    border-radius: 5px;
    cursor: pointer;
    width: 100%; /* Full width to center in confirmation modal */
    text-align: center;
    font-size: 1rem; /* Increase button font size */
  }

  &.confirmation-content {
    text-align: center; /* Center alignment for the confirmation modal */
    h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }
`;
