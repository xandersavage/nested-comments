// src/components/Comment.jsx
import React from "react";
import CommentCard from "./CommentCard"; // Import the CommentCard component you just updated

const Comment = ({ comment, depth = 0 }) => {
  // Determine indentation based on depth
  // Each level indents by pl-6 (24px) for the whole card
  const indentationClass = depth > 0 ? `pl-6` : "";

  // This helps space out the replies and the line visually from the parent
  const marginTopClass = depth > 0 ? `mt-4` : "";

  return (
    // Outer div for indentation and relative positioning for the line
    // Apply margin-top to separate comments at the same level or from their parent
    <div className={`${indentationClass} ${marginTopClass} relative`}>
      {/* The vertical hierarchy line (only for replies) */}
      {/* It's positioned absolutely relative to this wrapper div */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-200"
          // Adjust the left position for deeper nesting to align the line correctly
          // For pl-6 (24px), the line should be at 0, but for subsequent lines, it should be relative to the previous indent.
          // The line should actually appear *at the start* of the 'pl-6' space.
          // If pl-6 is 24px, the line should be at 0, 24px, 48px etc.
          // This requires adjusting the 'left' position of the absolute div based on depth
          style={{ left: `-${24 * depth}px` }} // Adjust based on your pl-6 (Tailwind default is 24px)
        ></div>
      )}

      {/* Render the actual CommentCard, passing the comment data down */}
      <CommentCard key={comment._id} comment={comment} />

      {/* Recursively render replies */}
      {comment.replies && comment.replies.length > 0 && (
        // No extra div or margin here, as the next Comment component will handle its own marginTopClass
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} depth={depth + 1} /> // Recursively call Comment with increased depth
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
