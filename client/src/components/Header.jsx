import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Box,styled} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { deleteJTICookie, getValueFromCookie } from "../utils/utility";
import { useEffect, useState } from "react";

const BoxComponent = styled(Box)`
        width: 100%;
        text-align: center;
`;

const LinkComponent = styled(Link)`
        margin: 0px 20px;
        font-weight: 700;
        text-decoration: none;
        color: white;
`;

const Header = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Header.jsx: ", isLoggedIn);
    
    const jti = getValueFromCookie(document.cookie, "jti");
    if(jti) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  function logout() {
    deleteJTICookie();
    deleteJTICookie();
    deleteJTICookie();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  function login() {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  function handleWriteBlogClick() {
    if(isLoggedIn) {
      setTimeout(() => {
        navigate('/create');
      }, 1000);
    } else {
      alert("Please Login To Write Your Blog!");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BoxComponent>
                <LinkComponent to="/" color="inherit">Home</LinkComponent>
                <LinkComponent color="inherit">About Us</LinkComponent>


                <LinkComponent onClick={handleWriteBlogClick} color="inherit">Write Your Blog</LinkComponent>

                 {
                  isLoggedIn === true ? 
                  (<LinkComponent  onClick={logout} color="inherit">Logout</LinkComponent>) :
                  (<LinkComponent onClick={login} color="inherit">Login</LinkComponent>) 
                 }

                
          </BoxComponent>
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default Header;
