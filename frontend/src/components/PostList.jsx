import React from "react";
import PostCard from "./PostCard.jsx";
import { ALL_POSTS_DATA } from "../data/postsData.js";
import {useQuery} from '@tanstack/react-query'
import {getPosts} from "../services/postService.js";

const PostList = () => {
    const {
        data: posts,
        isLoading,
        isError,
        error,
        isFetching
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 30 * 1000
    })
    // --- Conditional Rendering based on state ---
    if (isLoading) {
        return <div className="p-4 text-center text-gray-500">Loading posts...</div>;
    }

    if (isError) { // Use isError directly from useQuery
        // The 'error' object from useQuery contains details about the error
        return <div className="p-4 text-center text-red-500">Error: {error?.message || "Failed to load posts."}</div>;
    }
  return (
    <>
      <h2 className={`text-center text-3xl mb-3 font-semibold`}>Blog Posts</h2>
        {isFetching && !isLoading && (
            <p className="text-sm text-gray-500 text-center mb-4">Updating posts...</p>
        )}
      <p className={`text-gray-700 text-lg text-center mb-5`}>
        Engage with blog content through threaded discussions
      </p>
        {posts && posts.length > 0 ? (
            posts.map(post => (
                <PostCard key={post._id} post={post} />
            ))
        ) : (
            <p className="text-center text-gray-500">No posts available.</p>
        )}
    </>
  );
};

export default PostList;
