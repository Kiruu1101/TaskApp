// using compound component pattern
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
import {
  Menu,
  StyledButton,
  StyledList,
  StyledToggle,
} from "../assets/styled-components/Menu";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const open = setOpenId;
  const close = () => setOpenId(" ");
  return (
    <MenusContext.Provider
      value={{ openId, setOpenId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rec = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rec.x - rec.width,
      y: rec.y + rec.height - 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <IoEllipsisHorizontal />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);
  const { openId } = useContext(MenusContext);
  if (openId !== id) return null;
  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, onClick, deleteBtn }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleClick} $deleteBtn={deleteBtn}>
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
