import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import UserWidget from "./Widgets/UserWidget";
import MyPostWidget from "./Widgets/MyPostWidget";
import PostsWidget from "./Widgets/PostsWidget";
import AdvertWidget from "./Widgets/AdvertWidget";
import axios from "axios";

function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [picturePath, setPicturepath] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const [posts,setPosts]=useState("");
  const [newpost,setNewpost]=useState("");
  const [post, setPost] = useState(newpost);


  const getUser = async () => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const res = await axios.get(`http://localhost:3001/users`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    setToken(data.token);
    setId(res.data._id);
    setPicturepath(res.data.picturePath);
    setName(`${res.data.firstName} ${res.data.lastName}`);
    setUser(res.data);
  };
  useEffect(() => {
    getUser();
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
          {user && (
            <UserWidget
              userId={id}
              picturePath={picturePath}
              token={token}
              user={user}
            />
          )}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} id={id} token={token} setPosts={setPosts} newpost={newpost} setNewpost={setNewpost}/>
          <PostsWidget user={user} userId={id} token={token} posts={posts} setPosts={setPosts} post={post} setPost={setPost} isProfile={false}/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />           
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
