import React from "react";
import { useSelector } from "react-redux";
import { SwapSpinner } from "react-spinners-kit";

import Post from "./post/post.js";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <div className="flex justify-center items-center relative h-96">
      <SwapSpinner className="absolute bottom-0" size={80} color="#4CD7D0" />
    </div>
  ) : (
    <div className="my-20 mx-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-20">
      {posts.map((post) => (
        <div className="" key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
}

export default Posts;
