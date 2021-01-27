import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Parallax } from 'react-parallax';
import RecipeSharingApiService from '../../services/recipe-sharing-api-service';
import cupcakesImg from '../../assets/images/cupcakes.jpg';

import './UserRecipes.css';

class UserRecipes extends Component {
  state = {
    recipes: [],
    hasMore: true,
    offset: 0,
    author: '',
    error: ''
  }

  fetchRecipes = async () => {
    this.setState({ error: '' });
    try {
      let offset = this.state.offset;
      const userId = this.props.match.params.userId;
      // fetch
      let { recipes, hasMore } = await RecipeSharingApiService.getMoreRecipes(12, offset, userId);
      // increase offset
      offset += recipes.length;
      // add new recipes to end
      recipes = this.state.recipes.concat(recipes)
      this.setState({ recipes, hasMore, offset });
    } catch ({ error }) {
      this.setState({ error });
    }
  }

  componentDidMount = async () => {
    this.setState({ error: '' });
    try {
      const userId = this.props.match.params.userId;
      const [{ full_name }] = await Promise.all([
        RecipeSharingApiService.getAuthor(userId),
        this.fetchRecipes()
      ]);
      this.setState({ author: full_name });
    } catch ({ error }) {
      this.setState({ error });
    }
  }

  generateRecipeCards = (recipes) => {
    return recipes.map((recipe, index) => {
      let timestamp;
      const dateObj = new Date(recipe.date_modified || recipe.date_created);
      if (recipe.date_modified) {
        timestamp = 'Updated: ';
        timestamp += dateObj.toDateString();
      } else {
        timestamp = 'Published: ';
        timestamp += dateObj.toDateString();
      }
      return <article key={`${index}-recipe`} className='rs-card recipe-card'>
        <Link
          to={`/recipes/${recipe.id}`}
          className='rs-sub-title'
        >
          {recipe.name}
        </Link>
        <p className='note'>{`Author: ${recipe.author.full_name}`}</p>
        <p className='note recipe-information'>{recipe.information}</p>
        <p className='timestamp'>{timestamp}</p>
      </article>
    });
  }

  generateGroupedCards = (recipes) => {
    recipes = this.generateRecipeCards(recipes);
    let size = 3;
    let recipeIdx = 0;
    let groupIdx = -1;
    let length = recipes.length;
    const groups = [];
    while (recipeIdx < length) {
      if (recipeIdx % size === 0) {
        groupIdx++;
        groups[groupIdx] = [];
      }
      groups[groupIdx].push(recipes[recipeIdx]);
      recipeIdx++;
    }

    // return the grouped cards
    return groups.map(group =>
      <div key={`${group}-group`} className='recipe-group'>
        {group}
      </div>
    );
  }

  render() {
    const { recipes, hasMore, author, error } = this.state;

    return (
      <>
        <Parallax
          blur={0}
          bgImage={cupcakesImg}
          bgImageAlt="Chocolate cupcakes stacked with chocolate powder sprinkling on top"
          strength={200}
        >
          <h2 className='rs-title author-name'>{author}</h2>
        </Parallax>
        <InfiniteScroll
          dataLength={recipes.length}
          next={this.fetchRecipes}
          hasMore={hasMore}
          loader={<span>Loading...</span>}
          endMessage={error
            ? <p className='error text-center'>{error}</p>
            : <p className='note text-center'>End of recipes</p>}
          className='recipe-card-list'
        > {this.generateGroupedCards(recipes)}
        </InfiniteScroll >
      </>
    );
  }
}

UserRecipes.defaultProps = {
  match: {
    params: {
      userId: -1
    }
  }
}

export default UserRecipes;