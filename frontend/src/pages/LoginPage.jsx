import React from "react";
import banner from "../assets/images/banner.png";
import { RegisterLoginWrapper } from "../assets/styled-components/RegisterLoginWrapper";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <RegisterLoginWrapper>
      <div className="banner-container">
        <div className="banner">
          <div className="circle"></div>
          <img src={banner} alt="banner" className="banner-image" />
        </div>
        <div className="welcome">
          <p>Welcome aboard my friend </p>
          <span>just a couple of clicks and we start</span>
        </div>
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
    </RegisterLoginWrapper>
  );
};

export default LoginPage;
