import React, { Component } from 'react';
import RecipeForm from '../../Components/RecipeForm/RecipeForm';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import './EditRecipe.css';

class EditRecipe extends Component {
  handleEditSuccess = () => {
    const recipeId = this.props.match.params.recipeId;
    this.props.history.push(`/recipes/${recipeId}`);
  }

  handleDeleteSuccess = () => {
    if ( == null) return;
    this.props.history.push(`/user/${ }/recipes`) ///////////////////////////////////////////////////////
  }

  render() {
    const recipeId = this.props.match.params.recipeId;
    return RecipeSharingApiService.getRecipe(recipeId)
      .then((res) => {
        const { name, information, ingredients, instructions, author } = res;

        if (author.id !== )
          return <p className='error'>User is not owner of recipe</p>

        return (
          <RecipeForm
            onSuccess={this.handleEditSuccess}
            onDelete={this.handleDeleteSuccess}
            title='Edit Recipe'
            form='edit-recipe-form'
            submitButtonText='Make changes'
            name={name}
            information={information}
            ingredients={ingredients}
            instructions={instructions} />
        );
      })
      .catch (({ error }) => <p className='error'>{error}</p>);
  }
}

EditRecipe.defaultProps = {
  location: {},
  history: {
    push: () => { }
  }
}

export default EditRecipe;