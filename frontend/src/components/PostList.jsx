import React from "react";
import PostCard from "./PostCard.jsx";

const PostList = () => {
  return (
    <>
      <h2 className={`text-center text-3xl mb-3 font-semibold`}>Blog Posts</h2>
      <p className={`text-gray-700 text-lg text-center mb-5`}>
        Engage with blog content through threaded discussions
      </p>
      <PostCard />
    </>
  );
};

export default PostList;
