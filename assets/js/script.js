import { getAllRecipes, searchMeal, getAllAreas, filterByArea } from "./api.js";

console.log("script is loaded");

document.getElementById('all-recipe-chip').addEventListener("click", function(){
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("clicked"));
  this.classList.add('clicked');
  allToHome();
});

const chipHolder = document.querySelector('.chips');
async function showFilters(){
  const areas = await getAllAreas();
  areas.forEach(area => {
    const chip = document.createElement('div');
    chip.classList.add('chip');

    const chipText = document.createElement('p');
    chipText.textContent = area.strArea;

    chip.appendChild(chipText);
    chip.addEventListener("click", function(){
      addClickEffect(this,area.strArea);
    });

    chipHolder.appendChild(chip);

  });

}

async function addClickEffect(chip,area){
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("clicked"));
  chip.classList.add('clicked');
  const allRecipes = await filterByArea(area);
  showData(allRecipes);
}
showFilters();

const cardsHolder = document.querySelector(".cards");
async function allToHome() {
  const cacheKey = 'allRecipesCache';
  const cacheTTL = 1000 * 60 * 60; 

  const cached = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(`${cacheKey}_timestamp`);

  const now = Date.now();
  let allRecipes;

  if (cached && cachedTime && now - cachedTime < cacheTTL) {
    allRecipes = JSON.parse(cached);
    allRecipes = shuffleArray(allRecipes);
  } else {
    allRecipes = await getAllRecipes();
    localStorage.setItem(cacheKey, JSON.stringify(allRecipes));
    localStorage.setItem(`${cacheKey}_timestamp`, now);
  }

  // console.log("Total recipes:", allRecipes.length);
  // console.log(allRecipes[0].strMeal);

  showData(allRecipes);
}

allToHome();

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRecipe(id) {
  console.log(id);
  window.location.href = `recipe.html?id=${id}`;
}

///// search recipe
async function searchRecipes() {
  const query = document.getElementById("inputfield").value;
  if (query != null && query != "") {
    const recipes = await searchMeal(query);
    document.getElementById("inputfield").value = '';
    showData(recipes);
  }
  
}

window.searchRecipes = searchRecipes;
// window.allToHome = allToHome;

function showData(arr) {
  cardsHolder.innerHTML = ``;
  arr.forEach((recipe) => {
    const id = recipe.idMeal;

    const card = document.createElement("div");
    card.classList.add("custom-card");

    const image = document.createElement("img");
    image.src = recipe.strMealThumb;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const title = document.createElement("h3");
    title.textContent = recipe.strMeal;

    const subTitle = document.createElement("p");
    subTitle.textContent = recipe.strArea;

    cardContent.appendChild(title);
    cardContent.appendChild(subTitle);

    card.appendChild(image);
    card.appendChild(cardContent);

    card.addEventListener("click", () => getRecipe(id));

    cardsHolder.appendChild(card);
  });
}
