import React from "react";
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to="/">
      <h1 className="font-comfortaa cursor-pointer py-3 pl-4 text-3xl font-extrabold text-red-600 md:pl-8">
        movies.db
      </h1>
    </Link>
  );
};

export default AppLogo;
