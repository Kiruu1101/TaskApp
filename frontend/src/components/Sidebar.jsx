import React from "react";
import { Links } from "../utils/Links";
import Navlinks from "./Navlinks";
import { SidebarWrapper } from "../assets/styled-components/SidebarWrapper";
import logoutIcon from "../assets/icons/Logout.svg";
import Modal from "./Modal";
import ConfirmationWindow from "./ConfirmationWindow";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout as deleteCredentials } from "../slices/authSlice";
import toast from "react-hot-toast";
import Logo from "./Logo";
const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onConfirmation = async () => {
    try {
      await logout().unwrap();
      dispatch(deleteCredentials());
      toast.success("User logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <SidebarWrapper>
      <div className="logo-link-cotainer">
        <Logo />
        <div className="nav-links">
          {Links.map((link) => (
            <Navlinks
              key={link.text}
              text={link.text}
              path={link.path}
              icon={link.icon}
              darkIcon={link.darkIcon}
            />
          ))}
        </div>
      </div>
      <Modal>
        <Modal.Open name="logout">
          <button className="logout-btn">
            <img src={logoutIcon} alt="logout icon" />
            <span>Logout</span>
          </button>
        </Modal.Open>
        <Modal.Window windowName="logout">
          <ConfirmationWindow confirmTo="Logout" onConfirm={onConfirmation} />
        </Modal.Window>
      </Modal>
    </SidebarWrapper>
  );
};

export default Sidebar;
