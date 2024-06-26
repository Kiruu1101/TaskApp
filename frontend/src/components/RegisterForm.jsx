import React, { useEffect } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { SlLock } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import FormRowBox from "./FormRowBox";
import { FormWrapper } from "../assets/styled-components/FormWrapper";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "../slices/authApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCredentials } from "../slices/authSlice";
import Loader from "./Loader";
const RegisterForm = () => {
  const { formState, register, getValues, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.user);
  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await signUp(data).unwrap();
      dispatch(setCredentials(res.user));
      toast.success(res.message);
      navigate("/home");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [navigate, user]);
  return (
    <FormWrapper>
      <h4 className="head">Register</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRowBox
          id="name"
          placeholder="Name"
          type="text"
          label={<HiOutlineUser />}
          register={{
            ...register("name", {
              required: { value: true, message: "This field is required" },
            }),
          }}
          error={formState?.errors?.name?.message}
        />
        <FormRowBox
          id="email"
          placeholder="Email"
          type="text"
          label={<HiOutlineEnvelope />}
          register={{
            ...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              required: { value: true, message: "This field is required" },
            }),
          }}
          error={formState?.errors?.email?.message}
        />
        <FormRowBox
          id="password"
          placeholder="Password"
          type="password"
          label={<SlLock className="fill-icon" />}
          register={{
            ...register("password", {
              minLength: {
                value: 8,
                message: "Password shoulbe be of minnimum 8 character",
              },
              required: { value: true, message: "This field is required" },
            }),
          }}
          error={formState?.errors?.password?.message}
        />
        <FormRowBox
          id="confirmPassword"
          placeholder="Confirm password"
          type="password"
          label={<SlLock className="fill-icon" />}
          register={{
            ...register("confirmPassword", {
              required: { value: true, message: "This field is required" },
              validate: (value) =>
                value === getValues().password || "Password do not match",
            }),
          }}
          error={formState?.errors?.confirmPassword?.message}
        />

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader loginRegister /> : "Register"}
        </button>
      </form>
      <p>Have an Account</p>
      <Link to="/" type="submit" className="btn btn-outline">
        Log in
      </Link>
    </FormWrapper>
  );
};

export default RegisterForm;
