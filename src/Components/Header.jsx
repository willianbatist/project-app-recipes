import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Footer from './Footer';
import { ingredientsApi } from '../Services/ingredientsApi';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../Context/context';
import { drinksApi } from '../Services/drinksApi';
import '../styles/header.css';

function Header(props) {
  const [screen, setScreen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const {
    handleRadio,
    handleSearch,
    handleRecipes,
    fetchRadio,
    fetchSearch,

  } = useContext(Context);
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
      await handleRecipes(data);
      return data;
    } if (titlee === 'Foods') {
      const data = await ingredientsApi(searchh, radioo);
      await handleRecipes(data);
      return data;
    }
  }

  return (
    <div>
      <header className="header">
        <div className="div">
          <button
            type="button"
            data-testid="profile-top-btn"
            className="profile svg-icon"
            src={ profileIcon }
            onClick={ () => ClickToProfile(true) }
          >
            <img src={ profileIcon } alt="profile-icon" />
          </button>

          <h1 data-testid="page-title">{title}</h1>

          <button
            type="button"
            className="profile svg-icon"
            src={ searchIcon }
            onClick={ () => setScreen(!screen) }
          >
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        </div>
        {screen && (
          <div className="radio-button">
            <label htmlFor="ingredients-radio">
              Ingredient
              <input
                name="radioIngredients"
                type="radio"
                id="ingredients-radio"
                className="ingredient-radio-button"
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
                id="Name-radio"
                className="ingredient-radio-button"
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
                id="FirstLetter-radio"
                className="ingredient-radio-button"
                data-testid="first-letter-search-radio"
                value="First letter"
                onClick={ hadleChange }
              />
            </label>

            <div>

              <input
                type="text"
                data-testid="search-input"
                className="input-header"
                placeholder="Pesquise"
                onChange={ (e) => handleSearch(e.target.value) }
              />

              <button
                type="button"
                data-testid="exec-search-btn"
                className="button-searh"
                onClick={ () => handleClickApi(fetchSearch, fetchRadio, title) }
              >
                Search
              </button>

            </div>
          </div>
        )}
      </header>
      <Footer />
      { redirect && <Redirect to="/profile" />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
