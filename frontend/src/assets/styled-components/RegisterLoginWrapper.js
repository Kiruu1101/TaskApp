import styled from "styled-components";
export const RegisterLoginWrapper = styled.div`
  display: flex;
  .banner-container {
    z-index: -2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 60dvw;
    height: 100vh;
    max-height: 100vh;
    background-color: var(--primary-500);
  }
  .welcome {
    display: flex;
    margin-top: -4rem;
    flex-direction: column;
    align-items: center;
    p {
      color: #fff;
      font-size: 1.8rem;
      letter-spacing: 1.5px;
      text-align: center;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    span {
      text-align: center;
      color: #fff;
    }
  }
  .banner {
    position: relative;
    margin-top: -100px;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;

    /* background-color: yellow; */
  }
  .circle {
    position: absolute;
    z-index: -1;
    width: 16vw;
    top: 50%;
    right: 50%;
    transform: translate(51.1%, -64%);
    height: 16vw;
    border-radius: 50%;
    background-color: var(--primary-600);
  }
  .banner-image {
    width: 80%;
    object-fit: cover;

    display: block;
  }
  .login-form {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
