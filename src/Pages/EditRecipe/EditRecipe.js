import React, { Component } from 'react';
import RecipeForm from '../../Components/RecipeForm/RecipeForm';
import UserService from '../../services/user-service';
import './EditRecipe.css';

class EditRecipe extends Component {
  handleEditSuccess = (recipeId) => {
    this.props.history.push(`/recipes/${recipeId}`);
  }

  handleDeleteSuccess = () => {
    const userId = UserService.getUserId();
    if (userId == null) return;
    this.props.history.push(`/users/${userId}/recipes`)
  }

  render() {
    const userId = UserService.getUserId();

    return (
      <>
        {userId === 1 &&
          <p className='note text-center mb-0'>Cannot create, edit, or delete recipes with demo account</p>}
        <RecipeForm
          onSuccess={this.handleEditSuccess}
          onDelete={this.handleDeleteSuccess}
          title='Edit Recipe'
          form='edit-recipe-form'
          submitButtonText='Make changes'
          fetchRecipe={true}
          recipeId={Number(this.props.match.params.recipeId)} />
      </>
    );
  }
}

EditRecipe.defaultProps = {
  match: {
    params: {
      recipeId: -1
    }
  },
  history: {
    push: () => { }
  }
}

export default EditRecipe;