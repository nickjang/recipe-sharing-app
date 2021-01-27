import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RecipeInput from '../RecipeInput/RecipeInput';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import UserService from '../../services/user-service';
import './RecipeForm.css';

class RecipeForm extends Component {
  state = {
    name: {
      value: '',
      touched: false
    },
    information: '',
    ingredients: [],
    instructions: [],
    loading: '',
    error: null
  }

  /* Update and validate functions */

  updateName = (name) => {
    this.setState({ name: { value: name, touched: true } });
  }

  updateInformation = (information) => {
    this.setState({ information });
  }

  updateMeasurement = (idx, value) => {
    const ingredients = [...this.state.ingredients];
    ingredients[idx].measurement = value;
    this.setState({ ingredients });
  }

  updateIngredientName = (idx, value) => {
    const ingredients = [...this.state.ingredients];
    ingredients[idx].ingredient = value;
    this.setState({ ingredients });
  }

  updateInstruction = (idx, value) => {
    const instructions = [...this.state.instructions];
    instructions[idx] = value;
    this.setState({ instructions });
  }

  validateName = () => {
    const name = this.state.name.value.trim();
    if (!name) return 'Name cannot be empty.';
    return;
  }

  validateRecipe = (type) => {
    // if one item exists, return
    for (const item of this.state[type]) {
      if (type === 'ingredients') {
        if (item.measurement && item.ingredient) return false;
      } else if (type === 'instructions') {
        if (item) return false;
      }
    }
    return true; // = invalid
  }

  /* Add ingredient or instruction */

  handleAddRecipeItem = (e, type = '') => {
    e.preventDefault();

    const list = [...this.state[type]];
    if (type === 'ingredients')
      list.push({ measurement: '', ingredient: '' });
    else
      list.push('');
    this.setState({ [type]: list });
  }

  /* Add, update, or delete recipe */

  handleSubmit = (e) => {
    e.preventDefault();

    let { name, information, ingredients, instructions } = this.state;
    // filter out entries with empty values
    ingredients = ingredients.filter(({ measurement, ingredient }) => measurement && ingredient);
    instructions = instructions.filter((instructions) => instructions);

    const inputs = [name.value, information, ingredients, instructions];
    const func = this.props.form === 'add-recipe-form'
      ? () => RecipeSharingApiService.postRecipe(...inputs)
      : () => RecipeSharingApiService.updateRecipe(this.props.recipeId, ...inputs);

    this.setState({ error: null, loading: 'Submitting...' })
    func()
      .then(({ id }) => {
        this.setState(
          { loading: '' },
          () => this.props.onSuccess(id)
        )
      })
      .catch(res => {
        this.setState({ error: res.error, loading: '' })
      });
  }

  handleDelete = (e) => {
    e.preventDefault();

    this.setState({ error: null, loading: 'Deleting...' })
    RecipeSharingApiService.deleteRecipe(this.props.recipeId)
      .then(() => {
        this.setState(
          { loading: '' },
          () => this.props.onDelete()
        )
      })
      .catch(res => {
        this.setState({ error: res.error, loading: '' })
      });
  }

  componentDidMount() {
    const { fetchRecipe, recipeId } = this.props;
    const userId = UserService.getUserId();

    if (fetchRecipe) {
      this.setState({ error: '', loading: 'Getting recipe...' });
      RecipeSharingApiService.getRecipe(recipeId)
        .then(({ name, information, ingredients, instructions, author }) => {
          if (userId === author.id) {
            this.setState({
              name: {
                value: name,
                touched: false
              },
              information,
              ingredients,
              instructions,
              loading: ''
            });
          } else {
            this.setState({ error: 'User is not author of recipe', loading: '' });
          }
        })
        .catch(({ error }) => this.setState({ error, loading: '' }));
    }
  }

  render() {
    const { title, form, submitButtonText } = this.props;
    const { name, information, ingredients, instructions, loading, error } = this.state;

    return (
      <article className='form recipe-form'>
        <h2 className='rs-title'>{title}</h2>
        <output
          form={form}
          className={`form-status mb-1 ${error ? 'fail-status' : ''}`}
        > {error || loading}
        </output>
        <form action='' id={form}>
          {/* Recipe name */}
          <RecipeInput
            form={form}
            id='name'
            value={name.value}
            touched={name.touched}
            validate={this.validateName}
            update={this.updateName}
            label={<h3 className='input-label rs-sub-title'><label htmlFor='name'>Name:</label></h3>} />
          {/* Delete recipe */
            form === 'edit-recipe-form' &&
            <button
              className='rs-btn rs-btn-light mt-1 ml-auto'
              type='reset'
              form={form}
              onClick={(e) => { this.handleDelete(e) }}
            > Delete recipe
            </button>}
          {/* Recipe information */}
          <h3 className='rs-sub-title w-fit mr-auto'>
            <label htmlFor='information'>Information:</label>
          </h3>
          <textarea
            className='recipe-text-area'
            id='information'
            name='information'
            value={information}
            onChange={(e) => this.updateInformation(e.target.value)} />
          {/* Recipe ingredients */}
          <h3 className='rs-sub-title w-fit mr-auto'>
            Ingredients:
            <span className='hint'><sup>*</sup></span>
          </h3>
          <ul className='recipe-list'>
            {ingredients.map(({ measurement, ingredient }, index) => {
              const measureId = index + '-measurement';
              const ingredientId = index + '-ingredient';
              return (
                <li key={ingredientId}>
                  <RecipeInput
                    form={form}
                    id={measureId}
                    value={measurement}
                    update={(value) => this.updateMeasurement(index, value)}
                    label={<label htmlFor={measureId} className='input-label'>Amount:</label>} />
                  <RecipeInput
                    form={form}
                    id={ingredientId}
                    value={ingredient}
                    update={(value) => this.updateIngredientName(index, value)}
                    label={<label htmlFor={ingredientId} className='input-label'>Ingredient:</label>} />
                </li>
              );
            })}
          </ul>
          <button
            className='rs-btn rs-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => this.handleAddRecipeItem(e, 'ingredients')}
          > Add ingredient
          </button>
          {/* Recipe instructions */}
          <h3 className='rs-sub-title w-fit mr-auto'>
            Instructions:
            <span className='hint'><sup>*</sup></span>
          </h3>
          <ol className='recipe-list'>
            {instructions.map((instruction, index) => {
              const id = index + '-instruction';
              return (
                <li key={id}>
                  <RecipeInput
                    form={form}
                    id={id}
                    value={instruction}
                    update={(value) => this.updateInstruction(index, value)}
                    label={<label htmlFor={id} className='input-label'>{index + 1}.</label>} />
                </li>
              );
            })}
          </ol>
          <button
            className='rs-btn rs-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => this.handleAddRecipeItem(e, 'instructions')}
          > Add instruction
          </button>
          {/* Submit */}
          <button
            className='rs-btn rs-btn-light mt-3 ml-auto mb-1 break'
            type='submit'
            form={form}
            onClick={(e) => { this.handleSubmit(e) }}
            disabled={
              this.validateName() ||
              this.validateRecipe('ingredients') ||
              this.validateRecipe('instructions')}
          > {submitButtonText}
          </button>
        </form>
      </article>
    );
  }
}

RecipeForm.defaultProps = {
  onSuccess: () => { },
  onDelete: () => { },
  title: 'Add Recipe',
  form: 'add-recipe-form',
  submitButtonText: 'Add recipe',
  fetchRecipe: false,
  recipeId: -1,
}

RecipeForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  title: PropTypes.oneOf(['Add Recipe', 'Edit Recipe']).isRequired,
  form: PropTypes.oneOf(['add-recipe-form', 'edit-recipe-form']).isRequired,
  submitButtonText: PropTypes.oneOf(['Add recipe', 'Make changes']).isRequired,
  fetchRecipe: PropTypes.bool.isRequired,
  recipeId: PropTypes.number
}

export default withRouter(RecipeForm);