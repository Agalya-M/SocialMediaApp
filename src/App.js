import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home/Home.js";
import Form from "./components/form/form.js";
import Auth from "./components/auth/auth";
import PostDetails from "./components/postDetails/postDetails";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="font-pop">
      <Router>
        <Routes>
          {user && (
            <>
              <Route
                exact
                path="/posts"
                element={<Home setCurrentId={setCurrentId} />}
              />
              <Route
                exact
                path="/posts/search"
                element={<Home setCurrentId={setCurrentId} />}
              />
              <Route exact path="/posts/:id" element={<PostDetails />} />
              <Route
                path="/form"
                element={
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                }
              />
            </>
          )}

          {!user && (
            <Route
              exact
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/posts" />}
            />
          )}

          <Route
            path="*"
            element={<Navigate to={!user ? "/auth" : "/posts"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
