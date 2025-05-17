import React from "react";
import "./FavList.css";
import { Link, useLocation } from "react-router-dom";

const FavList = () => {
  const location = useLocation();
  const { favName, favoriteMovies } = location.state;

  return (
    <div className="fav-container">
      <div className="fav-card">
        <div className="fav-top">
          <h1>{favName}</h1>
          <ul>
            {favoriteMovies.map((movie) => (
              <li key={movie.imdbID}>
                {movie.Title}
                <Link
                  to={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  className="imdb"
                >
                  IMDB
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="back">
          <Link to="/">Movies</Link>
        </div>
      </div>
    </div>
  );
};

export default FavList;
