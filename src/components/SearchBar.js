import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input
          type="text"
          name="query"
          id="query"
          data-testid="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            name="ingredient"
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Recipe name
          <input
            type="radio"
            name="name"
            id="name"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          First letter
          <input
            type="radio"
            name="first-letter"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </form>
  );
}

SearchBar.propTypes = {}.isRequired;
