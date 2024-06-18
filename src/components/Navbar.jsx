import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import requests from "../Requests";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const searchLink = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${requests.key}`;

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handdleSubmit = () => {};

  return (
    <div className="relative z-[100] flex w-full items-center justify-between bg-black p-4 py-3 md:px-8">
      <Link to="/">
        <h1 className="cursor-pointer text-4xl font-medium text-red-600">
          NETFLIX
        </h1>
      </Link>
      {/* search */}
      {/* <div className="text-white">
        <form className="text-white">
          <input
            type="text"
            name="Search movies..."
            className="rounded-full bg-gray-900 p-1.5 px-4"
          />
        </form>
      </div> */}
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="pr-4 text-white">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-6 py-2 text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="pr-4 text-white">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="rounded-md bg-red-600 px-6 py-2 text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
