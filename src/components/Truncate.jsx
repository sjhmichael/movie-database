import React from "react";

const Truncate = ({ str, num }) => {
  const slice = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return <span>{slice(str, num)}</span>;
};

export default Truncate;
