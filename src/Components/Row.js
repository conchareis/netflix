import React, { useState, useEffect } from "react";
import axios from "../axios"; //when is a default import you can name it whatever you want, i can call other nome to axios. only export 1 default per file
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import getTrailer from "movie-trailer";

import "../css/row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //   A snippet of code which runs based on a specific condition
  useEffect(() => {
    // if we have [movies] it will run every time movies changes, movies is a dependency. Depends if movie changes
    // if is an empty bracket [] it will only run one time, when the page loads

    async function fetchData() {
      //because is a request to a third party server we have to use async
      const request = await axios.get(fetchUrl); //await it means to wait for the answer, even if it takes 5 seconds, wait for it to came back
      // it will bring the "https://api.themoviedb.org/3" and add to it the rest of the url that we have on our requests
      //console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //whenever we use a variable (line 14) inside an async function, we have to include it in here

  // console.table(movies); // instead of console.log

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters;
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); //if trailerUrl is already open and we click it, it will close it
    } else {
      //     movieTrailer(null, { tmdbId: movie.id })
      //       .then((url) => {
      //         console.log("url is " + url);
      //         const urlParams = new URLSearchParams(new URL(url).search);
      //         console.log("urlParamsn" + urlParams);
      //         setTrailerUrl(urlParams.get("v"));
      //       })
      //       .catch((error) => console.log(error));
      //   }
      // };
      let config = {
        tmdbId: movie.id,
      };

      movieTrailer(encodeURI(movie?.title || ""), config) //it will try to find a youtube trailer with the movie name, but sometimes it will not find any so we have the || ""
        .then((url) => {
          //it will give us an url or an error
          // https://www.youtube.com/watch?v=XtMThy8QKqu  --- we to catch the final part, that is the id: v=XtMThy8QKqu

          if (url === null) return;

          var tryToGetUrl = new URL(url);
          if (tryToGetUrl === null) return;

          const urlParams = new URLSearchParams(tryToGetUrl.search);
          setTrailerUrl(urlParams.get("v")); //it will get us everything that the v is =
        })
        .catch((error) => console.log(error)); // it will catch the error and show us what it is
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* what maps that is, for each movie in movies it will do wtv is inside the () */}

        {movies.map((movie) => (
          <img
            key={movie.id} // optimization, is a little faster now
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_poster_large"}`} //everything has the class row_poster, but if it is as isLargeRow it will also have row_posterLarger
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path //if it has isLargeRow use movie.poster_path, otherwise use movie.backdrop_path
            }`}
            alt={movie.name}
          /> //we needed to put the base_url because the movie.poster_path was only bringging us this: /apbrbWjh998WDDmjjhkj.jpg
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

// rfce
