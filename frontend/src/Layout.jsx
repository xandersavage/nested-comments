// src/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ContentHub from "./components/ContentHub.jsx";

const Layout = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="min-h-screen font-inter antialiased py-8 px-6  container mx-auto">
          {/* Header component, always visible at the top */}
          <Header />
          <ContentHub />

          {/* Outlet renders the content of the matched child route */}
          <main className="">
            <Outlet />
          </main>

          {/* Optional: Add a Footer component here if needed */}
        </div>
      </div>
    </>
  );
};

export default Layout;
