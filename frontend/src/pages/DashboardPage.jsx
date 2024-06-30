import React, { useEffect, useState } from "react";
import { DashboardWrapper } from "../assets/styled-components/DashboardWrapper";
import KanbanBoard from "../components/KanbanBoard";
import { formatedDate } from "../utils/calculate";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserFriends } from 'react-icons/fa';

import styled from "styled-components";

const OutlineUserFriends = styled(FaUserFriends)`
  fill: none;
  stroke: currentColor;
`;

const DashboardPage = () => {
  const { daysFilter, setDayFilter, search, pathname } = useOutletContext();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [email, setEmail] = useState("");

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
      setEmailError("Invalid email format");
    }else {
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
        {/*  */}
        <AddPeopleWrapper onClick={() => setIsModalOpen(true)}>
          {/* <AiOutlineUserAdd/>Add People */}
          <OutlineUserFriends style={{ strokeWidth: 40 }} /> Add People
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
          <ModalContent>
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
  font-size: 1rem;
  margin-right: 900px; /* Adjust spacing as needed */

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
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  h4 {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    .cancel {
      background: none;
      border: 2px solid var(--red);
      color: red;
      border-radius: 20px;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .add {
      background: #17a2b8;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .confirm {
    background: #17a2b8;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
`;