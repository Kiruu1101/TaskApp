import styled from "styled-components";
export const SidebarWrapper = styled.div`
  height: 100vh;

  min-width: 250px;
  border-right: 1px solid rgb(237, 245, 254);
  padding: 2rem 0;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .nav-links {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
  .logout-btn {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    span {
      color: var(--red);
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;
