import { LoaderWrapper } from "../assets/styled-components/LoaderWrapper";

const Loader = ({ loginRegister }) => {
  return (
    <LoaderWrapper $loginRegister={loginRegister}>
      <div className="loader"></div>
    </LoaderWrapper>
  );
};

export default Loader;
