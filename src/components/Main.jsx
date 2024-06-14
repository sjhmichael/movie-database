import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { FaPlay, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Main() {
  const { user } = UserAuth();
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
    <div className="w-full h-[650px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[650px] bg-gradient-to-t from-black"></div>
        {/* movie?.title is for optional chanining */}
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        ></img>
        <div className="absolute w-full top-[250px] p-4 md:p-8">
          {/* <p className="text-gray-300 text-sm mb-6">
            Released: {movie?.release_date}
          </p> */}
          <div className="flex flex-row space-x-4">
            <h1 className="bg-gray-400/30 text-white px-4 py-2 rounded-full w-fit">
              Popular
            </h1>
            <h1 className=" bg-gray-400/30 text-white px-4 py-2 rounded-full w-fit">
              New Movie
            </h1>
          </div>
          <h1 className="text-3xl md:text-7xl font-medium mt-6">
            {movie?.title}
          </h1>
          <p className="md:w-[600px] w-[350px] md:text-base text-sm text-balance text-gray-200 mt-6">
            {truncateString(movie?.overview, 200)}
          </p>
          {/* buttons */}
          <div className="my-6 flex flex-row items-center">
            <button className="text-xl border rounded-full bg-white text-black py-3 px-8">
              <div className="font-medium flex flex-row gap-x-4 items-center">
                <FaPlay />
                Play
              </div>
            </button>
            <button
              className="text-xl border rounded-full text-white ml-4 border-gray-600 py-3 px-8"
              onClick={seeMovieDetails}
            >
              <div className="flex flex-row gap-x-4 items-center">
                More Info
                <FaArrowRight />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
