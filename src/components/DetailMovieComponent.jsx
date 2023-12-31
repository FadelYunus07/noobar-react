import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "../Services/GlobalAPI";
import GenreMovieList from "./GenreMovieList";
import ScrollToTop from "./ScrollToTop";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const EmbeddedVideoModal = ({ embedUrl, onClose }) => {
  return (
    <div className="modal">
      <div>
        <div className="video-container fixed top-16 left-0 right-0 bottom-10 mt-[0%] md:mt-[5%] z-[99] mx-auto sm:left-auto md:left-0 w-[280px] h-[175px] md:w-[560px] md:h-[315px]">
          <button onClick={onClose} className="cursor-pointer w-[39px] h-[39px] bg-white z-[100] text-center text-red-400 font-bold border-red-600 rounded-full md:p-2">
            x
          </button>
          <iframe className="w-full h-full" title="YouTube Video" src={embedUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
};

function DetailMovieComponent() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [videoKey, setVideoKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovieDetails();
    getMovieTrailer();
  }, [id]);

  const getMovieDetails = () => {
    GlobalAPI.getMovieDetails(id).then((resp) => {
      console.log(resp.data);
      setDetail(resp.data);
    });
  };

  const getMovieTrailer = () => {
    GlobalAPI.getMovieTrailer(id).then((resp) => {
      console.log(resp.data);
      const videos = resp.data.results;
      const officialTrailer = videos.find((video) => video.site === "YouTube" && video.name.toLowerCase().includes("official") && video.name.toLowerCase().includes("trailer"));

      if (officialTrailer) {
        // Set the key for the Official Trailer
        setVideoKey(officialTrailer.key);
      } else if (videos.length > 0) {
        // If "Official Trailer" is not found, set the key for the first YouTube video
        setVideoKey(videos[0].key);
      }
    });
  };

  const handlePlayTrailer = () => {
    if (videoKey) {
      const embedUrl = `https://www.youtube.com/embed/${videoKey}`;
      setIsModalOpen(true);
    } else {
      alert("Trailer not available");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative pt-[80px]">
      <div className="absolute z-10 top-20 left-0 w-full h-[200px] md:h-[500px] bg-black opacity-80"></div>
      <img src={IMAGE_BASE_URL + detail.backdrop_path} className="w-full h-[200px] md:h-[500px] object-cover object-left-top" alt={detail.title} />
      <div className="grid grid-cols-4 gap-4 absolute top-12 mx-auto z-10 h-[100%]">
        <img src={IMAGE_BASE_URL + detail.poster_path} className="w-[260px] ms-2 md:ms-5 lg:ms-5 mt-[55px] md:mt-[18%] rounded-lg object-cover" alt={detail.title} />
        <div className="col-span-2 pt-10">
          <h1 className="text-[15px] md:text-[50px]">{detail.title}</h1>
          <p className="text-[10px] md:text-[30px]">{detail.tagline}</p>
          <div className="flex gap-2 mt-0 md:mt-5">
            <p className="text-[6px] md:text-[16px] self-center">
              <i className="fa fa-user me-2 md:me-3"></i>
              {detail.popularity}
            </p>
            <p className="text-[6px] md:text-[16px] self-center">
              <i className="fa fa-usd me-2 md:me-3"></i>
              {detail.budget && detail.budget.toLocaleString()}
            </p>
            {videoKey && (
              <button onClick={handlePlayTrailer} className="self-center bg-blue-500 text-[6px] md:text-[14px] text-white py-2 px-1 md:py-4 rounded-md">
                Play Trailer
              </button>
            )}
          </div>
          {detail.genres && (
            <ul className="flex">
              {detail.genres.map((genre) => (
                <li className="m-1 md:m-2 p-0 md:p-3 text-center font-bold text-[6px] md:text-[12px]" key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
          <p className="absolute me-5 text-justify md:text-[16px] text-[6px]">{detail.overview}</p>
          {/* Button to play the trailer */}

          <div>{isModalOpen && <EmbeddedVideoModal embedUrl={`https://www.youtube.com/embed/${videoKey}`} onClose={handleCloseModal} />}</div>

          {/* Embedded video modal */}
        </div>
      </div>
      <div className="relative z-10 w-full h-full">
        <GenreMovieList />
      </div>
    </div>
  );
}

export default DetailMovieComponent;
