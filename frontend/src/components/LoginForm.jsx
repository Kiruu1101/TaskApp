import React, { useEffect } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { SlLock } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import FormRowBox from "./FormRowBox";
import { FormWrapper } from "../assets/styled-components/FormWrapper";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/authApiSlice";
import { setCredentials } from "../slices/authSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";
const LoginForm = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { formState, register, handleSubmit } = useForm();
  console.log(isLoading);
  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res.user));
      toast.success(res.message);
      navigate("/home");
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [navigate, user]);
  return (
    <FormWrapper>
      <h4 className="head">Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader loginRegister /> : "Log in"}
        </button>
      </form>
      <p>Have no Account yet?</p>
      <Link to="/register" type="submit" className="btn btn-outline">
        Register
      </Link>
    </FormWrapper>
  );
};

export default LoginForm;
