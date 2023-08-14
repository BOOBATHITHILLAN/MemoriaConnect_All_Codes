import React, { useEffect, useState } from "react";
import axios from "axios";
import PostWidget from "./PostWidget";

function PostsWidget({
  user,
  userId,
  token,
  posts,
  setPosts,
  post,
  setPost,
  isProfile
}) {
  const [onetime, setOnetime] = useState(false);
  const [addcomment, setAddcomment] = useState("");
  const getPosts = async () => {
    const res = await axios.get("http://localhost:3001/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(res.data);    
  };
  const getUserPosts = async () => {
    const res = await axios.get(`http://localhost:3001/posts/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(res.data);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }

    setTimeout(() => {
      onetime === false && setOnetime(true);
    }, 500);
  }, [onetime, post, addcomment]);
  return (
    <>
      {posts &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              user={user}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              post={post}
              setPost={setPost}
              token={token}
              addcomment={addcomment}
              setAddcomment={setAddcomment}
            />
          )
        )}
    </>
  );
}

export default PostsWidget;
