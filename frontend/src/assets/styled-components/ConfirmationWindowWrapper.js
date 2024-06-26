import styled from "styled-components";
export const ConfirmationWindowWrapper = styled.div`
  min-width: 300px;
  p {
    font-size: 0.9rem;
    text-align: center;
    font-weight: 600;
  }
  .cta-btns {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.2rem;
  }
  .confirm,
  .cancel {
    display: block;
    padding: 0.9rem 0;
    border-radius: 15px;
    border: transparent;
    background-color: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
  .confirm {
    color: var(--white);
    background-color: var(--primary-500);
    span {
      text-transform: capitalize;
    }
  }
  .cancel {
    border: 1.3px solid var(--red);
    color: var(--red);
  }
`;
