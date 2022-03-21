import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import IngredientDrinksAPI from '../Services/ingredientsDrinks';
import '../styles/ingredientsDrinks.css';
import Header from '../Components/Header';
import context from '../Context/context';

function IngredientsDrinks() {
  const [ingredientes, setIngredientes] = useState();
  const { setFilterIngredients } = useContext(context);
  /* const [redirect, setRedirect] = useState(); */
  const ZERO = 0;
  const TWELVE = 12;
  const { pathname } = useLocation();
  /* componentDidMount */
  useEffect(() => {
    async function ingredientDrink() {
      const { drinks } = await IngredientDrinksAPI();
      setIngredientes(drinks.slice(ZERO, TWELVE));
    }
    ingredientDrink();
  }, []);

  async function filterDrinks(ingredient) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`;
    const response = await fetch(url);
    const { drinks } = await response.json();
    setFilterIngredients(drinks.slice(ZERO, TWELVE));
  }

  return (
    <div>
      <header>
        <Header title="ExploreDrinks" />
        {ingredientes
          && ingredientes.map((ingredient, index) => (
            <Link
              onClick={ () => filterDrinks(ingredient) }
              to={ `/${pathname.split('/')[2]}` }
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt="#"
                className="imagem-ingredientes"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
                className="paragraph"
              >
                {ingredient.strIngredient1}
              </p>

            </Link>
          ))}

      </header>
      <Footer />
    </div>
  );
}
export default IngredientsDrinks;
