import React, { useState } from "react";
import { FormRow } from "../assets/styled-components/FormRowWrapper";
import { SlEye } from "react-icons/sl";
const FormRowBox = ({
  label,
  id,
  placeholder,
  type,
  settings,
  register,
  error,
}) => {
  const [passwordType, setPasswordType] = useState(() =>
    id === "password" ? type : null
  );
  const handlePasswordTypeChange = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <>
      <FormRow $settings={settings} {...register}>
        <div className={`input-box ${error ? "invalid-input" : ""}`}>
          <label htmlFor={id} className="label">
            {label}
          </label>

          <input
            type={passwordType ? passwordType : type}
            placeholder={placeholder}
            name={id}
            id={id}
          />

          {type === "password" && (
            <SlEye
              className={
                passwordType === "text" ? `eye-icon-active` : `eye-icon`
              }
              onClick={handlePasswordTypeChange}
            />
          )}
        </div>
        {error && <p className="error">{error}</p>}
      </FormRow>
    </>
  );
};

export default FormRowBox;
