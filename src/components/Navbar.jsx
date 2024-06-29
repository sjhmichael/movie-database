import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import Truncate from "./Truncate";
import AppLogo from "./AppLogo";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState();
  const [profile, setProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate(`/searchresults/${query}`, { state: { query } });
    setQuery("");
    setSearch(false);
  };

  const seeProfile = () => {
    setProfile(!profile);
  };

  const hideSearch = () => {
    setSearch(!search);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  return (
    <div className="fixed z-[100] w-full">
      <div className="flex items-center justify-between bg-black">
        <AppLogo />
        {/* search */}
        <form className="hidden text-white md:block" onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="Search movies..."
            className="w-72 rounded-full bg-gray-900 p-1.5 px-4"
            placeholder="Search movies..."
          />
        </form>

        {/* mobile search */}
        <div
          className={
            search
              ? "absolute w-full bg-black py-3 pr-4"
              : "absolute hidden w-full bg-black py-3 pr-4"
          }
        >
          <div className="flex flex-row items-center space-x-4">
            <FaArrowLeft
              className="ml-4 fill-white hover:cursor-pointer"
              size={24}
              onClick={hideSearch}
            />
            <form onSubmit={handleSubmit} className="w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                name="Search movies..."
                className="w-full rounded-full bg-gray-900 p-1.5 px-4 text-white"
                placeholder="Search movies..."
              />
            </form>
          </div>
        </div>
        {user?.email ? (
          <div className="flex flex-row items-center py-3 pr-4 md:pr-8">
            <FaSearch
              className="mr-4 block fill-white hover:cursor-pointer md:hidden"
              size={24}
              onClick={hideSearch}
            />
            <div className="">
              {/* Profile Icon */}
              <button
                className="h-9 w-9 items-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xl text-white"
                onClick={seeProfile}
              >
                {truncateString(user.email.toUpperCase(), 1)}
              </button>

              {/* floating acc details */}
              <div
                className={
                  profile
                    ? "absolute right-4 top-14 rounded-lg bg-gray-950 p-4 text-white"
                    : "absolute right-4 top-14 hidden rounded-lg bg-gray-950 p-4 text-white"
                }
              >
                <div className="flex flex-col space-y-4">
                  <h1>{user.email}</h1>
                  <Link to="/account" className="w-full">
                    <button
                      className="w-full rounded-lg border-[1px] border-gray-600 px-6 py-2"
                      onClick={seeProfile}
                    >
                      Account
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-red-600 px-6 py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-row items-center py-3 pr-4 md:pr-8">
              <FaSearch
                className="mr-4 block fill-white hover:cursor-pointer md:hidden"
                size={24}
                onClick={hideSearch}
              />
              <Link to="/login">
                <button
                  className="rounded-md bg-red-600 px-6 py-2 text-white"
                  onClick={seeProfile}
                >
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
