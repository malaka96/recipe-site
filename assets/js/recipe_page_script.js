import { getRecipeById } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

const ingredientsList = [];

async function getRecipeDataById(id){
    const recipe = await getRecipeById(id);

    const title = document.getElementById('title');
    title.innerText = recipe[0].strMeal;

    const image = document.getElementById('recipe-page-img');
    image.src = recipe[0].strMealThumb;

    const instructions = document.getElementById('instructions');
    instructions.innerText = recipe[0].strInstructions;

    for (let i = 1; i <= 20; i++) {
    const key = `strIngredient${i}`;
    const value = recipe[0][key];
    if (value && value.trim() !== '') {
      ingredientsList.push(value.trim());
    }

    const ingredients = document.getElementById('ingredients');
    ingredients.innerText = ingredientsList.join(', ');

  }

}

getRecipeDataById(recipeId);