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
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 mb-4">
      <img
        className="w-full h-auto block rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white duration-300">
        <p
          className="white-space-normal text-lg font-medium flex justify-center items-center h-full text-center"
          onClick={seeMovieDetails}
        >
          {item.title}
        </p>
        <p
          className="absolute top-4 left-4 text-gray-300 z-10"
          onClick={saveMovie}
        >
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      </div>
    </div>
  );
}

export default Movie;
