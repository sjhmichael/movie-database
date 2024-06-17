import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import requests from "../Requests";
import clsx from "clsx";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

function MoviePage() {
  const { state } = useLocation();
  const { id } = useParams();
  const movie = state?.movie;
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [videos, setVideos] = useState({});
  const [credits, setCredits] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${requests.key}&append_to_response=videos,images,credits`,
      )
      .then((response) => {
        setMovieDetails(response.data);
        setGenres(response.data.genres);
        setCompanies(response.data.production_companies);
        setVideos(response.data.videos.results);
        setCredits(response.data.credits.cast);
      });
  }, [id, movie]);

  const arraySlice = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  console.log("moviedetails: ", movieDetails);
  console.log("credits details", credits);

  return (
    <div className="relative w-full text-white">
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
          <h1 className="my-8 text-3xl font-medium md:text-5xl">
            {movieDetails.title}
          </h1>
          <div className="flex flex-row space-x-2">
            {" "}
            <p className="mb-6 text-sm text-gray-300">
              {arraySlice(movieDetails?.release_date, 4)} |
            </p>
            <p className="mb-6 text-sm text-gray-300">
              {movieDetails?.runtime} Minutes
            </p>
          </div>
          <p className="text-balance text-sm text-gray-300 md:text-base">
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

          <div className="absolute mt-[50px] flex w-full flex-col text-white lg:mt-[200px]">
            <h1 className="text-3xl font-medium">More Details</h1>
            <div className="mt-8 flex flex-row md:space-x-8">
              <img
                className="relative hidden size-1/6 md:block"
                src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
              ></img>
              <div className="flex flex-col">
                <div className="grid grid-cols-[auto_auto] gap-8 gap-y-12 md:grid-cols-[auto_auto_auto]">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-sm text-gray-300">Genres</h1>
                    {genres.length > 0 && (
                      <p>{genres.map((genre) => genre.name).join(" | ")}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-sm text-gray-300">Produced By</h1>
                    {companies.length > 0 && (
                      <p>
                        {companies.map((company) => company.name).join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-sm text-gray-300">Language</h1>
                    <p className="">{movieDetails?.original_language}</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col space-y-2">
                  <h1 className="text-sm text-gray-300">Cast</h1>
                  {credits.length > 0 && (
                    <p>
                      {arraySlice(
                        credits.map((credits) => credits.name).join(", "),
                        200,
                      ) + "..."}
                    </p>
                  )}
                </div>
                <div className="mt-8 flex flex-col space-y-2">
                  <h1 className="text-sm text-gray-300">Homepage</h1>
                  <p className="">
                    {movieDetails?.homepage ? movieDetails?.homepage : "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div>
                <h2 className="my-8 text-3xl font-medium">Videos</h2>
                <div className="group relative flex items-center">
                  {videos.length > 0 && (
                    <div
                      id={"slider"}
                      className="relative flex h-full w-full flex-row overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
                    >
                      {arraySlice(
                        videos.map(
                          (video) =>
                            video.site === "YouTube" && (
                              <iframe
                                key={video.id}
                                width="640"
                                height="200"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.name}
                                className="h-[315px] w-full max-w-[560px] pr-8 lg:h-[315px] lg:w-[560px]"
                              ></iframe>
                            ),
                        ),
                        3,
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
