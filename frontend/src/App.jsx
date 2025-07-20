// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // Import your Layout component

function App() {
  return (
    <Router>
      <Routes>
        {/* Use the Layout component for routes that share the same header/footer */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes will render inside the <Outlet /> in Layout */}
          {/* You can add more routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
