import React, {useState, useEffect} from "react";
import {
  FaHeart,
  FaRegClock,
  FaUser,
  FaRegComment,
  FaPaperPlane,
} from "react-icons/fa6";
import {getCommentsForPost, createPostComment} from "../services/commentService.js";
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import CommentWrapper from "./CommentWrapper.jsx";
import {countComment} from "../utils/countComments.js";

const PostCard = ({ post }) => {
  // Access the query client for invalidation
  const queryClient = useQueryClient()

  // State to hold the comment text from the textarea
  const [commentText, setCommentText] = useState('')

  const {data: comments, isLoading: areCommentsLoading, isError: areCommentsError, error: commentsError} = useQuery({
    queryKey: ['comments', post._id], // Query key includes the post-ID to make it unique for each post's comments
    queryFn: ({queryKey}) => getCommentsForPost(queryKey[1]), // queryFn takes the query object, from which we can destructure queryKey
    enabled: !!post._id, // Only run this query if post._id exists
    staleTime: 5 * 60 * 1000,
    // refetchOnWindowFocus: true
  })

  const totalCommentCount = countComment(comments)

  const {
    mutate,
      isPending: isCommenting,
      isSuccess: isCommentSuccess,
      isError: isCommentError,
      reset
  } = useMutation({
    mutationFn: createPostComment,
    onSuccess: () => {
      // Invalidate the comment query to refetch the list and show the new comment
      queryClient.invalidateQueries({queryKey: ['comments', post._id]})
      setCommentText('')
    }
  })

  useEffect(() => {
    if (isCommentSuccess) {
      const timer = setTimeout(() => {
        reset()
      }, 3000)

      // Cleanup function: clears the timer if the component unmounts
      return () => clearTimeout(timer)
    }
  }, [isCommentSuccess, reset]);

  // The handler for form submission
  const handleCommentSubmit = (e) => {
    e.preventDefault()

    if (commentText.trim()) {
      mutate({postId: post._id, text: commentText})
    }
  }

  return (
    <div
      className={`px-10 py-5 border rounded-lg border-l-blue-400 border-l-4 border-gray-300 mb-5`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-2xl font-semibold my-0">{post.title}</h3>
        <div className="bg-blue-100 text-blue-500 text-sm font-bold rounded-3xl p-2">
          {post.type}
        </div>
      </div>
      <p className="text-gray-500">{post.content}</p>
      <div className="flex gap-6 mt-5 mb-5">
        <div className="flex items-center gap-2">
          <FaUser className={`text-gray-400`} />
          <p>{post.author.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock className={`text-gray-400`} />
          <p className="">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaHeart className={`text-gray-400`} />
          <p className="">{`${post.likes} Likes`}</p>
        </div>
      </div>
      <form onSubmit={handleCommentSubmit}>
      <div className="flex items-center gap-2 mb-4">
        <FaRegComment className={`text-blue-400 text-2xl`} />
        <p className="font-semibold text-xl">Discussion</p>
      </div>
      <textarea
           value={commentText}
        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px] resize-none mb-4" // Adjusted min-h and added py-2, resize-y
        placeholder={`Share your thoughts about this post...`}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>

        {/*Displaying mutation state feedback*/}
        {isCommenting && <p className="text-blue-500 mb-2">Posting comment....</p>}
        {isCommentSuccess && <p className="text-green-500 mb-2">Comment posted successfully</p>}
        {isCommentError && <p className="text-red-500 mb-2">Failed to post comment</p>}

      <button className="flex gap-4 items-center bg-gradient-to-r from-purple-300 via-purple-300 to-pink-300 text-white w-40 py-2 px-2 rounded-md hover:shadow hover:cursor-pointer"
      type={"submit"}
      disabled={isCommenting}>
        <FaPaperPlane />
        <p className={`text-md font-semibold`}>Add Comment</p>
      </button>
      </form>
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
                <CommentWrapper key={comment._id} comment={comment} depth={0} parentType={'post'} parentId={post._id} />
            ))
        ): (
                !areCommentsLoading && !areCommentsError &&  <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
