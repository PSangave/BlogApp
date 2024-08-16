import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Box,styled} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { deleteJTICookie } from "../utils/utility";

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

  function logout() {
    deleteJTICookie();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BoxComponent>
                <LinkComponent to="/" color="inherit">Home</LinkComponent>
                <LinkComponent color="inherit">About Us</LinkComponent>
                <LinkComponent to="/create" color="inherit">Write Your Blog</LinkComponent>
                <LinkComponent to="/login" onClick={logout} color="inherit">Logout</LinkComponent>
          </BoxComponent>
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default Header;
