import styled from "styled-components";
export const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  .loader {
    width: ${(props) => (props.$loginRegister ? "1rem" : "5rem")};
    height: ${(props) => (props.$loginRegister ? "1rem" : "5rem")};
    border: ${(props) => (props.$loginRegister ? "2px" : "5px")} solid
      var(--primary-300);
    border-top-color: var(--primary-500);
    border-radius: 50%;
    animation: spinner 0.6s linear infinite;
  }
`;
