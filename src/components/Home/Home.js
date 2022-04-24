import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts.js";
import Header from "../Header/Header.js";

function Home({ setCurrentId }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  });

  return (
    <div>
      <Header />
      <Posts setCurrentId={setCurrentId} />
    </div>
  );
}

export default Home;
