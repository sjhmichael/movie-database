import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import requests from "../Requests";
import { useNavigate } from "react-router-dom";
import Truncate from "../components/Truncate";
import Footer from "../components/Footer";

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

  const seeMovieDetails = (id) => {
    navigate(`/movie/${id}`, { state: { id } });
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  if (results.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col items-center text-white">
        <div className="flex h-full items-center">
          <h1 className="text-4xl font-medium">No results found!</h1>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex w-full flex-col items-center align-middle text-white">
          <div className="mt-24 max-w-[1400px] px-4 md:px-8">
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
                      <p className="">
                        {truncateString(
                          result?.release_date ? result.release_date : "null",
                          4,
                        )}
                      </p>
                      <p className="text-sm text-gray-400">
                        {result.overview ? (
                          <Truncate str={result.overview} num={300} />
                        ) : (
                          "NA"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default SearchResults;
