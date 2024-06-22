import React from "react";

const Truncate = ({ children }) => {
  const arraySlice = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };
  return <div>Truncate</div>;
};

export default Truncate;
