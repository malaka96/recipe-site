import { getAllCategories } from "./api.js";

console.log('categories script is loaded');

const cardsHolder = document.querySelector(".cards");

async function getCategories() {
  const allCategories = await getAllCategories();

  allCategories.forEach((category) => {
    const card = document.createElement("div");
    card.classList.add("custom-card");

    const image = document.createElement("img");
    image.src = category.strCategoryThumb;

    const card_content = document.createElement("div");
    card_content.classList.add('card-content');

    const title = document.createElement('h3');
    title.innerText = category.strCategory;

    const subTitle = document.createElement('p');
    subTitle.innerText = category.strCategoryDescription.split('.')[0].trim();

    card_content.appendChild(title);
    card_content.appendChild(subTitle);

    card.appendChild(image);
    card.appendChild(card_content);

    card.addEventListener('click', () => getCategory(category.strCategory,category.strCategoryDescription));

    cardsHolder.appendChild(card);

  });
}

getCategories();

function getCategory(name,des){
  console.log(des);
  window.location.href = `category.html?name=${name}&des=${des}`;
}
