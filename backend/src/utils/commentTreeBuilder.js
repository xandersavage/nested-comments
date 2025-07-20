export const buildCommentTree = (comments) => {
  const commentMap = new Map();
  const rootComments = [];

  comments.forEach((comment) => {
    commentMap.set(comment._id.toString(), { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId.toString());
      if (parent) {
        parent.replies.push(commentMap.get(comment._id.toString()));
      } else {
        // Orphaned reply, treat as root
        rootComments.push(commentMap.get(comment._id.toString()));
      }
    } else {
      // Top-level comment
      rootComments.push(commentMap.get(comment._id.toString()));
    }
  });

  // Sort replies by creation date for consistent order
  rootComments.forEach((comment) => {
    if (comment.replies.length > 0) {
      comment.replies.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
    }
  });

  return rootComments.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );
};
