import React, { useEffect, useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import UserImage from "../UserImage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Friend({ user, friendId, name, subtitle, userPicturePath, token }) {
  const Navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsfriend] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    setFriends(user.friends);    
    const isFriend = friends.find((friend) => friend._id === friendId);    
  }, []);

  const patchFriend = async () => {
    const res = axios.patch(
      `http://localhost:3001/users/${user._id}/${friendId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setFriends(res.data);   
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            Navigate(`/profile/${friendId}`);
            Navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {user._id == friendId ? null : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default Friend;
