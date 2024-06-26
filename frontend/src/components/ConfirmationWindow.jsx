import toast from "react-hot-toast";
import { ConfirmationWindowWrapper } from "../assets/styled-components/ConfirmationWindowWrapper";

const ConfirmationWindow = ({ confirmTo, onCloseModal, onConfirm }) => {
  return (
    <ConfirmationWindowWrapper>
      <p>Are you sure you want to, {confirmTo}</p>
      <div className="cta-btns">
        <button
          className="confirm"
          onClick={async () => {
            try {
              await onConfirm?.();
            } catch (error) {
              toast.error(error.data.message);
            }
            onCloseModal();
          }}
        >
          Yes, <span>{confirmTo}</span>
        </button>
        <button className="cancel" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </ConfirmationWindowWrapper>
  );
};

export default ConfirmationWindow;
