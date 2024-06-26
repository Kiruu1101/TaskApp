import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            width: "auto",
            border: "1px solid #17a2b8",
            padding: "16px",
            color: "var(--black)",
            backgroundColor: "rgb(249, 252, 255)",
            fontSize: "1rem",
          },
          error: {
            style: {
              border: "1px solid var(--red)",
            },
          },
          success: {
            style: {
              border: "1px solid var(--green)",
            },
          },
        }}
      />
    </>
  );
};

export default App;
