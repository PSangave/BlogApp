import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Box,styled} from '@mui/material';
import {Link} from 'react-router-dom';

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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BoxComponent>
                <LinkComponent to="/" color="inherit">Home</LinkComponent>
                <LinkComponent color="inherit">About Us</LinkComponent>
                <LinkComponent color="inherit">Write Your Blog</LinkComponent>
                <LinkComponent to="/login" color="inherit">Logout</LinkComponent>
          </BoxComponent>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
