import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import requests from "../Requests";
import { db } from "../firebase";
import {
  FaChevronRight,
  FaChevronLeft,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import PlayButton from "../components/PlayButton";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Footer from "../components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function MoviePage() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { state } = useLocation();
  const { id } = useParams();
  const movie = state?.movie;
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [videos, setVideos] = useState({});
  const [credits, setCredits] = useState({});
  const [language, setLanguage] = useState([]);
  const [similar, setSimilar] = useState([]);
  gsap.registerPlugin(useGSAP);
  const container = useRef(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${requests.key}&append_to_response=videos,images,credits,similar`,
      )
      .then((response) => {
        setMovieDetails(response.data);
        setGenres(response.data.genres);
        setCompanies(response.data.production_companies);
        setVideos(response.data.videos.results);
        setCredits(response.data.credits.cast);
        setLanguage(response.data.spoken_languages[0].english_name);
        setSimilar(response.data.similar.results);
      });
  }, [id, movie]);

  const arraySlice = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  const truncateString = (str, num) => {
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

  const seeMovieDetails = (id) => {
    navigate(`/movie/${id}`, { state: { id } });
  };

  //referencing db of users, specific user email
  const movieID = doc(db, "users", `${user?.email}`);

  const saveMovie = async (item) => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.fromTo(".hero__image", { x: -30 }, { x: 0, opacity: 1, duration: 1 });
  });

  return (
    <div className="relative w-full text-white" ref={container}>
      {/* movie?.title is for optional chanining */}

      <div className="absolute h-full w-full">
        <img
          className="hero__image relative left-0 right-0 mx-auto flex h-[250px] w-full flex-auto object-cover opacity-0 lg:h-[750px] lg:max-w-[1400px]"
          src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
          alt={movieDetails?.title}
        ></img>
      </div>

      <div className="absolute z-10 block h-[250px] w-full bg-gradient-to-t from-black lg:hidden" />
      <div className="absolute left-0 right-0 z-10 hidden h-[750px] bg-gradient-to-r from-black from-20% lg:block"></div>

      <div className="absolute top-[250px] z-20 h-full w-full p-4 md:p-8">
        <div className="relative left-0 right-0 mx-auto max-w-[1400px]">
          {/* Overview section */}
          <div className="min-h-[250ox] lg:h-[250px]">
            <h1 className="my-8 text-3xl font-medium md:text-5xl">
              {movieDetails.title}
            </h1>
            <div className="flex flex-row space-x-2">
              {" "}
              <p className="mb-6 text-sm text-gray-300">
                {truncateString(movie?.release_date, 4)} |{" "}
                {movieDetails?.runtime} Minutes
              </p>
            </div>
            <p className="text-balance text-sm text-gray-300 md:text-base">
              {movieDetails?.overview}
            </p>
            {/* buttons */}
            <div className="mt-6 flex flex-row space-x-4">
              <PlayButton label={"Play"} />
              <button className="group rounded-full border border-gray-600 px-8 py-3 text-xl text-white">
                <button
                  className="group flex flex-row items-center gap-x-4"
                  onClick={() => saveMovie(movieDetails)}
                >
                  Favourite
                  {like ? (
                    <FaHeart className="duration-300 group-hover:size-6" />
                  ) : (
                    <FaRegHeart className="duration-300 group-hover:size-6" />
                  )}
                </button>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-[50px] flex w-full flex-col text-white lg:mt-[200px]">
            {/* more details */}
            <h1 className="text-3xl font-medium">More Details</h1>
            <div className="mt-4 flex flex-row md:space-x-8">
              {/* poster */}
              <img
                className="relative hidden size-1/6 md:block"
                src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
              ></img>

              {/* movie details */}
              <div className="flex w-full flex-col">
                <div className="grid grid-cols-[auto] gap-8 gap-y-12 md:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_auto]">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-sm text-gray-300">Genres</h1>
                    {genres.length > 0 && (
                      <p>{genres.map((genre) => genre.name).join(" | ")}</p>
                    )}
                  </div>

                  {/* language */}
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-sm text-gray-300">Language</h1>
                    <p className="">{language ? language : "-"}</p>
                  </div>

                  {/* produced by */}
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-sm text-gray-300">Produced By</h1>
                    {companies.length > 0 && (
                      <p>
                        {companies.map((company) => company.name).join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* cast */}
                <div className="mt-8 flex flex-col space-y-2">
                  <h1 className="text-sm text-gray-300">Cast</h1>
                  <div className="mt-8 grid grid-cols-[auto_auto] flex-col gap-4 gap-y-0 md:grid-cols-[auto_auto_auto] lg:grid-cols-[auto_auto_auto_auto_auto]">
                    {credits.length > 0 &&
                      arraySlice(
                        credits.map((credits) => (
                          <div className="">
                            <p>{credits.name}</p>
                          </div>
                        )),
                        15,
                      )}
                  </div>
                </div>

                {/* homepage */}
                <div className="mt-8 flex flex-col space-y-2">
                  <h1 className="text-sm text-gray-300">Homepage</h1>
                  <p>{movieDetails?.homepage ? movieDetails?.homepage : "-"}</p>
                </div>
              </div>
            </div>

            {/* Videos section */}
            <div className="w-full">
              <h2 className="mb-4 mt-16 text-3xl font-medium">
                Videos:{" "}
                <span className="font-normal text-gray-400">
                  {movieDetails?.title}
                </span>
              </h2>
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

            {/* Similar */}
            <div className="w-full">
              <h2 className="mb-4 mt-16 text-3xl font-medium">Similar</h2>
              <div className="grid grid-cols-[auto_auto] flex-wrap gap-4 md:grid-cols-[auto_auto_auto_auto]">
                {similar.map((similar) => (
                  <div className="">
                    <img
                      className="max-h-[196px] w-full rounded-lg object-cover duration-300 hover:scale-95 hover:cursor-pointer"
                      onClick={() => seeMovieDetails(similar.id)}
                      src={`https://image.tmdb.org/t/p/w500/${similar.poster_path}`}
                      alt={similar.original_title}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
