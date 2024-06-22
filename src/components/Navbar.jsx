import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState();

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

  const hideSearch = () => {
    setSearch(!search);
  };

  return (
    <div className="fixed z-[100] w-full">
      <div className="flex items-center justify-between bg-black">
        <Link to="/">
          <h1 className="cursor-pointer py-3 pl-4 text-4xl font-medium text-red-600 md:pl-8">
            NETFLIX
          </h1>
        </Link>
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
                <button className="pr-4 text-white">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md bg-red-600 px-6 py-2 text-white">
                  Sign Up
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
