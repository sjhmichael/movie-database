import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import requests from "../Requests";
import { useNavigate } from "react-router-dom";

function SearchResults() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the location object
  const query = state?.query; // Get the movie data from the state
  const [results, setResults] = useState([]);
  const [id, getID] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${requests.key}`,
      )
      .then((response) => setResults(response.data.results));
  }, [query]);

  console.log("results", results);

  const seeMovieDetails = (id) => {
    navigate(`/movie/${id}`, { state: { id } });
  };

  if (results.length === 0) {
    return (
      <div className="mt-[350px] flex w-full flex-col items-center align-middle text-4xl font-medium text-white">
        No Results found!
      </div>
    );
  } else {
    return (
      <div>
        <div className="mt-10 flex w-full flex-col items-center align-middle text-white">
          <div className="max-w-[1400px] px-4 md:px-8">
            {results.map((result) => (
              <div key={result.id}>
                <div className="mb-16">
                  <div
                    className="flex flex-row hover:cursor-pointer"
                    onClick={() => seeMovieDetails(result.id)}
                  >
                    <img
                      className="relative mr-8 hidden size-[10%] md:block"
                      src={`https://image.tmdb.org/t/p/original/${result?.poster_path}`}
                      alt={result?.title}
                    ></img>
                    <div className="space-y-2">
                      <h1 className="text-2xl font-medium">{result.title}</h1>
                      <p className="text-sm text-gray-400">
                        {result.release_date}
                      </p>
                      <p className="text-sm text-gray-400">{result.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
