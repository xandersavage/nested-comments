import React, { useState } from "react";
import {
  FaCircleUser,
  FaReply,
  FaEllipsis,
  FaPaperPlane,
} from "react-icons/fa6";

const CommentCard = ({ comment }) => {
  // Use comment data from props, with fallbacks for safety
  const authorName = comment?.author?.username || "Unknown User";
  const timestamp = comment?.timestamp || "Just now";
  const content = comment?.content || "No comment provided.";
  const typeTag = comment?.type || "post";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border border-gray-300 rounded-md p-3 transition duration-200 hover:shadow-lg`}
    >
      {/*Top*/}
      <div className="flex gap-3 items-center mb-2">
        <FaCircleUser className={`text-gray-400 text-3xl`} />
        <p className="font-semibold">{authorName}</p>
        <p className="text-gray-500">{timestamp}</p>
        {typeTag && (
          <div
            className={`text-sm font-bold rounded-3xl p-1 px-2 ${typeTag === "post" ? "bg-blue-100 text-blue-500" : "bg-purple-100 text-purple-500"}`}
          >
            {typeTag}
          </div>
        )}
      </div>

      {/*Middle*/}
      <p className="px-10 text-gray-700 mb-6">{content}</p>

      {/*Bottom*/}
      <div className="flex gap-2 items-center ml-14 mb-2">
        <div
          className="flex gap-4 items-center hover:bg-gray-100 p-2 border border-white rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <FaReply />
          <p className="">Reply</p>
        </div>
        <div className=" hover:bg-gray-100 p-4 border border-white rounded-md">
          <FaEllipsis />
        </div>
      </div>

      {/*Reply*/}
      <div
        className={`px-12 ml-6 relative ${isOpen === true ? "block" : "hidden"}`}
      >
        <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gray-200"></div>
        <textarea
          className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px] resize-none mb-1" // Adjusted min-h and added py-2, resize-y
          placeholder={`Write your reply`}
        ></textarea>
        <div className="flex gap-3">
          <div className="flex gap-4 items-center bg-gradient-to-r from-purple-300 via-purple-300 to-pink-300 text-white py-2 px-2 rounded-md hover:shadow hover:cursor-pointer">
            <FaPaperPlane />
            <p className={`text-md font-semibold`}>Reply</p>
          </div>
          <div
            className="border border-gray-300 py-2 px-2 rounded-md hover:shadow hover:cursor-pointer hover:bg-gray-100 transition duration-700"
            onClick={() => setIsOpen(false)}
          >
            <p className={`text-md font-semibold`}>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
