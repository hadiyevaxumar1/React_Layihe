import React from "react";
import "./MovieItem.css";
import { connect } from "react-redux";
import { addMovieToFavorites } from "../redux/action";

const MovieItem = ({ Title, Year, Poster, imdbID, addMovieToFavorites }) => {
  const handleAddToFavorites = () => {
    addMovieToFavorites(imdbID, Title, Year);
  };

  return (
    <article className="movie-item">
      <img className="movie-item__poster" src={Poster} alt={Title} />
      <div className="movie-item__info">
        <h3 className="movie-item__title">
          {Title}&nbsp;({Year})
        </h3>
        <button
          onClick={handleAddToFavorites}
          type="button"
          className="movie-item__add-button"
        >
          Siyahıya əlavə edin
        </button>
      </div>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovieToFavorites: (id, title, year) => {
      dispatch(addMovieToFavorites(id, title, year));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(MovieItem);