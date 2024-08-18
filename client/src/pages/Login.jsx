import * as React from "react";
import { Box, TextField, styled } from "@mui/material";
import Button from "@mui/joy/Button";
// import Divider from "@mui/joy/Divider";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getValueFromCookie } from "../utils/utility";
import axios from "axios";
import icon from "../assets/login_page_icon.png";
import { useDispatch } from "react-redux";
import Header from "../components/Header";

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
  marginBottom: 40,
});

const TFComponent = styled(TextField)`
  margin: 0px 0px 0px 0px;
  height: 50px;
`;

const ButtonComponent = styled(Button)`
  margin-bottom: 10px;
  margin-top: 0px;
`;

const GoogleOAuthProviderComponent = styled(GoogleOAuthProvider)`
  border: 3px solid;
`;

const GoogleOAuthBox = styled(Box)`
  margin: auto;
`;

// Function to save user data to db
async function saveUserData(userData) {
  try {
    await axios
      .post("http://localhost:5000/create_user", userData)
      .then((res) => console.log("Login.jsx: User created on db"))
      .catch((err) =>
        console.error("Login.jsx: User not created on db: " + err.message)
      );
  } catch (err) {
    console.log("Login.jsx: User not created: ", err);
  }
}

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();

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
  };

  const signupUser = () => {};

  useEffect(() => {
    const token = getValueFromCookie("jti");
    if (token) {
      navigate("/"); // Adjust this path as needed
    } else {
      console.log("Login.jsx: No jti found");
    }
  }, [navigate]);

  return (
    <>
      <Header/>
      <Box>
        {account === "login" ? (
          <BoxComponent>
            <Image src={icon} alt="logo" />
            <CardTitle>Log in to your account</CardTitle>
            <CardDesc>Start writing your thoughts.</CardDesc>
            <GoogleOAuthBox>
              <GoogleOAuthProviderComponent clientId="830129100854-6eo07cq6rh96ckbvnn0tlejitpj17jqj.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);

                    // storing in cookies
                    document.cookie = `given_name=${decoded.given_name}`;
                    document.cookie = `family_name=${decoded.family_name}`;
                    document.cookie = `email=${decoded.email}`;
                    document.cookie = `jti=${decoded.jti}`;
                    document.cookie = `picture=${decoded.picture}`;

                    console.log(
                      "Login.jsx: JTI = " +
                        getValueFromCookie(document.cookie, "jti")
                    );

                    // Saving to db
                    const first_name = decoded.given_name;
                    const last_name = decoded.family_name;
                    const email = decoded.email;
                    const jti = decoded.jti;
                    const image_url = decoded.picture;

                    let user_Data = {
                      first_name: first_name,
                      last_name: last_name,
                      email: email,
                      jti: jti,
                      image_url: image_url,
                    };

                    console.log("dispatchnig...");
                    
                    dispatch({ type: "LOGIN_SUCCESS", payload: user_Data });

                    saveUserData(user_Data);

                    setTimeout(() => {
                      navigate("/"); // Redirect to home after successful login
                    }, 2000);
                  }}
                  onError={() => {
                    console.log("Login.jsx: Google Authentication Failed");
                  }}
                />
              </GoogleOAuthProviderComponent>
            </GoogleOAuthBox>
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
