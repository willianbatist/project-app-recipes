import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';

import Header from '../Components/Header';
import '../styles/explore.css';

function Explore() {
  const history = useHistory();

  function exploreFoods() {
    history.push('/explore/foods');
  }

  function exploreDrinks() {
    history.push('/explore/drinks');
  }

  return (
    <div>
      {/* <header>
        <button
          type="button"
          src={ profileIcon }
          className="header"
        >
          <img
            src={ profileIcon }
            className="header"
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </button>

        <h2
          data-testid="page-title"
          className="header"
        >
          Explore
        </h2>
      </header> */}
      <Header title="Explore" />
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ exploreFoods }
          className="button-explore"
        >
          Explore Foods
        </button>

        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ exploreDrinks }
          className="button-explore-drinks"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Explore;
