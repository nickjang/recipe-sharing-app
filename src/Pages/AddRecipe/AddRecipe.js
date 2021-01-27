import React, { Component } from 'react';
import RecipeForm from '../../Components/RecipeForm/RecipeForm';
import UserService from '../../services/user-service';
import './AddRecipe.css';

class AddRecipe extends Component {
  handleAddSuccess = (recipeId) => {
    this.props.history.push(`/recipes/${recipeId}`);
  }

  render() {
    const userId = UserService.getUserId();

    return (
      <>
        {userId === 1 &&
          <p className='note text-center mb-0'>Cannot create, edit, or delete recipes with demo account</p>}
        <RecipeForm
          onSuccess={this.handleAddSuccess}
          title='Add Recipe'
          form='add-recipe-form'
          submitButtonText='Add recipe'
          fetchRecipe={false} />
      </>
    );
  }
}

AddRecipe.defaultProps = {
  history: {
    push: () => { }
  }
}

export default AddRecipe;