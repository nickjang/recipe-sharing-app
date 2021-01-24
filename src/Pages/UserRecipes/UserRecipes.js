import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Recipes.css';

class UserRecipes extends Component {
  state = {
    recipes: [],
    hasMore: false,
    author: '',
    error: ''
  }

  async fetchRecipes() {
    this.setState({ error: '' });
    try {
      const userId = this.props.match.params.userId;
      let { recipes, hasMore } = await RecipeSharingApiService.getMoreRecipes(12, userId);
      recipes = this.state.recipes.concat(recipes)
      this.setState({ recipes, hasMore });
    } catch ({ error }) {
      this.setState({ error, hasMore: false });
    }
  }

  async componentDidMount() {
    this.setState({ error: '' });
    try {
      const userId = this.props.match.params.userId;
      const { full_name } = await RecipeSharingApiService.getAuthor(userId);
      this.setState({ author: full_name });
    } catch ({ error }) {
      this.setState({ error });
    }
  }

  render() {
    const { recipes, hasMore, author, error } = this.state;

    return (
      <>
        <div>
          <h2>{author}</h2>
        </div>
        <InfiniteScroll
          dataLength={recipes.length}
          next={this.fetchRecipes}
          hasMore={hasMore}
          loader={<span>Loading...</span>}
          endMessage={error
            ? <p className='error'>{error}</p>
            : <p>End of recipes</p>}
        > {recipes.map((recipe) =>
          // style to show hand/link
          <article onClick={this.props.history.push(`/recipes/${recipe.id}`)}>
            <p>{recipe.name}</p>
            <p>{`Author: ${recipe.author.full_name}`}</p>
            <p>{recipe.information}</p>
            <ul>
              {recipe.ingredients.map(ingredient =>
                <li>{ingredient}</li>
              )}
            </ul>
          </article>
        )}
        </InfiniteScroll >
      </>
    );
  }
}

export default withRouter(UserRecipes);