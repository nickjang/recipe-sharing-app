import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import './Recipe.css';

class Recipe extends Component {
  handleEdit = (e) => {
    e.preventDefault();

    const recipeId = this.props.match.params.recipeId;
    const { history } = this.props
    history.push(`/recipes/${recipeId}/edit`)
  }

  async componentDidMount() {
    this.setState({ error: '' });
    try {
      const recipeId = this.props.match.params.recipeId;
      const {
        name,
        information,
        ingredients,
        instructions,
        author } = await RecipeSharingApiService.getRecipe(recipeId);
      this.setState({ name, information, ingredients, instructions, author })
    } catch ({ error }) {
      this.setState({ error });
    }
  }

  render() {
    const { name, information, ingredients, instructions, author } = this.state;
    const isAuthor =  != null && author.id === ; ///////////////////////////////////////////////////////
    return (
      <article>
        <div>
          <h2 className='lg-title'>Recipe</h2>
          <span>: </span>
          <h3 className='lg-title'>{name}</h3>
        </div>
        <p>{author.full_name && `By ${author.full_name}`}</p>
        {isAuthor &&
          <button
            className='lg-btn lg-btn-light mt-1 ml-auto'
            type='button'
            onClick={(e) => { this.handleEdit(e) }}
          > Edit recipe
            </button>}
        <p>{information}</p>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) =>
            <li key={index + '-ingredient'}>{ingredient}</li>
          )}
        </ul>
        <h3>Instructions:</h3>
        <ul>
          {instructions.map((instruction, index) =>
            <li key={index + '-instruction'}>{instruction}</li>
          )}
        </ul>
      </article >
    );
  }
}

export default withRouter(Recipe);