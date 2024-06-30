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
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .confirm,
  .cancel {
    display: inline-block;
    padding: 0.9rem 0;
    border-radius: 30px;
    border: transparent;
    background-color: inherit;
    font-size: 0.9rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .confirm {
    color: var(--white);
    background-color: var(--primary-500);
    span {
      text-transform: capitalize;
    }
  }
  .confirm:hover {
    background-color: #27a5a7; /* Darker teal on hover */
  }
  .cancel {
    border: 1.3px solid var(--red);
    color: var(--red);
  }
  .cancel:hover {
    background-color: #fbe4e4; /* Light red background on hover */
    color: #e74c3c; /* Keep the text color red */
  }
`;
