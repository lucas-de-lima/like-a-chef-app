import { arrayOf, bool, string } from 'prop-types';
import React from 'react';

export default function IngredientList({ ingredients, measures, inProgress }) {
  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            {inProgress ? (
              <label
                htmlFor={ `${i}-ingredient-step>` }
                data-testid={ `${i}-ingredient-step>` }
              >
                <input
                  type="checkbox"
                  name="ingredient-step"
                  id={ `${i}-ingredient-step>` }
                />

                <span>{`${ingredient}`}</span>
                {' - '}
                <span>{measures[i]}</span>
              </label>
            ) : (
              <>
                <span>{`${ingredient}`}</span>
                {' - '}
                <span>{measures[i]}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientList.propTypes = {
  ingredients: arrayOf(string).isRequired,
  measures: arrayOf(string).isRequired,
  inProgress: bool,
};

IngredientList.defaultProps = {
  inProgress: false,
};

// IngredientList.propTypes = {}.isRequired;
