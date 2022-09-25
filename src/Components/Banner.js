import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

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

  return (
    <header>
      {/* background_image on the header */}
      {/* title */}
      {/* <div>
            <button></button>
            <button></button>
        </div> */}
      {/* description */}
    </header>
  );
}

export default Banner;
