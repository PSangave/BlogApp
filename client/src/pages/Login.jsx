import * as React from "react";

import { Box, TextField, styled } from "@mui/material";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import { Google } from "@mui/icons-material";
import { useState } from "react";

import icon from "../assets/login_page_icon.png";

const BoxComponent = styled(Box)`
  width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 20px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Image = styled("img")({
  height: 70,
  width: 70,
  margin: "auto",
});

const CardTitle = styled("p")({
  fontSize: 30,
  fontWeight: 500,
  marginBottom: 10,
});

const CardDesc = styled("p")({
  marginTop: 0,
});

const TFComponent = styled(TextField)`
  margin: 0px 0px 0px 0px;
  height: 50px;
`;

const ButtonComponent = styled(Button)`
  margin-bottom: 10px;
  margin-top: 0px;
`;

const DividerComponent = styled(Divider)`
  margin-bottom: 20px;
`;

const Login = () => {
  let initialSignupText = {
    name: "",
    email: "",
    password: "",
  };

  const [account, toggleAccount] = useState("login");

  const [signup, setSignup] = useState(initialSignupText);

  const changeToggle = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  const setTextInput = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(initialSignupText);
  };

  const signupUser = () => { };

  return (
    <>
      <Box>
        {account === "login" ? (
          <BoxComponent>
            <Image src={icon} alt="logo" />
            <CardTitle>Log in to your account</CardTitle>
            <CardDesc>Start writing your thoughts.</CardDesc>
            <TFComponent
              variant="outlined"
              label="Enter your email"
              size="small"
              margin="none"
            ></TFComponent>
            <TFComponent
              variant="outlined"
              label="Enter your password"
              size="small"
              margin="none"
            ></TFComponent>
            <ButtonComponent>Login</ButtonComponent>
            <ButtonComponent onClick={() => changeToggle()}>
              Create new account
            </ButtonComponent>
            <DividerComponent>Or</DividerComponent>
            <ButtonComponent startDecorator={<Google />} color="warning">
              Continue with Google
            </ButtonComponent>
          </BoxComponent>
        ) : (
          <BoxComponent>
            <Image src={icon} alt="logo" />
            <CardTitle>Sign Up</CardTitle>
            <CardDesc>Register yourself with us...</CardDesc>
            <TFComponent
              variant="outlined"
              label="Enter Name"
              name="name"
              onChange={(e) => setTextInput(e)}
              size="small"
              margin="none"
            ></TFComponent>
            <TFComponent
              variant="outlined"
              label="Enter Email"
              size="small"
              margin="none"
            ></TFComponent>
            <TFComponent
              variant="outlined"
              label="Enter Password"
              size="small"
              margin="none"
            ></TFComponent>
            <ButtonComponent onClick={() => signupUser()}>
              Register
            </ButtonComponent>
            <ButtonComponent onClick={() => changeToggle()}>
              Already Registered?{" "}
            </ButtonComponent>
          </BoxComponent>
        )}
      </Box>
    </>
  );
};

export default Login;

/**
 * TODO:
 * 1. Complete the Login UI and SignUp UI with backend
 *
 */
