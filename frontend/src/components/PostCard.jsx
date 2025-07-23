import React from "react";
import {
  FaHeart,
  FaRegClock,
  FaUser,
  FaRegComment,
  FaPaperPlane,
} from "react-icons/fa6";
import { ALL_COMMENTS_DATA } from "../data/commentsData.js";
import CommentWrapper from "./CommentWrapper.jsx";

const PostCard = () => {
  const commentsForThisPost = ALL_COMMENTS_DATA.filter(
    (comment) => comment.type === "post",
  );

  return (
    <div
      className={`px-10 py-5 border rounded-lg border-l-blue-400 border-l-4 border-gray-300`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-2xl font-semibold my-0">
          Advanced React Patterns for Scalable Applications
        </h3>
        <div className="bg-blue-100 text-blue-500 text-sm font-bold rounded-3xl p-2">
          React
        </div>
      </div>
      <p className="text-gray-500">
        Exploring composition patterns, render props, and compound components to
        build maintainable React applications at scale.
      </p>
      <div className="flex gap-6 mt-5 mb-5">
        <div className="flex items-center gap-2">
          <FaUser className={`text-gray-400`} />
          <p>Sarah Chen</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock className={`text-gray-400`} />
          <p className="">2 hours ago</p>
        </div>
        <div className="flex items-center gap-2">
          <FaHeart className={`text-gray-400`} />
          <p className="">42 Likes</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <FaRegComment className={`text-blue-400 text-2xl`} />
        <p className="font-semibold text-xl">Discussion</p>
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px] resize-none mb-4" // Adjusted min-h and added py-2, resize-y
        placeholder={`Share your thoughts about this post...`}
      ></textarea>
      <div className="flex gap-4 items-center bg-gradient-to-r from-purple-300 via-purple-300 to-pink-300 text-white w-40 py-2 px-2 rounded-md hover:shadow hover:cursor-pointer">
        <FaPaperPlane />
        <p className={`text-md font-semibold`}>Add Comment</p>
      </div>
      <div className="mt-5 mb-4 border border-b-gray-300 border-white py-3">
        <p className="font-semibold text-xl">2 Comments</p>
      </div>
      <div className="mt-6 space-y-4">
        {/*
            We map over the top-level comments (those with no parent).
            For each top-level comment, we render a 'Comment' component.
            - key={comment.id}: Essential for React to efficiently update lists.
            - comment={comment}: Passes the entire comment object to the Comment component.
            - depth={0}: This tells the Comment component it's a top-level comment,
                         so it won't apply an initial indentation or hierarchy line.
                         The Comment component then handles increasing this depth for its replies.
          */}
        {commentsForThisPost.map((comment) => (
          <CommentWrapper key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
