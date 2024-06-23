import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  // submit user information for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
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
            <h1 className="text-3xl font-medium">Sign In</h1>
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
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <button className="my-6 rounded bg-red-600 py-3 font-medium">
                Sign In
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
                  <span className="text-gray-400">New to Netflix?</span>
                  {"  "}
                  <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
