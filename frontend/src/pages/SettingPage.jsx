import React, { useEffect, useState } from "react";
import { FormWrapper } from "../assets/styled-components/FormWrapper";
import FormRowBox from "../components/FormRowBox";
import { HiOutlineUser } from "react-icons/hi2";
import { SlLock } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../slices/authApiSlice";
import { logout, setCredentials } from "../slices/authSlice";
import { AiOutlineMail } from "react-icons/ai";

const SettingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);

  const { handleSubmit, getValues, formState, register, reset, resetField } =
    useForm({
      defaultValues: { 
        name: userName ,
        email: userEmail,       //Email id and name is prefilled.
      },
    });

  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data) => {
    const { name, email, password, oldPassword } = data;
    let profileFieldToUpdate = {};

    if (name) profileFieldToUpdate.name = name;
    if(email) profileFieldToUpdate.email = email;
    if (oldPassword && password) {
      profileFieldToUpdate.oldPassword = oldPassword;
      profileFieldToUpdate.password = password;
    }

    try {
      const res = await updateUser(profileFieldToUpdate).unwrap();
      dispatch(setCredentials(res.user));
      toast.success("Your profile updated");
      resetField("password");
      resetField("oldPassword");
      dispatch(logout());
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [user]);

  return (
    <FormWrapper $settings>
      <h4 className="head">Settings</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRowBox
          id="name"
          placeholder="Name"
          type="text"
          label={<HiOutlineUser />}
          settings
          register={{ ...register("name") }}
        />
        <FormRowBox
          id ="email"
          placeholder="Update Email"
          type='email'
          label={<AiOutlineMail className="fill-icon"/>}
          settings
          register={{ ...register("email") }}          
        />
        <FormRowBox
          id="oldPassword"
          placeholder="Old password"
          type="password"
          label={<SlLock className="fill-icon" />}
          settings
          register={{
            ...register("oldPassword"),
          }}
        />
        <FormRowBox
          id="password"
          placeholder="New Password"
          type="password"
          label={<SlLock className="fill-icon" />}
          settings
          register={{
            ...register("password", {
              minLength: {
                value: 8,
                message: "New password should be of 8 characters",
              },
              validate: (value) =>
                value && !getValues().oldPassword
                  ? "Old password is required for confirmation"
                  : true,
            }),
          }}
          error={formState?.errors?.password?.message}
        />


        <button type="submit" className="btn1">
          Update
        </button>
      </form>
    </FormWrapper>
  );
};

export default SettingPage;
