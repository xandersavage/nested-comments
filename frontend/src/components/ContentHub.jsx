import React, { useState } from "react";
import PostList from "./PostList.jsx";
import DocumentList from "./DocumentList.jsx";

const ContentHub = () => {
  const [activeTab, setActiveTab] = useState("posts"); // 'Posts' is active by
  const commonTabClasses =
    "w-1/2 p-2 text-center hover:cursor-pointer rounded transition-colors duration-200";
  // default
  return (
    <>
      <div
        className={`bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded shadow-md`}
      >
        <div className="flex gap-4 items-center mb-4">
          <h3 className={`text-2xl font-medium`}>Content Hub</h3>
          <div className="bg-blue-200 text-blue-700 text-sm font-bold rounded-3xl p-2">
            Beta
          </div>
        </div>
        <p className={`text-gray-700`}>
          Explore and engage with posts and documents through collaborative
          discussions.
        </p>
      </div>
      <div className="p-4 flex justify-between bg-white shadow-md">
        <div
          className={`${commonTabClasses} ${activeTab === "posts" ? "bg-blue-400 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </div>
        <div
          className={`${commonTabClasses} ${activeTab === "documents" ? "bg-purple-400 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </div>
      </div>
      <div className="bg-white p-4 shadow-md">
        {activeTab === "posts" ? <PostList /> : <DocumentList />}
      </div>
    </>
  );
};

export default ContentHub;
