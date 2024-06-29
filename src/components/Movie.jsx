import React from "react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Movie({ item }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { user } = UserAuth();

  //referencing db of users, specific user email
  const movieID = doc(db, "users", `${user?.email}`);

  const saveMovie = async () => {
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

  const seeMovieDetails = () => {
    navigate(`/movie/${item.id}`);
  };

  return (
    <div className="relative mb-4 inline-block w-[160px] cursor-pointer p-2 sm:w-[200px] md:w-[240px] lg:w-[280px]">
      <img
        className="block h-auto w-full rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute left-0 top-0 h-full w-full text-white opacity-0 duration-300 hover:bg-black/80 hover:opacity-100">
        <p
          className="hidden h-full w-full items-center justify-center px-12 text-center duration-300 group-hover:flex"
          onClick={seeMovieDetails}
        >
          {item.title}
        </p>
        <p
          className="absolute left-4 top-4 z-10 text-gray-300"
          onClick={saveMovie}
        >
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      </div>
    </div>
  );
}

export default Movie;
