import styled from "styled-components";
export const ErrorWrapper = styled.div`
  width: 100svw;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-300);
  img {
    max-width: 40%;
    margin-top: -200px;
    object-fit: cover;
    display: block;
  }
  .message {
    font-size: 1.8rem;
    text-transform: uppercase;
    margin-top: 1.5rem;
    color: rgb(118, 117, 117);
    letter-spacing: 1px;
  }

  button {
    font-size: 1rem;
    border-bottom: 1px solid var(--white);
    border: transparent;
    background-color: transparent;
    color: rgb(118, 117, 117);
    margin-top: 1rem;
  }
  @media (max-width: 920px) {
    .message {
      font-size: 1.4rem;
      letter-spacing: 0.7px;
      margin-top: 1rem;
    }
  }

  @media (max-width: 640px) {
    img {
      min-width: 70%;
      margin-top: -100px;
    }
    .message {
      font-size: 1rem;
    }
    a {
      font-size: 0.9rem;
    }
  }
`;
