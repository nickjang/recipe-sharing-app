import TokenService from './token-service';
import config from '../config';

const RecipeSharingApiService = {
  getMoreRecipes(limit, offset, userId = null) {
    let queryString = `?limit=${limit}&offset=${offset}`;
    if (userId) queryString += `&userId=${userId}`;
    return fetch(`${config.API_ENDPOINT}/recipes${queryString}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAuthor(userId) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postRecipe(name, information, ingredients, instructions) {
    const recipe = { name, information, ingredients, instructions };

    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(recipe),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateRecipe(recipeId, name, information, ingredients, instructions) {
    const recipe = { name, information, ingredients, instructions };

    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(recipe),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return;
      })
  }
}

export default RecipeSharingApiService
