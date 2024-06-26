import React from "react";
import codesandboxIcon from "../assets/icons/codesandbox.svg";
import { LogoWrapper } from "../assets/styled-components/LogoWrapper";

const Logo = ({ sharepage }) => {
  return (
    <LogoWrapper $sharepage={sharepage}>
      <img src={codesandboxIcon} alt="logo" />
      <p className="company-name">Pro Manage</p>
    </LogoWrapper>
  );
};

export default Logo;
