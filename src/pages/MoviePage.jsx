import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import requests from "../Requests";
import clsx from "clsx";

function MoviePage() {
  const { state } = useLocation();
  const { id } = useParams();
  const movie = state?.movie;
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${requests.key}`)
      .then((response) => {
        setMovieDetails(response.data);
        setGenres(response.data.genres);
      });
  }, [id, movie]);

  console.log(movieDetails?.genres);

  return (
    <div className="relative w-full text-white">
      <div className="h-full w-full">
        {/* movie?.title is for optional chanining */}

        <div className="absolute h-full w-full">
          <img
            className="relative left-0 right-0 mx-auto flex h-[250px] w-full flex-auto object-cover lg:h-[750px] lg:max-w-[1400px]"
            src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
            alt={movieDetails?.title}
          ></img>
        </div>

        <div className="absolute z-10 block h-[250px] w-full bg-gradient-to-t from-black lg:hidden" />
        <div className="absolute left-0 right-0 z-10 hidden h-[750px] bg-gradient-to-r from-black from-20% lg:block"></div>

        <div className="absolute top-[250px] z-20 h-full w-full p-4 md:p-8">
          <div className="relative left-0 right-0 mx-auto max-w-[1400px]">
            <div className="flex flex-row space-x-4">
              <h1 className="w-fit rounded-full bg-gray-400/30 px-4 py-2 text-white">
                Popular
              </h1>
              <h1 className="w-fit rounded-full bg-gray-400/30 px-4 py-2 text-white">
                New Movie
              </h1>
            </div>
            <h1 className="my-8 text-3xl font-medium md:text-5xl">
              {movieDetails.title}
            </h1>
            <div className="flex flex-row space-x-2">
              {" "}
              <p className="mb-6 text-sm text-gray-300">
                {movieDetails?.release_date} |
              </p>
              <p className="mb-6 text-sm text-gray-300">
                {movieDetails?.runtime} Minutes |
              </p>
              {genres.length > 0 && (
                <p className="mb-6 text-sm text-gray-300">
                  {genres.map((genre) => genre.name).join(" | ")}
                </p>
              )}
            </div>

            <p className="text-balance text-sm text-gray-200 md:text-base">
              {movieDetails?.overview}
            </p>
            {/* buttons */}
            <div className="my-6 flex flex-row items-center">
              <button className="rounded-full border bg-white px-8 py-3 text-xl text-black">
                <div className="flex flex-row items-center gap-x-4 font-medium">
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
