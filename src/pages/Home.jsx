import React, { useEffect, useState } from "react";
import "./Home.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favName, setFavName] = useState("");
  const [isListSaved, setIsListSaved] = useState(false);

  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=harry&apikey=2671543")
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
          // console.log(data.Search);
        }
      });
  }, []);

  const handleSearch = () => {
    if (searchText.trim().length === 0) return;

    fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=2671543`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 10));
        } else {
          setMovies([]);
        }
      });
  };
  const handleAddFavorite = (movie) => {
    if (isListSaved) return;
    const alreadyAdded = favoriteMovies.some(
      (fav) => fav.imdbID === movie.imdbID
    );
    if (!alreadyAdded) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const deleteMovie = (movieToDelete) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== movieToDelete.imdbID)
    );
  };

  return (
    <div>
      <header>
        <h1>MOVIE</h1>
      </header>
      <main>
        <section className="input-part">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </section>

        <section className="movie-content">
          <section className="left-part">
            {movies.length > 0 ? (
              movies.map((movie) => {
                const isFavorite = favoriteMovies.some(
                  (fav) => fav.imdbID === movie.imdbID
                );
                return (
                  <div key={movie.imdbID} className="movie-card">
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="about-movie">
                      <h2>{movie.Title}</h2>
                      <h3>Year: {movie.Year}</h3>
                      <button
                        onClick={() => handleAddFavorite(movie)}
                        disabled={isFavorite}
                        className={
                          isFavorite ? "added-button" : "favorite-button"
                        }
                      >
                        Favorite
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: "red" }}>No movies found.</p>
            )}
          </section>

          <section className="right-part">
            <div className="list">
              <div className="list1">
                <ul className="favorite-list">
                  {favoriteMovies.map((fav) => (
                    <li key={fav.imdbID}>
                      {fav.Title}
                      {!isListSaved && (
                        <IoClose
                          className="delete"
                          onClick={() => deleteMovie(fav)}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="func-part">
              <input
                type="text"
                className="fav-name"
                value={favName}
                onChange={(e) => setFavName(e.target.value)}
                disabled={favoriteMovies.length === 0 || isListSaved}
                placeholder={
                  favoriteMovies.length === 0
                    ? "Add a movie first"
                    : "Enter list name"
                }
              />
              <button
                disabled={!favName.trim()}
                className={`${
                  favName.trim() && !isListSaved ? "active-fav" : "add-fav"
                }`}
                onClick={() => setIsListSaved(true)}
              >
                Add Favorite List
              </button>
              {isListSaved ? (
                <Link
                  to="/fav-list"
                  className="show-list-active"
                  state={{ favName, favoriteMovies }}
                >
                  Favorite List
                </Link>
              ) : (
                <span className="show-list">Favorite List</span>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;
