import styled from "styled-components";

export const SharePageWrapper = styled.section`
  width: 100vw;
  height: 100svh;
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 4rem;
    margin-bottom: 1.5rem;
  }
  .title {
    font-size: 1.8rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.8rem 0 2rem 0;
  }
  .task-container {
    width: 40%;
    margin: 0 auto;
    border: 2px solid rgb(237, 245, 254);
    border-radius: 15px;
    padding: 3rem 2rem;
  }
  .checklist-container {
    max-height: 450px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 12px;
      margin-left: 1rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background-color: var(--primary-400);
    }
  }
  .checklist-detail {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .due-date-container {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    .text {
      font-weight: 500;
    }
  }
  @media (max-width: 640px) {
    .header {
      font-size: 1.4rem;
      padding: 0 2rem;
      margin-bottom: 1rem;
    }
    .title {
      font-size: 1.5rem;
      margin: 0.6rem 0;
    }
    .checklist-detail {
      font-size: 0.8rem;
    }

    .task-container {
      width: 90%;
      margin: 0 auto;
      padding: 1rem 0 1rem 1rem;
      max-height: 95%;
    }
    .task-boxes {
      max-width: 420px;
    }
    .checklist-container {
      max-height: 380px;
    }
  }
`;
