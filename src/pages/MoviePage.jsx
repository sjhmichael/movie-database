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
  }, [id, movie]);

  return (
    <div className="w-full text-white relative">
      <div className="w-full h-full">
        {/* movie?.title is for optional chanining */}

        <div className="w-full h-full absolute">
          <img
            className="w-full relative h-[250px] md:h-[750px] object-cover left-0 right-0 mx-auto"
            src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
            alt={movieDetails?.title}
          ></img>
        </div>

        <div className="absolute w-full h-[250px] bg-gradient-to-t from-black z-10" />
        <div className="absolute w-[full] h-[250px] z-10 from-black from-20% md:left-0 md:right-0 md:h-[750px] md:bg-gradient-to-r bg-gradient-to-t"></div>

        <div className="w-full h-full absolute top-[250px] p-4 md:p-8 z-20">
          <div className="relative lg:w-[75%] w-full left-0 right-0 mx-auto">
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
            <p className="md:text-base text-sm text-balance text-gray-200 mt-6">
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
            {/* <div className="relative flex w-full mt-36 text-white">
              <h1 className="text-3xl font-medium">More Details</h1>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
