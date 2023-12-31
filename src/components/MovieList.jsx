import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../Services/GlobalAPI";
import MovieCard from "./MovieCard";
import HrMovieCard from "./HrMovieCard";
import { Link } from "react-router-dom";

function MovieList({ genreId, index_ }) {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();
  const screenWidth = window.innerWidth;

  useEffect(() => {
    getMovieByGenreId();
  }, []);

  const getMovieByGenreId = () => {
    GlobalAPI.getMovieByGenreId(genreId).then((resp) => {
      console.log(resp.data.results);
      setMovieList(resp.data.results);
    });
  };

  const sliderRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += screenWidth - 500;
    }
  };

  const sliderLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= screenWidth - 500;
    }
  };

  return (
    <>
      {movieList.length > 0 && (
        <>
          <i className={`hidden md:block fa-solid fa-chevron-left absolute text-white text-[30px] mx-9 ${index_ % 3 === 0 ? "my-[77px]" : "my-[170px]"} cursor-pointer left-0`} onClick={sliderLeft}></i>
          <i className={`hidden md:block fa-solid fa-chevron-right absolute text-white text-[30px] mx-9 ${index_ % 3 === 0 ? "my-[77px]" : "my-[170px]"} cursor-pointer right-0`} onClick={sliderRight}></i>
        </>
      )}
      <div ref={elementRef} className="flex overflow-x-auto py-5 w-full scroll-smooth scrollbar-none">
        {movieList.map((item, index) => (
          <Link to={`/moviedetails/${item.id}`} key={item.id}>
            {index_ % 3 === 0 ? <HrMovieCard movie={item} /> : <MovieCard movie={item} />}
          </Link>
        ))}
      </div>
    </>
  );
}

export default MovieList;
