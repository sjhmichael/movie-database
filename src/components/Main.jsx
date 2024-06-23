import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { FaPlay, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PlayButton from "./PlayButton";
import Truncate from "./Truncate";

function Main() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(requests.requestPopular).then((e) => {
      setMovies(e.data.results);
    });
  }, []);

  //get a random movie from the array movies
  const movie = movies[Math.floor(Math.random() * movies.length)];

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const seeMovieDetails = () => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="h-[650px] w-full text-white">
      <div className="h-full w-full">
        <div className="absolute h-[650px] w-full bg-gradient-to-t from-black"></div>
        {/* movie?.title is for optional chanining */}
        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        ></img>
        <div className="absolute top-[250px] w-full p-4 md:p-8">
          <div className="flex flex-row space-x-4">
            <h1 className="w-fit rounded-full bg-gray-400/30 px-4 py-2 text-white">
              Popular
            </h1>
            <h1 className="w-fit rounded-full bg-gray-400/30 px-4 py-2 text-white">
              New Movie
            </h1>
          </div>
          <h1 className="mt-6 text-3xl font-medium lg:text-6xl">
            {movie?.title}
          </h1>
          <p className="mt-6 w-[350px] text-balance text-sm text-gray-200 md:w-[600px] md:text-base">
            {truncateString(movie?.overview, 200)}
          </p>
          {/* buttons */}
          <div className="my-6 flex flex-row items-center">
            <PlayButton label={"Play"} />
            <button
              className="group ml-4 rounded-full border border-gray-600 px-8 py-3 text-xl text-white"
              onClick={seeMovieDetails}
            >
              <div className="flex flex-row items-center gap-x-4">
                More Info
                <FaArrowRight className="duration-300 group-hover:translate-x-2" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
