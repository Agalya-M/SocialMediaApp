import React, { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

import { FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { CgMenuRightAlt } from "react-icons/cg";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { getPostsBySearch } from "../../actions/posts";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState([]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  const searchPosts = () => {
    if (searchTitle.trim()) {
      //dispatch gose here
      dispatch(
        getPostsBySearch({ searchTitle, searchTags: searchTags.join(",") })
      );
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <div className="head fixed top-0 z-10 min-w-full bg-white max-w-7xl mx-auto text-left h-16 flex items-center justify-between ">
        <div className="ml-10">
          {user && (
            <>
              <div className="flex justify-center items-center space-x-4">
                <h3 className="font-bold bg-blue-400 px-3 py-1 rounded-full">
                  {user?.result.name.charAt(0)}
                </h3>
                <h3 className="font-bold hidden lg:block">
                  {user?.result.name}
                </h3>
              </div>
            </>
          )}
        </div>
        <div>
          <Link to="/posts">
            <h1 className=" text-2xl font-bold text-black md:text-3xl ">
              Travel Memories
            </h1>
          </Link>
        </div>
        <div className={searchBox ? "block" : "hidden"}>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search Title"
              className="px-1 mr-2 rounded-md outline-none border bottom-2"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <input
              type="text"
              placeholder="Search Tags"
              className="px-1 mr-2 rounded-md outline-none border bottom-2"
              value={searchTags}
              onChange={(e) => setSearchTags(e.target.value.split(","))}
            />
            <button onClick={searchPosts}>
              <BsFillArrowRightCircleFill className="text-xl" />
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-between space-x-4 mr-10">
          <button onClick={() => setSearchBox((prevOption) => !prevOption)}>
            <FiSearch className="text-2xl" />
          </button>
          <button>
            {location.pathname === "/posts" ? (
              <Link to="/form">
                <GrAdd className="text-2xl " />
              </Link>
            ) : (
              <Link to="/posts">
                <IoIosArrowBack className="text-2xl" />
              </Link>
            )}
          </button>

          <button onClick={logout}>
            <FaSignOutAlt className="text-xl" />
          </button>
        </div>

        <div className="md:hidden mr-5 flex justify-center items-center">
          <button onClick={() => setMenu(!menu)}>
            <CgMenuRightAlt className="text-3xl" />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div className={menu ? "block" : "hidden"}>
        <div className="fixed top-20 z-10 flex flex-col w-10 h-fit bg-white right-5 px-10 py-5 justify-center items-center space-y-5 rounded-md shadow-2xl">
          <button>
            {location.pathname === "/posts" ? (
              <Link to="/form">
                <GrAdd className="text-2xl " />
              </Link>
            ) : (
              <Link to="/posts">
                <IoIosArrowBack className="text-2xl" />
              </Link>
            )}
          </button>
          <button>
            <FiSearch className="text-2xl" />
          </button>
          <button onClick={logout}>
            <FaSignOutAlt className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
