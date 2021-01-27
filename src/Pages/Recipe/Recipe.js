import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import UserService from '../../services/user-service';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import cupcakesImg from '../../assets/images/cupcakes.jpg';
import './Recipe.css';

class Recipe extends Component {
  state = {
    name: '',
    information: '',
    ingredients: [],
    instructions: [],
    author: {}
  }

  handleEdit = (e) => {
    e.preventDefault();

    const recipeId = this.props.match.params.recipeId;
    this.props.history.push(`/recipes/${recipeId}/edit`)
  }

  componentDidMount() {
    this.setState({ error: '' });
    const recipeId = this.props.match.params.recipeId;
    RecipeSharingApiService.getRecipe(recipeId)
      .then(({ name, information, ingredients, instructions, author }) => {
        this.setState({ name, information, ingredients, instructions, author })
      })
      .catch(({ error }) => this.setState({ error }));
  }

  render() {
    const { name, information, ingredients, instructions, author } = this.state;
    const userId = UserService.getUserId();
    const isAuthor = userId != null && author.id === userId;

    return (
      <article className='recipe-page mb-2'>
        <Parallax
          blur={0}
          bgImage={cupcakesImg}
          bgImageAlt="Chocolate cupcakes stacked with chocolate powder sprinkling on top"
          strength={200}
        >
          <div className='recipe-name'>
            <h2 className='rs-title mr-1'>Recipe:</h2>
            <h3 className='rs-title'>{name}</h3>
          </div>
        </Parallax>
        <p className='recipe-author note'>{author.full_name && `By ${author.full_name}`}</p>
        <p className='recipe-information rs-body'>{information}</p>
        <h3 className='recipe-ingredients rs-sub-title w-fit mr-auto'>Ingredients:</h3>
        <ul className='recipe-ingredients recipe-list note'>
          {ingredients.map((ingredient, index) =>
            <li key={index + '-ingredient'}>{ingredient.measurement + ' ' + ingredient.ingredient}</li>
          )}
        </ul>
        <h3 className='recipe-instructions rs-sub-title w-fit mr-auto'>Instructions:</h3>
        <ul className='recipe-instructions recipe-list note'>
          {instructions.map((instruction, index) =>
            <li key={index + '-instruction'}>{index + 1}. {instruction}</li>
          )}
        </ul>
        {isAuthor &&
          <button
            className='rs-btn rs-btn-light mt-3'
            type='button'
            onClick={(e) => { this.handleEdit(e) }}
          > Edit recipe
          </button>}
      </article >
    );
  }
}

Recipe.defaultProps = {
  match: {
    params: {
      recipeId: -1
    }
  },
  history: {
    push: () => { }
  }
}

export default Recipe;