import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

import "../css/banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ] // because we only want 1 random itemm, one object
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    // it takes a string, and u give a number, and if the string has more that n characthers, it will substitute them for ...
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "top",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
          {/* if there is no movie tittle search movie name, if there is no movie name search for original name */}
        </h1>
        <div className="banner_buttons">
          {/* button.banner_buttons and then enter, it will give that */}
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
