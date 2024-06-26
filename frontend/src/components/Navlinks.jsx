import React from "react";
import { Navlink } from "../assets/styled-components/Navlink";
import { useHomeLayoutContext } from "../pages/HomeLayout";

const Navlinks = ({ text, path, icon, darkIcon }) => {
  const { daysFilter } = useHomeLayoutContext();
  return (
    <Navlink to={text === "Board" ? `${path}?filter=${daysFilter}` : path} end>
      <img src={icon} alt="icon" className="light-icon" />
      <img src={darkIcon} alt="icon" className="dark-icon" />
      <span>{text}</span>
    </Navlink>
  );
};

export default Navlinks;
