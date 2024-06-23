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
      <h2 className="mx-4 mb-4 text-2xl font-medium text-white md:mx-8 md:text-3xl">
        {title}
      </h2>
      <div className="group relative flex items-center">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="absolute left-5 z-10 hidden cursor-pointer rounded-full bg-white p-2 opacity-50 hover:opacity-100 group-hover:block"
        />
        <FaChevronRight
          onClick={slideRight}
          size={40}
          className="absolute right-5 z-10 hidden cursor-pointer rounded-full bg-white p-2 opacity-50 hover:opacity-100 group-hover:block"
        />
        <div
          id={"slider" + rowID}
          className="relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
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
