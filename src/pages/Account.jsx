import React from "react";
import { UserAuth } from "../context/AuthContext";
import SavedMovies from "../components/SavedMovies";

function Account() {
  const { user } = UserAuth();

  return (
    <div>
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/0348003b-a20e-4593-8073-44780e42a402/SG-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl">My Movies</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <SavedMovies />
    </div>
  );
}

export default Account;
