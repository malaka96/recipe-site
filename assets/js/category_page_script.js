import { filterByCategory } from "./api.js";

console.log("category page is loaded..");

const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get("name");
const categoryDes = urlParams.get("des");

const mainTitle = document.getElementById("main-title");
mainTitle.textContent = categoryName;

const mainSubTitle = document.getElementById("main-sub-title");
mainSubTitle.textContent = categoryDes.split("[")[0];

async function getEachCategoryData(name) {
  const recipes = await filterByCategory(name);

  const cardsHolder = document.querySelector(".cards");

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("custom-card");

    const image = document.createElement("img");
    image.src = recipe.strMealThumb;

    const card_content = document.createElement("div");
    card_content.classList.add("card-content");

    const title = document.createElement("h3");
    title.innerText = recipe.strMeal;

    // const subTitle = document.createElement('p');
    // subTitle.innerText = category.strCategoryDescription.split('.')[0].trim();

    card_content.appendChild(title);
    //card_content.appendChild(subTitle);

    card.appendChild(image);
    card.appendChild(card_content);

    card.addEventListener('click', () => getRecipe(recipe.idMeal));

    cardsHolder.appendChild(card);
  });
}

getEachCategoryData(categoryName);

function getRecipe(id){
  console.log('id');
  window.location.href = `recipe.html?id=${id}`;
}
