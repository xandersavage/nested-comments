import React from "react";
import { FaHeart, FaRegClock, FaUser, FaRegComment } from "react-icons/fa6";

const PostCard = () => {
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
      <div className="flex items-center gap-2">
        <FaRegComment className={`text-blue-400 text-2xl`} />
        <p className="font-semibold text-xl">Discussion</p>
      </div>
    </div>
  );
};

export default PostCard;
