import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SimilarMovies({ similar }) {
  const navigate = useNavigate();

  const seeMovieDetails = (id) => {
    navigate(`/movie/${id}`, { state: { id } });
  };

  console.log("similar", similar);

  return (
    <div className="relative">
      <div
        className="duration-300 hover:scale-95 hover:cursor-pointer"
        onClick={() => seeMovieDetails(similar.id)}
      >
        <img
          className="max-h-[196px] w-full rounded-lg object-cover"
          src={`https://image.tmdb.org/t/p/w500/${similar.poster_path}`}
          alt={similar.original_title}
        />
        <div className="group absolute left-0 top-0 h-full w-full text-white">
          <p className="hidden h-full w-full items-center justify-center bg-black/0 px-8 text-center text-base duration-300 hover:bg-black/70 group-hover:flex">
            {similar.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SimilarMovies;
