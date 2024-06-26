import styled from "styled-components";

export const FormWrapper = styled.section`
  width: 60%;
  margin: ${(props) => (props.$settings ? "2rem" : "0 auto")};
  min-height: 35rem;
  .head {
    text-align: ${(props) => (props.$settings ? "" : "center")};
    font-size: ${(props) => (props.$settings ? "2.1rem" : "1.5rem")};
    font-weight: 500;
    margin-bottom: 4rem;
  }
  .btn {
    display: block;
    width: ${(props) => (props.$settings ? "35%" : "100%")};
    padding: 0.8rem;
    border-radius: 100px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    border: transparent;
    transition: all 0.3s;
    font-weight: 300;
    letter-spacing: 1px;

    margin-top: 3rem;
    &:hover {
      background-color: #0d6f7e;
    }
    &.btn-outline {
      background-color: white;
      color: #17a2b8;
      border: 1px solid #17a2b8;
      text-align: center;
      text-decoration: none;
      margin-top: 0;
    }
  }

  form ~ p {
    margin: 2rem 0;
    text-align: center;
    color: gray;
    font-size: 1rem;
  }
`;
