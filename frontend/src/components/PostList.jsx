import React from "react";
import PostCard from "./PostCard.jsx";
import { ALL_POSTS_DATA } from "../data/postsData.js";

const PostList = () => {
  return (
    <>
      <h2 className={`text-center text-3xl mb-3 font-semibold`}>Blog Posts</h2>
      <p className={`text-gray-700 text-lg text-center mb-5`}>
        Engage with blog content through threaded discussions
      </p>
      {ALL_POSTS_DATA.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
