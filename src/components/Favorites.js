import React, { useState } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import { removeMovieFromFavorites } from "../redux/action";
import { getMoviesInList } from "../redux/action";
import { Link } from "react-router-dom";

const Favorites = ({ favoriteMovies, removeMovieFromFavorites, getMoviesInList }) => {
  const [title, setTitle] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [listId, setListId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onInputEnter = (e) => {
    setTitle(e.target.value);
  };

  const postMovies = () => {
    if (title.trim() !== '') {
      setIsLoading(true);
      setBtnActive(true);
      fetch("https://acb-api.algoritmika.org/api/movies/list", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          movies: favoriteMovies.map((item) => {
            return item.id;
          }),
        }),
      })
        .then((res) => res.json())
        .then((data) => setListId(data.id))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="favorites">
      {listId !== "" && getMoviesInList(listId)}
      <input
        onChange={onInputEnter}
        value={title}
        className="favorites__name"
        placeholder="Siyahıya daxil edin"
      />
      <ul className="favorites__list">
        {favoriteMovies.map((item) => {
          return (
            <li className="list__item" key={item.id}>
              {item.title} ({item.year}){" "}
              {!btnActive && (
                <button
                  onClick={() => removeMovieFromFavorites(item.id)}
                  className="close__btn"
                >
                  X
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {listId === "" ? (
        <button
          disabled={
            title === "" ||
            favoriteMovies.length === 0 ||
            isLoading
          }
          onClick={postMovies}
          type="button"
          className="favorites__save"
        >
          {isLoading ? "yüklənmə..." : "Yadda saxlayın "}
        </button>
      ) : (
        <Link to={`/list/${listId}`}>Siyahıya keçin</Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favoriteMovies: state.favoriteMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavorites: (Id) => {
      dispatch(removeMovieFromFavorites(Id));
    },
    getMoviesInList: (Id) => {
      dispatch(getMoviesInList(Id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
