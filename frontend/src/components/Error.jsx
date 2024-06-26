import React from "react";
import notFound from "../assets/images/not-found.svg";
import somethingWentWrong from "../assets/images/something-wrong.svg";
import { useNavigate } from "react-router-dom";
import { ErrorWrapper } from "../assets/styled-components/ErrorWrapper";

const Error = ({ errorStatus, message, sharePage }) => {
  const navigate = useNavigate();
  console.log(sharePage);
  return (
    <ErrorWrapper>
      <img
        src={errorStatus === 404 ? notFound : somethingWentWrong}
        alt="not-found"
      />
      <h4 className="message">Oops! {message}</h4>
      {!sharePage && (
        <button onClick={() => navigate("/home")}>Back To Home</button>
      )}
    </ErrorWrapper>
  );
};

export default Error;
