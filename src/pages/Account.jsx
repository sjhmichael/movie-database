import React from "react";
import { UserAuth } from "../context/AuthContext";
import SavedMovies from "../components/SavedMovies";
import Footer from "../components/Footer";

function Account() {
  const { user } = UserAuth();

  return (
    <div className="h-screen w-full text-white">
      <div className="mb-6 h-full w-full text-white">
        {/* email and header */}
        <div className="absolute left-0 top-0 h-[400px] w-full bg-gradient-to-t from-black"></div>
        <div className="absolute top-[200px] space-y-2 p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl">My Movies</h1>
          <p>{user.email}</p>
        </div>
        {/* movies and footer */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <img
              className="mb-8 h-[400px] w-full object-cover"
              src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/0348003b-a20e-4593-8073-44780e42a402/SG-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            />
            <SavedMovies />
          </div>
          <div className="px-4 md:px-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
