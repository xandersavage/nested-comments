import React from "react";

const Header = () => {
  return (
    <>
      <div className="mb-12">
        <div
          className={`capitalize text-4xl text-center bg-gradient-to-r from-purple-900 to-purple-400 text-transparent bg-clip-text font-bold leading-12 mb-4`}
        >
          content management system
        </div>
        <p className={`text-gray-500 leading-7 text-center text-xl`}>
          A modern platform for managing and discussing your content. Share
          insights and collaborate through interactive discussions.
        </p>
      </div>
    </>
  );
};

export default Header;
