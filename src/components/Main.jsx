import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";

function Main() {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(requests.requestPopular).then((e) => {
      setMovies(e.data.results);
    });
  }, []);

  //get a random movie from the array movies
  const movie = movies[Math.floor(Math.random() * movies.length)];
  //   console.log(movie);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  console.log(movies);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-t from-black"></div>
        {/* movie?.title is for optional chanining */}
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        ></img>

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-medium">{movie?.title}</h1>
          <div className="my-6">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white ml-4 border-gray-300 py-2 px-5">
              Watch later
            </button>
          </div>
          <p className="w-full text-balance text-gray-200">
            {truncateString(movie?.overview, 200)}
          </p>
          <p className="text-gray-300 text-sm mt-6">
            Released: {movie?.release_date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
