import React from "react";
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to="/">
      <h1 className="cursor-pointer py-3 pl-4 text-4xl font-medium text-red-600 md:pl-8">
        NETFLIX
      </h1>
    </Link>
  );
};

export default AppLogo;
