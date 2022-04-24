import React, {useState} from "react";
import moment from "moment";
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import {likePost, deletePost} from "../../../actions/posts.js";


function Post({ post, setCurrentId }) {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const userId =  user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><AiFillLike  />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><AiFillLike />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
 
    return <><AiFillLike />&nbsp;Like</>;
  };

  return (
    <>
      <div className="card relative bg-slate-100 max-w-sm  h-96 overflow-hidden rounded-lg transition ease-in-out hover:-translate-y-3 hover:drop-shadow-2xl ">
        <div >
          <img
            className="overflow-hidden w-screen h-44 rounded-t-lg bg-black"
            src={post.selectedFile}
            alt=""
          />
        </div>
        <div className="mx-4">
          <h2 className="font-bold text-lg  mt-2 tracking-wider">
            {post.title}
          </h2>
        </div>
        <div className="mx-4">
          <div className="absolute top-2 left-2 bg-slate-100 rounded-2xl p-1 text-sm">
            {moment(post.createdAt).fromNow()}
          </div>
          <div className="absolute top-2 right-3 text-2xl text-white">
          {(user?.result?._id === post?.creator) && (
            <button>
              <Link to="/form"><BsThreeDots onClick={() => setCurrentId(post._id)} /></Link>
            </button>
          )}
          </div>
        </div>
        <div className="mx-4 mt-4 mb-5">
          <p className="line-clamp-3 text-justify text-sm opacity-80 font-medium">
            {post.message}
          </p>
        </div>
        <div className="mx-4">
          <div className="text-sm  font-medium">
            <span className="bg-black text-white  rounded-md px-2 mr-2">
            {post.tags.map((tag) => `#${tag} `)}
            </span>
            
          </div>
        </div>
        <div className="mx-4 mt-4 flex justify-between">
          <button onClick={handleLike}>
            <div className="flex justify-center items-center">
              <p className="mr-2">Like </p>
              <Likes/>
            </div>
          </button>
          {(user?.result?._id === post?.creator) && (
            <button onClick={() => dispatch(deletePost(post._id))}>
            <div className=" flex justify-center items-center">
              <p className="mr-2">Delete</p>
              <MdDelete className="text-xl -ml-2" />
            </div>
          </button>
          )} 
          
        </div>
      </div>
    </>
  );
}

export default Post;
