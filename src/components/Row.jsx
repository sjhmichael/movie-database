import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function Row({ title, fetchURL, rowID }) {
  const [movies, setMovies] = useState([]);

  //get list of movies from URL from and set them in movies
  useEffect(() => {
    axios.get(fetchURL).then((e) => {
      setMovies(e.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <h2 className="text-white font-medium md:text-3xl p-4 md:p-8">{title}</h2>
      <div className="relative flex items-center group">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full p-2 left-5 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <FaChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white p-2 rounded-full right-5 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
