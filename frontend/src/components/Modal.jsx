import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { Overlay, StyledModal } from "../assets/styled-components/Modal";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();
const Modal = ({ children }) => {
  const [openModalName, setOpenModalName] = useState("");
  const open = setOpenModalName;
  const close = () => setOpenModalName("");
  return (
    <ModalContext.Provider value={{ openModalName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};
const Open = ({ name: openWindowName, children }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openWindowName) });
};
const Window = ({ windowName, children }) => {
  const { close, openModalName } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (windowName !== openModalName) return null;
  return (
    <Overlay>
      <StyledModal ref={ref}>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>
  );
};

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
