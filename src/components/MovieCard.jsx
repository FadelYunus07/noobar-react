import React from "react";
import DetailComponent from "./DetailMovieComponent";
import { Link } from "react-router-dom";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieCard({ movie }) {
  return (
    <div className="hover:scale-110 transition-all duration-150 ease-in p-3">
      <Link to={`/moviedetails/${movie.id}`}>
        <img src={IMAGE_BASE_URL + movie.poster_path} className="w-[110px] md:h-[300px] md:w-[200px] rounded-lg hover:border-[3px] border-gray-400 cursor-pointer" />
        <h2 className="w-[110px] md:w-[200px] text-white mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:text-blue-700 cursor-pointer">{movie.title}</h2>
        <p className="text-[14px] text-gray-500">{movie.release_date.slice(0, 4)}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
