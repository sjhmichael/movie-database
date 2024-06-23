import React from "react";
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SavedMovies() {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies || []);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);

  //delete movie on client side and push updated array back to firebase
  //take in passedID
  //array.filter takes array and create a new one with changes, ie, remove passedID
  //push back new array to firebase without ID
  //reason: cannot delete array from firebase, thus pushing new one instead
  const deleteMovie = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const seeMovieDetails = (item) => {
    navigate(`/movie/${item.id}`);
  };

  return (
    <div className="">
      <h2 className="mx-4 mb-4 text-2xl font-medium text-white md:mx-8 md:text-3xl">
        Saved Movies
      </h2>
      <div className="group relative flex items-center">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="absolute left-5 z-10 hidden cursor-pointer rounded-full bg-white p-2 opacity-50 hover:opacity-100 group-hover:block"
        />
        <FaChevronRight
          onClick={slideRight}
          size={40}
          className="absolute right-5 z-10 hidden cursor-pointer rounded-full bg-white p-2 opacity-50 hover:opacity-100 group-hover:block"
        />
        <div
          id={"slider"}
          className="relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="relative inline-block w-[160px] cursor-pointer p-2 sm:w-[200px] md:w-[240px] lg:w-[280px]"
            >
              <div className="absolute left-0 top-0 h-full w-full text-white opacity-0 duration-300 hover:bg-black/80 hover:opacity-100">
                <p
                  className="white-space-normal flex h-full items-center justify-center text-center text-lg font-medium"
                  onClick={() => seeMovieDetails(item)}
                >
                  {item?.title}
                </p>

                {/* pass in movie ID */}
                <AiOutlineClose
                  className="absolute left-4 top-4 text-gray-300"
                  fill="white"
                  onClick={() => deleteMovie(item.id)}
                />
              </div>
              <img
                className="block h-auto w-full rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedMovies;
