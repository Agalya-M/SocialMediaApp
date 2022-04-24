import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import { signin, signup } from "../../actions/auth";

import { StageSpinner } from "react-spinners-kit";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="h-screen relative flex flex-col justify-center items-center">
      <div className="absolute top-5 text-4xl">Travel Memories</div>
      <div className="flex flex-col items-center justify-center bg-blue-400 py-5 px-10 rounded-lg">
        <div className="text-3xl mb-5">{isSignup ? "Sign Up" : "Sign In"}</div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              placeholder="Email"
              type="text"
              handleChange={handleChange}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              handleChange={handleChange}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                placeholder="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            {!loading ? (
              <button
                type="submit"
                className="mt-4 mb-2 bg-black text-white w-full py-1 rounded-md"
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            ) : (
              <div className="mt-4 mb-2 bg-black w-full text-white flex rounded-md justify-center items-center">
                <div className="opacity-50 mr-2">Please wait...</div>
                <StageSpinner color="#808080" className="opacity-50" />
              </div>
            )}
          </form>
        </div>
        <div>
          <button onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
