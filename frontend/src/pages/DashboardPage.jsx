import React, { useEffect, useState } from "react";
import { DashboardWrapper } from "../assets/styled-components/DashboardWrapper";
import KanbanBoard from "../components/KanbanBoard";
import { formatedDate } from "../utils/calculate";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import styled from "styled-components";
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
    if (email) {
      setIsModalOpen(false);
      setIsConfirmationOpen(true);
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
          <AiOutlineUserAdd/>Add People
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
