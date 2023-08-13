import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import UserWidget from "./Widgets/UserWidget";

function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [name, setName] = useState("");  
  const [id,setId] = useState("");
  const [picturePath,setPicturepath] = useState("");
  const [token,setToken]=useState("");

  useEffect(() => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const user = data.user;
    setToken(data.token);
    setId(user._id);
    setPicturepath(user.picturePath)
    setName(`${user.firstName} ${user.lastName}`);
  }, []);
  return (
    <Box>
      <Navbar name={name} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={id} picturePath={picturePath} token={token}/>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
