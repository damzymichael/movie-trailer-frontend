import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Hero from "./components/Hero";
import Login from "./components/Login";
import searchIcon from "./svg/search.svg";
import userImg from "./svg/user.svg";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

const Home = () => {
  const {logout} = useLogout()
  const { user } = useAuthContext();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showNavList, setShowNavList] = useState(false);
  const api_url = "https://api.themoviedb.org/3/";
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${api_url}${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: searchKey,
        append_to_response: "videos",
      },
    });
    selectMovie(results[0]);
    setMovies(results);
  };
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${api_url}movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  return (
    <div className="pages">
      <div className="app">
        <div className="header">
          <div className="header-content max-center">
            <h1>Movie Website </h1>
            <form onSubmit={searchMovies}>
              <div className="form">
                <input
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button type="submit" className="search">
                  Search <img src={searchIcon} alt="" className="icon" />
                </button>
              </div>
            </form>
            {user ? (
              <div
                className="user-icon"
                onMouseOver={() => setShowNavList(true)}
                onMouseLeave={() => setShowNavList(false)}
              >
                <img src={userImg} alt="user-icon" />
                {showNavList && (
                  <div className="nav-container">
                    <div className="arrow-up"></div>
                    <nav className="navbar">
                      <ul>
                        <li onClick={() => console.log('my list')}>My List</li>
                        <li onClick={logout}>Logout</li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            ) : (
              <button className="login" onClick={() => setShowLogin(true)}>
                Log in / Sign Up
              </button>
            )}

            {showLogin && <Login setShowLogin={setShowLogin} />}
          </div>
        </div>
        {selectedMovie && <Hero selectedMovie={selectedMovie} />}
        {movies && <MovieCard movieData={movies} selectMovie={selectMovie} />}
      </div>
    </div>
  );
};

export default Home;
