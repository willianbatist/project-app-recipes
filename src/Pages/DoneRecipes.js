import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import Header from '../Components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  function nationality(data) {
    if (data.type === 'food') {
      return (
        <p>{ `${data.nationality} - ${data.category}` }</p>
      );
    }
    if (data.type === 'drink') {
      return (
        <p>{ data.category }</p>
      );
    }
  }

  useEffect(() => {
    if (doneRecipesLocal === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, [doneRecipesLocal]);

  useEffect(() => {
    setDoneRecipes(doneRecipesLocal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header>
        <Header title="Done Recipes" />
      </header>
      <button
        type="button"
        className="button-ingredients-first"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        className="button-ingredients-second"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        className="button-ingredients-third"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { doneRecipes && doneRecipes.map((data, index) => (
        <div key={ data.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ `name of ${data.type} ${data.name}` }
            src={ data.image }
          />
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            { nationality(data) }
          </span>
          <p data-testid={ `${index}-horizontal-name` }>{ data.name }</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ data.doneDate }</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          { data.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          )) }
        </div>
      )) }
    </div>
  );
}
export default DoneRecipes;
