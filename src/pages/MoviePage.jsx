import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import requests from "../Requests";

function MoviePage() {
  const { state } = useLocation();
  const { id } = useParams();
  const movie = state?.movie;
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${requests.key}`)
      .then((response) => setMovieDetails(response.data));
  }, [id, movie, movieDetails]);

  return (
    <div className="w-full h-[650px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[650px] bg-gradient-to-t from-black"></div>
        {/* movie?.title is for optional chanining */}
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
          alt={movieDetails?.title}
        ></img>
        <div className="absolute w-full top-[250px] p-4 md:p-8">
          <p className="text-gray-300 text-sm mb-6">
            Released: {movieDetails?.release_date}
          </p>
          <div className="flex flex-row space-x-4">
            <h1 className="bg-gray-400/30 text-white px-4 py-2 rounded-full w-fit">
              Popular
            </h1>
            <h1 className=" bg-gray-400/30 text-white px-4 py-2 rounded-full w-fit">
              New Movie
            </h1>
          </div>
          <h1 className="text-3xl md:text-7xl font-medium mt-6">
            {movieDetails.title}
          </h1>
          <p className="md:w-[600px] w-[350px] md:text-base text-sm text-balance text-gray-200 mt-6">
            {movieDetails?.overview}
          </p>
          {/* buttons */}
          <div className="my-6 flex flex-row items-center">
            <button className="text-xl border rounded-full bg-white text-black py-3 px-8">
              <div className="font-medium flex flex-row gap-x-4 items-center">
                <FaPlay />
                Play
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
