import React, { useEffect, useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import FlexBetween from "../FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import Friend from "./component/Friend";
import axios from "axios";

function PostWidget({
  user,
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  setPost,
  token,
  addcomment,
  setAddcomment
}) {
  const [isComments, setIsComments] = useState(false);
  const isLiked = Boolean(likes[postUserId]);
  const likeCount = Object.keys(likes).length;
 

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const Handlecomment = async (_id) => {
    const res = await axios.patch(
      `http://localhost:3001/posts/${postId}/comment`,
      { comment:addcomment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res.data)
    setAddcomment("");
  };

  const patchLike = async () => {
    const res = await axios.patch(
      `http://localhost:3001/posts/${postId}/like`,
      { userId: postUserId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPost(res.data);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        user={user}
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        token={token}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <FlexBetween gap="1.5rem">
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setAddcomment(e.target.value)}
              value={addcomment}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
              }}
            />
            <Button
              disabled={!addcomment}
              onClick={() => Handlecomment(postId)}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
