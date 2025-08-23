const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function getMealsByFirstLetter(letter) {
  try {
    const res = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    const data = await res.json();
    return data.meals || []; 
  } catch (err) {
    console.error(`Error fetching meals for letter ${letter}:`, err);
    return [];
  }
}

export async function getAllRecipes() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let allMeals = [];

  for (const letter of alphabet) {
    const meals = await getMealsByFirstLetter(letter);
    allMeals = allMeals.concat(meals);
  }

  return allMeals;
}

export async function getRecipeById(id){
    try{
        const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        const data = await res.json();
        console.log(data.meals);
        return data.meals || [];
    }catch(e){
        console.error(`error fetching recipe by id ${e}`);
        return [];
    }
}

export async function getAllCategories(){
  try{
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();
    return data.categories || [];
  }catch(e){
    console.error(`error fetching categories ${e}`);
    return [];
  }
}

export async function filterByCategory(category){
  try{
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await res.json();
    return data.meals || [];
  }catch(e){
    console.error(`error fetching category date ${e}`);
    return [];
  }
}
