import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  // submit user information for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <img
        className="absolute h-full w-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/0348003b-a20e-4593-8073-44780e42a402/SG-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      />
      <div className="fixed left-0 top-0 h-screen w-full bg-black/60"></div>
      <div className="fixed z-50 w-full px-4 py-24">
        <div className="mx-auto h-[600px] max-w-[450px] bg-black/75 text-white">
          <div className="mx-auto max-w-[320px] py-16">
            <h1 className="text-3xl font-medium">Sign Up</h1>

            <form onSubmit={handleSubmit} className="flex w-full flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="my-2 rounded bg-gray-700 p-3"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                className="my-2 rounded bg-gray-700 p-3"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />

              <button className="my-6 rounded bg-red-600 py-3 font-medium">
                Sign Up
              </button>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <p>
                  <input type="checkbox" className="mr-2" />
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>

              <div>
                <p className="py-8">
                  <span className="text-gray-400">
                    Already subscribed to movie.db?
                  </span>
                  {"  "}
                  <Link to="/login">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
