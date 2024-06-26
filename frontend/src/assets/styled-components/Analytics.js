import styled from "styled-components";
export const Container = styled.ul`
  background-color: rgb(249, 252, 255);
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  gap: 1.5rem;
  width: 28rem;
  padding: 2rem;
`;
export const Item = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;

  .indentaion-and-text {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .text {
    font-weight: 500;
  }
  .value {
    font-size: 1.3rem;
    font-weight: 600;
  }
  .indentation {
    display: inline-block;
    min-width: 12px;
    min-height: 12px;
    border-radius: 50%;
    background-color: rgb(144, 196, 204);
  }
`;
