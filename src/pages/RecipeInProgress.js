import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailHeader from '../components/DetailHeader';
import { cocktailDetails, mealDetails } from '../components/services/dataFetchApi';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const { pathname } = history.location;

  const infoItem = async () => {
    let recipeInfo = recipe;
    if (pathname.includes('/meals')) {
      const getMeal = await mealDetails(id);
      recipeInfo = getMeal;
    } else if (pathname.includes('/drinks')) {
      const getDrink = await cocktailDetails(id);
      recipeInfo = getDrink;
    }
    setRecipe(recipeInfo);
  };

  useEffect(() => {
    infoItem();
  }, []);

  const defineRecipe = () => {
    let recipeInfo = {
      recipeTitle: '',
      recipeImage: '',
      recipeIngredients: [],
      recipeMeasures: [],
      recipeCategory: '',
      recipeVideo: '',
      checkboxesObj: {},
    };

    const listIngredient = [];
    const listMeasures = [];
    Object.entries(recipe[0]).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== null && value.length > 0) {
        listIngredient.push(value);
      }

      if (key.includes('strMeasure') && value !== null && value.length > 0) {
        listMeasures.push(value);
      }
    });

    if (recipe[0].strMeal) {
      recipeInfo = {
        recipeTitle: recipe[0].strMeal,
        recipeImage: recipe[0].strMealThumb,
        recipeIngredients: listIngredient,
        recipeMeasures: listMeasures,
        recipeCategory: recipe[0].strCategory,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
      };
    } else if (recipe[0].strDrink) {
      recipeInfo = {
        recipeTitle: recipe[0].strDrink,
        recipeImage: recipe[0].strDrinkThumb,
        recipeIngredients: listIngredient,
        recipeMeasures: listMeasures,
        recipeCategory: `${recipe[0].strAlcoholic} ${recipe[0].strCategory}`,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
      };
    }

    return recipeInfo;
  };

  const capitalize = (word) => word[0].toUpperCase() + word.substring(1, word.length - 1);
  const rawPath = pathname.split('/');
  const type = capitalize(rawPath[1]);
  const path = rawPath.slice(0, (rawPath.length - 1)).join('/');

  return (
    <div>
      {recipe.length > 0
        && (
          <>
            <DetailHeader recipe={ recipe[0] } type={ type } path={ path } />
            <p data-testid="instructions">
              { `Instructions: ${defineRecipe().recipeInstructions}`}
            </p>
            <iframe
              data-testid="video"
              src={ defineRecipe().recipeVideo }
              title={ defineRecipe().recipeTitle }
            />

            <div id="inProgress">
              <button
                data-testid="finish-recipe-btn"
                type="button"
              >
                Terminar Receita
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default RecipeInProgress;
