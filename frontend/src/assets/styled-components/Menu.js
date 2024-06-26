import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;

  & svg {
    width: 1.3rem;
    cursor: pointer;
    height: 1.3rem;
  }
`;

export const StyledList = styled.ul`
  position: fixed;
  width: 150px;
  background-color: #fff;
  box-shadow: 0px 0.4rem 1rem rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

export const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s;
  color: ${(props) => (props.$deleteBtn ? "red" : "")};
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: #e1e1e1;
  }
`;
