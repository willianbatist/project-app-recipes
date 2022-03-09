import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Footer from './Footer';
import ingredientsApi from '../Services/ingredientsApi';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../Context/context';
import drinksApi from '../Services/drinksApi';

function Header(props) {
  const [screen, setScreen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { handleRadio, handleSearch, fetchRadio, fetchSearch } = useContext(Context);
  const { title } = props;
  const ClickToProfile = (boo) => {
    setRedirect(boo);
  };

  function hadleChange(e) {
    const { value } = e.target;
    return handleRadio(value);
  }

  async function handleClickApi(searchh, radioo, titlee) {
    if (titlee === 'Drinks') {
      const data = await drinksApi(searchh, radioo);
      return data;
    } if (titlee === 'Foods') {
      const data = await ingredientsApi(searchh, radioo);
      return data;
    }
  }
  console.log(redirect);
  return (
    <div>
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ () => ClickToProfile(true) }
        >
          <img src={ profileIcon } alt="profile-icon" />
        </button>

        <h1 data-testid="page-title">{title}</h1>

        <button
          type="button"
          src={ searchIcon }
          onClick={ () => setScreen(!screen) }
        >
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
        </button>
        {screen && (
          <div>
            <label htmlFor="ingredients-radio">
              Ingredient
              <input
                name="radioIngredients"
                type="radio"
                data-testid="ingredient-search-radio"
                value="Ingredient"
                onClick={ hadleChange }
              />
            </label>

            <label htmlFor="Name-radio">
              Name
              <input
                name="radioIngredients"
                type="radio"
                data-testid="name-search-radio"
                value="Name"
                onClick={ hadleChange }
              />
            </label>

            <label htmlFor="FirstLetter-radio">
              First Letter
              <input
                name="radioIngredients"
                type="radio"
                data-testid="first-letter-search-radio"
                value="First letter"
                onClick={ hadleChange }
              />
            </label>

            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => handleClickApi(fetchSearch, fetchRadio, title) }
            >
              Search
            </button>

            <input
              type="text"
              data-testid="search-input"
              placeholder="pesquise"
              onChange={ (e) => handleSearch(e.target.value) }
            />
          </div>
        )}
      </header>
      <Footer />
      { redirect && <Redirect to="/profile" />}
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;