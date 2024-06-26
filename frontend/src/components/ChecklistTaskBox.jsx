import { AiFillDelete } from "react-icons/ai";
import { ChecklistTaskBoxWrapper } from "../assets/styled-components/ChecklistTaskBoxWrapper";

const ChecklistTaskBox = ({
  checklist,
  createEdit,
  deleteCheckList,
  changeCheckList,
  changeTask,
  disabled = false,
}) => {
  return (
    <ChecklistTaskBoxWrapper>
      <input
        type="checkbox"
        checked={checklist.done}
        className="checkbox"
        onChange={(e) => changeCheckList(checklist._id, e)}
        disabled={disabled}
      />
      {createEdit ? (
        <input
          placeholder="Add a task"
          type="text"
          value={checklist.task}
          className="task-input"
          onChange={(e) => changeTask(e, checklist._id)}
          disabled={disabled}
        />
      ) : (
        //
        <p className="task">{checklist.task}</p>
      )}

      {createEdit && (
        <AiFillDelete
          className="delete"
          onClick={() => deleteCheckList(checklist._id)}
        />
      )}
    </ChecklistTaskBoxWrapper>
  );
};

export default ChecklistTaskBox;
