import React from "react";
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

function SavedMovies() {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <h2 className="text-white font-medium md:text-xl p-4">My Movies</h2>
      <div className="relative flex items-center group">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full p-2 left-5 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <FaChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white p-2 rounded-full right-5 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white duration-300">
                <p className="white-space-normal text-lg font-medium flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>

                {/* pass in movie ID */}
                <AiOutlineClose
                  className="absolute text-gray-300 top-4 left-4"
                  fill="white"
                  onClick={() => deleteMovie(item.id)}
                />
              </div>
              <img
                className="w-full h-auto block"
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
