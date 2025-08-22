import { getAllRecipes, } from "./api.js";

console.log("script is loaded");

async function allToHome() {
  const allRecipes = await getAllRecipes();
  console.log("Total recipes:", allRecipes.length);
  console.log(allRecipes);
  console.log(allRecipes[0].strMeal);

  const cardsHolder = document.querySelector('.cards');
  allRecipes.forEach(recipe => {

    const id = recipe.idMeal;

    const card = document.createElement('div');
    card.classList.add('custom-card');

    const image = document.createElement('img');
    image.src = recipe.strMealThumb;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const title = document.createElement('h3');
    title.textContent = recipe.strMeal;

    const subTitle = document.createElement('p');
    subTitle.textContent = recipe.strArea;

    cardContent.appendChild(title);
    cardContent.appendChild(subTitle);

    card.appendChild(image);
    card.appendChild(cardContent);

    card.addEventListener('click', () => getRecipe(id));

    cardsHolder.appendChild(card);

  });

//   allRecipes.forEach(recipe => {
//     console.log(recipe.strMeal);
//   });
}

allToHome();

async function getRecipe(id){
    console.log(id);
    window.location.href = `recipe.html?id=${id}`;
}
