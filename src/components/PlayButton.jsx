import React from "react";
import { FaPlay } from "react-icons/fa6";

const PlayButton = ({ label }) => {
  return (
    <button className="group rounded-full border bg-white px-8 py-3 text-xl text-black">
      <div className="flex flex-row items-center gap-x-4 font-medium">
        {label}
        <FaPlay className="duration-300 group-hover:translate-x-2" />
      </div>
    </button>
  );
};

export default PlayButton;
