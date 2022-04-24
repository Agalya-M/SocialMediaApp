import FileBase from "react-file-base64";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";

import Header from "../Header/Header";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [titleCheck, setTitleCheck] = useState(true);
  const [messageCheck, setMessageCheck] = useState(true);
  const [tagsCheck, setTagsCheck] = useState(true);
  const formClass = `px-2 py-1 rounded-md outline-none`;
  const formClassFail = `px-2 py-1 rounded-md outline outline-2 outline-red-300 placeholder:text-red-700`;
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flag = true;
    if (!postData.title.length) {
      setTitleCheck(false);
      flag = false;
    } else {
      setTitleCheck(true);
    }
    if (!postData.message.length) {
      setMessageCheck(false);
      flag = false;
    } else {
      setMessageCheck(true);
    }
    // console.log(postData.tags[0].length);
    console.log(postData.tags);
    try {
      if (!postData.tags[0].length) {
        setTagsCheck(false);
        flag = false;
      } else {
        setTagsCheck(true);
      }
    } catch (error) {
      console.log(error.message);
      if (
        error.message ===
        "Cannot read properties of undefined (reading 'length')"
      ) {
        setTagsCheck(false);
      } else {
        setTagsCheck(true);
      }
    }

    if (flag) {
      if (currentId === 0) {
        console.log(postData);
        dispatch(createPost(postData));
      } else {
        dispatch(updatePost(currentId, postData));
      }
      clear();
      navigate("/posts");
    }
  };

  if (!user?.result?.name) {
    return (
      <>
        <Header />
        <div className="h-screen flex justify-center items-center ">
          <p className="text-lg bg-slate-200 p-10 rounded-lg">
            Please sign in to create a memory
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="mt-20 flex justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-5 items-center w-80 bg-blue-400 p-5 rounded-xl "
        >
          <h1 className="font-semibold text-xl">
            {currentId === 0 ? "Creating the Memory" : "Editing the Memory"}
          </h1>
          <input
            className={titleCheck ? formClass : formClassFail}
            placeholder={titleCheck ? "Title" : "Title field is required"}
            name="title"
            type="text"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            onKeyUp={() => setTitleCheck(true)}
          />
          <textarea
            className={messageCheck ? formClass : formClassFail}
            placeholder={messageCheck ? "Message" : "Message field is required"}
            name="message"
            type="text"
            value={postData.message}
            rows={3}
            cols={23}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            onKeyUp={() => setMessageCheck(true)}
          ></textarea>
          <input
            className={tagsCheck ? formClass : formClassFail}
            placeholder={tagsCheck ? "Tags" : "Tags field is required"}
            name="tags"
            type="text"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            onKeyUp={() => setTagsCheck(true)}
          />
          <div className="ml-24">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <button type="submit" className="fileBtn block  bg-red-600">
            Submit
          </button>
          <button
            type="button"
            className="fileBtn-1 block p-2 "
            onClick={clear}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};
export default Form;
