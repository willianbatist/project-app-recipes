import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../Components/Footer';
import Foods from '../Services/suprisesFoods';
import Header from '../Components/Header';
import '../styles/exploreFoods.css';

function ExploreFoods() {
  const history = useHistory();

  function screenFoodsMeals() {
    history.push('/explore/foods/ingredients');
  }

  function screenNationality() {
    history.push('/explore/foods/nationalities');
  }

  const [conditional, setConditional] = useState(false);
  const [id, setId] = useState();

  async function FoodsRandom() {
    const url = window.location.href;
    console.log(url);
    const randomFoods = await Foods();
    const { meals } = randomFoods;
    setId(meals[0].idMeal);
    setConditional(true);
  }
  return (
    <div>
      <header>
        <Header title="Explore Foods" />
      </header>

      <div>
        <button
          type="button"
          className="button-ingredients-first"
          data-testid="explore-by-ingredient"
          onClick={ screenFoodsMeals }
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-by-nationality"
          className="button-ingredients-second"
          onClick={ screenNationality }
        >
          By Nationality
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          className="button-ingredients-third"
          onClick={ FoodsRandom }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
      {conditional && <Redirect to={ `/foods/${id}` } />}
    </div>
  );
}
export default ExploreFoods;
