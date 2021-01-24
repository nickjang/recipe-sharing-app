import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RecipeInput from '../RecipeInput/RecipeInput';
import './RecipeForm.css';

class RecipeForm extends Component {
  state = {
    name: {
      value: this.props.name,
      touched: false
    },
    information: this.props.information,
    ingredients: this.props.ingredients,
    instructions: this.props.instructions,
    loading: false,
    error: null
  }

  nameRef = React.createRef();

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
    ingredients[idx].name = value;
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
        if (item.measurement && item.name) return false;
      } else if (type === 'instructions') {
        if (item) return false;
      }
    }
    return true; // = invalid
  }

  /* Add ingredient or instruction */

  handleAddRecipeItem = (type = '') => {
    const list = [...this.state[type]];
    if (type === 'ingredients')
      list.push({ measurement: '', name: '' });
    else
      list.push('');
    this.setState({ [type]: list });
  }

  /* Add, update, or delete recipe */

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: null })
      // api call
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handleDelete = (e) => {
    e.preventDefault()
    this.setState({ error: null })
      // api call
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    if (this.nameRef.current) this.nameRef.current.focus();
  }

  render() {
    const { title, form, submitButtonText } = this.props;
    const { error, loading, name, ingredients, instructions } = this.state;

    return (
      <article className='form'>
        <h2 className='lg-title'>{title}</h2>
        <output
          form={form}
          className={`form-status ${error ? 'fail-status' : ''}`}
        > {error || (loading && 'Submitting...')}
        </output>
        <form action='' id={form}>
          {/* Recipe name */}
          <RecipeInput
            form={form}
            id='name'
            ref={this.nameRef}
            touched={name}
            validate={this.validateName}
            update={this.updateName}
            label={<h3 className='input-label'><label htmlFor='name'>Name:</label></h3>} />
          {/* Delete recipe */
            form === 'edit-recipe-form' &&
            <button
              className='lg-btn lg-btn-light mt-1 ml-auto'
              type='reset'
              form={form}
              onClick={(e) => { this.handleDelete(e) }}
            > Delete recipe
            </button>}
          {/* Recipe information */}
          <h3>
            <label htmlFor='information'>Information:</label>
          </h3>
          <input
            type='text'
            id='information'
            name='information'
            onChange={(e) => this.updateInformation(e.target.value)} />
          {/* Recipe ingredients */}
          <h3>
            Ingredients:
            <span className='hint'><sup>*</sup></span>
          </h3>
          <ul>
            {ingredients.map(({ measurement, name }, index) => {
              const measureId = index + '-measurement';
              const nameId = index + '-name';
              return (
                <li key={index + '-ingredient'}>
                  <RecipeInput
                    form={form}
                    id={measureId}
                    update={(value) => this.updateMeasurement(index, value)}
                    label={<label htmlFor={measureId} className='input-label'>Amount:</label>} />
                  <RecipeInput
                    form={form}
                    id={nameId}
                    update={(value) => this.updateIngredientName(index, value)}
                    label={<label htmlFor={nameId} className='input-label'>Ingredient:</label>} />
                </li>
              );
            })}
          </ul>
          <button
            className='lg-btn lg-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => { this.handleAddRecipeItem(e, 'ingredients') }}
          > Add ingredient
          </button>
          {/* Recipe instructions */}
          <h3>
            Instructions:
            <span className='hint'><sup>*</sup></span>
          </h3>
          <ul>
            {instructions.map((instruction, index) => {
              const id = index + '-instruction';
              return <RecipeInput
                key={id}
                form={form}
                id={id}
                update={(value) => this.updateInstruction(index, value)}
                ariaLabel={`Enter instruction step ${index + 1}`} />
            })}
          </ul>
          <button
            className='lg-btn lg-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => { this.handleAddRecipeItem(e, 'instructions') }}
          > Add instruction
          </button>
          {/* Submit */}
          <button
            className='lg-btn lg-btn-light mt-1'
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
  title: 'Add Recipe',
  form: 'add-recipe-form',
  submitButtonText: 'Add recipe',
  name: '',
  information: '',
  ingredients: [],
  instructions: []
}

RecipeForm.propTypes = {
  onSuccess: PropTypes.func,
  title: PropTypes.oneOf(['Add Recipe', 'Edit Recipe']).isRequired,
  form: PropTypes.oneOf(['add-recipe-form', 'edit-recipe-form']).isRequired,
  submitButtonText: PropTypes.oneOf(['Add recipe', 'Make changes']).isRequired,
  name: PropTypes.string,
  information: PropTypes.string,
  ingredients: PropTypes.array,
  instructions: PropTypes.array
}

export default withRouter(RecipeForm);