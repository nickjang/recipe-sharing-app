import React, { Component } from 'react';
import RecipeForm from '../../Components/RecipeForm/RecipeForm';
import './AddRecipe.css';

class AddRecipe extends Component {
  handleAddSuccess = (recipeId) => {
    this.props.history.push(`/recipes/${recipeId}`);
  }

  render() {
    return (
      <RecipeForm
        onSuccess={this.handleAddSuccess}
        title='Add Recipe'
        form='add-recipe-form'
        submitButtonText='Add recipe' />
    );
  }
}

AddRecipe.defaultProps = {
  location: {},
  history: {
    push: () => { }
  }
}

export default AddRecipe;