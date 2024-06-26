import { NavLink } from "react-router-dom";
import styled from "styled-components";
export const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  color: #999696;
  padding: 0.5rem 2.8rem;
  gap: 1rem;
  text-decoration: none;
  .dark-icon {
    display: none;
  }
  &.active {
    background-color: rgb(236, 244, 253);
    color: black;
    .dark-icon {
      display: block;
    }
    .light-icon {
      display: none;
    }

    img {
      color: var(--black);
    }
  }
`;
