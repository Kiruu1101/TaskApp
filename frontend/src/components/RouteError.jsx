import React from "react";
import { useRouteError } from "react-router-dom";
import Error from "./Error";
const RouteError = () => {
  const error = useRouteError();

  return (
    <>
      <Error
        errorStatus={error.status}
        message={
          error.status === 404 ? "No similar routes" : "Something went wrong"
        }
      />
    </>
  );
};
export default RouteError;
