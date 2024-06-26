import { PriorityTagWrapper } from "../assets/styled-components/PriorityTagWrapper";

const PriorityTag = ({ priority }) => {
  return (
    <PriorityTagWrapper $priority={priority}>
      <span>{priority} priority</span>
    </PriorityTagWrapper>
  );
};

export default PriorityTag;
