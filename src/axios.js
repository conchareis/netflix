import axios from "axios";

// base URL to make requests to the movie database
const instance = axios.create({
  baseURL: "http://api.themoviedb.org/3",
});

// instance.get('/foo-bar');
// http://api.themoviedb.org/3/foo-bar

export default instance;
