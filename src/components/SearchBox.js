import React, { useState } from 'react';
import { connect } from 'react-redux';
import { findMovies } from '../redux/action';
import './SearchBox.css';

const SearchBox = ({ findMovies }) => {
  const [searchLine, setSearchLine] = useState('');

  const searchLineChangeHandler = (e) => {
    setSearchLine(e.target.value.trim());
  };

  const searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    if (searchLine) {
      findMovies(searchLine);
    }
  };

  return (
    <div className="search-box">
      <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
        <label className="search-box__form-label">
          Filmin adını daxil edin:
          <input
            value={searchLine}
            type="text"
            className="search-box__form-input"
            placeholder="nümunə,Game of Thrones"
            onChange={searchLineChangeHandler}
          />
        </label>
        <button
          type="submit"
          className="search-box__form-submit"
          disabled={!searchLine}
        >
          Axtar
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    findMovies: (searchLine) => {
      dispatch(findMovies(searchLine));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(SearchBox);