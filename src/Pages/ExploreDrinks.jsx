import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../Components/Footer';
import Drinks from '../Services/suprisesDrink';
import Header from '../Components/Header';
import '../styles/exploreDrinks.css';

function ExploreDrinks() {
  const history = useHistory();

  function screenDrinksMeal() {
    history.push('/explore/drinks/ingredients');
  }

  const [conditional, setConditional] = useState(false);
  const [id, setId] = useState();

  async function DrinksRandom() {
    const url = window.location.href;
    console.log(url);
    const randomDrinks = await Drinks();
    const { drinks } = randomDrinks;
    setId(drinks[0].idDrink);
    setConditional(true);
  }
  return (

    <div>
      <header>
        <Header title="explore Drinks" />
      </header>
      <div>
        <div>
          <button
            type="button"
            className="button-explore "
            data-testid="explore-by-ingredient"
            onClick={ screenDrinksMeal }
          >
            By Ingredient
          </button>

          <button
            type="button"
            data-testid="explore-surprise"
            className="button-explore-surprise"
            onClick={ DrinksRandom }
          >
            Surprise me!
          </button>
        </div>
        ;
      </div>
      <Footer />
      {conditional && <Redirect to={ `/drinks/${id}` } />}
    </div>
  );
}
export default ExploreDrinks;
