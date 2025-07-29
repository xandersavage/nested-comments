import React from "react";
import {
  FaDownload,
  FaPaperPlane,
  FaRegClock,
  FaRegComment,
  FaUser,
} from "react-icons/fa6";
import CommentWrapper from "./CommentWrapper.jsx";
import { FaFileAlt } from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";
import {getCommentsForDocument} from "../services/commentService.js";
import {countComment} from "../utils/countComments.js";

const DocumentCard = ({ document }) => {
  const {data: comments, isLoading: areCommentsLoading, isError: areCommentsError, error: commentsError} = useQuery({
    queryKey: ['comments', document._id],
    queryFn: ({queryKey}) => getCommentsForDocument(queryKey[1]),
    enabled: !!document._id,
    staleTime: 5 * 60 * 1000
  })

  const totalCommentCount = countComment(comments)
  console.log(document)

  return (
    <div
      className={`px-10 py-5 border rounded-lg border-l-purple-400 border-l-4 border-gray-300 mb-5`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <FaFileAlt className={`text-xl text-purple-400`} />
          <h3 className="text-2xl font-semibold my-0">{document.title}</h3>
        </div>
        <div className="text-sm font-bold rounded-3xl p-1 px-2 bg-purple-100 text-purple-500">
          Documentation
        </div>
      </div>
      <p className="text-gray-500">{document.content}</p>
      <div className="flex gap-6 mt-5 mb-5">
        <div className="flex items-center gap-2">
          <FaUser className={`text-gray-400 hidden sm:block`} />
          <p>{document.author.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock className={`text-gray-400 hidden sm:block`} />
          <p className="">{new Date(document.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaDownload className={`text-gray-400 hidden sm:block`} />
          <p className="">{document.size || `20MB`}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <FaRegComment className={`text-purple-400 text-2xl`} />
        <p className="font-semibold text-xl">Review & Feedback</p>
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px] resize-none mb-4"
        placeholder={`Share your thoughts about this document...`}
      ></textarea>
      <div className="flex gap-4 items-center bg-gradient-to-r from-purple-300 via-purple-300 to-pink-300 text-white w-40 py-2 px-2 rounded-md hover:shadow hover:cursor-pointer">
        <FaPaperPlane />
        <p className={`text-md font-semibold`}>Add Comment</p>
      </div>
      <div className="mt-5 mb-4 border border-b-gray-300 border-white py-3">
        <p className="font-semibold text-xl">{totalCommentCount} Comment{totalCommentCount !== 1 ? 's' : ''}</p>
      </div>
      <div className="mt-6 space-y-4">
        {areCommentsLoading && (
            <p className={`text-gray-500 text-center`}>Loading Comments...</p>
        )}
        {areCommentsError && (
            <p className="text-red-500 text-center">
              Error loading comments: {commentsError?.message}
            </p>
        )}
        {/*
            We map over the top-level comments (those with no parent).
            For each top-level comment, we render a 'Comment' component.
            - key={comment.id}: Essential for React to efficiently update lists.
            - comment={comment}: Passes the entire comment object to the Comment component.
            - depth={0}: This tells the Comment component it's a top-level comment,
                         so it won't apply an initial indentation or hierarchy line.
                         The Comment component then handles increasing this depth for its replies.
          */}
        {comments && comments.length > 0 && !areCommentsLoading && !areCommentsError ? (
            comments.map(comment => (
                <CommentWrapper key={comment._id} comment={comment} depth={0} />
            ))
        ): (
            !areCommentsLoading && !areCommentsError &&  <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
