import React, { useState } from 'react';
import './ListPage.css';
import { connect } from "react-redux";

const ListPage = (props) => {
    const [movies] = useState([
        { title: 'The Godfather', year: 1972, imdbID: 'tt0068646' }
    ]);

    return (
        <div className="list-page">
            <h1 className="list-page__title">{props.moviesList.title}</h1>
            <ul>
                {props.moviesList.movies.map((id) => {
                    return (
                        <li key={id} className="movie__item">
                            <a rel="noreferrer" href={`https://www.imdb.com/title/${id}/`} target="_blank">
                                {props.favoriteMovies.map((movie) => {
                                    return id === movie.id ? `${movie.title} (${movie.year})` : false
                                })}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        moviesList: state.moviesList,
        favoriteMovies: state.favoriteMovies
    }
}

export default connect(mapStateToProps)(ListPage);
