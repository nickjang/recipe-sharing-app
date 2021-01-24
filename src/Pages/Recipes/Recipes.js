import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Recipes.css';

class Recipes extends Component {
  state = {
    recipes: [],
    hasMore: true,
    error: ''
  }

  async fetchRecipes() {
    this.setState({ error: '' });
    try {
      let { recipes, hasMore } = await RecipeSharingApiService.getMoreRecipes(10);
      recipes = this.state.recipes.concat(recipes)
      this.setState({ recipes, hasMore });
    } catch ({ error }) {
      this.setState({ error });
    }
  }

  render() {
    const { recipes, hasMore, error } = this.state;

    return (
      <InfiniteScroll
        dataLength={recipes.length}
        next={this.fetchRecipes}
        hasMore={hasMore}
        loader={<span>Loading...</span>}
        endMessage={error
          ? <p className='error'>{error}</p>
          : <p>End of recipes</p>}
      > {recipes.map((recipe) =>
        <article>
          <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          <p>{`Author: ${recipe.author.full_name}`}</p>
          <p>{recipe.information}</p>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li>{ingredient}</li>
            )}
          </ul>
        </article>
      )}
      </InfiniteScroll>
    );
  }
}

export default Recipes;