import { Box, Typography, styled } from "@mui/material";
import {getValueFromCookie} from "../utils/utility.js";

const Image = styled(Box)`
  height: 300px;
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg);
  background-position: center;
  background-size: cover;
  background-repeat: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TypographyComponent = styled(Typography)`
  color: white;
  font-size: 60px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
`;

const Banner = () => {
  // fetching values from cookies
  const family_name = getValueFromCookie(document.cookie, "family_name");

  return (
    <Image>
      <TypographyComponent>Welcome {family_name}</TypographyComponent>
    </Image>
  );
};

export default Banner;
