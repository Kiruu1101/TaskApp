import styled from "styled-components";
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: ${(props) => (props.$sharepage ? "" : "center")};
  margin-bottom: ${(props) => (props.$sharepage ? "" : "2rem")};
  .company-name {
    font-weight: 700;
    font-size: 1.2rem;
  }
`;
