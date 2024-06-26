import styled from "styled-components";
export const FormRow = styled.div`
  margin-bottom: 1.5rem;
  .input-box {
    padding: 0.1rem 0.4rem;
    display: flex;
    border-radius: 5px;
    border: 1px solid #dad0d0;
    align-items: center;
    width: ${(props) => (props.$settings ? "400px" : "")};
    justify-content: space-between;
  }
  .error {
    font-size: 0.8rem;
    color: var(--red);
    margin-top: 0.4rem;
  }
  .invalid-input {
    border: 1px solid var(--red);
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.6rem;
      stroke: gray;
      margin-right: 0.3rem;
    }
    /* class for lock icon of password field */
    .fill-icon {
      fill: gray;
      font-size: 1.4rem;
    }
  }
  input {
    padding: 0.5em;
    border: none;
    font-size: 1rem;
    color: gray;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  .eye-icon,
  .eye-icon-active {
    font-size: 1.6rem;
    fill: gray;
    cursor: pointer;
  }
  .eye-icon-active {
    fill: black;
  }
`;
