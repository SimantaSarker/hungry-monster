//------------- handle search button-----------
const searchFood = () => {
  const searchField = document.getElementById("mealInput");
  const errorMessage=document.getElementById('errorMessage');
  const searchData = searchField.value;
  const mealItemsInformation = document.getElementById("mealItemsInfo");
  mealItemsInformation.innerHTML=''
  if(searchData.length===0 )
  {
    alert("Enter please something");
    searchField.value=''
  }
  else{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if(data.meals===null)
        {
            searchField.value=''
            return errorMessage.innerHTML=`Enter valid number`;

        }
       
        displayMealInfo(data.meals);
        errorMessage.innerHTML='';
        searchField.value=''

      });
  };
  

  /*
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealInfo(data.meals));
    */
};
  



const displayMealInfo = (mealData) => {
  const mealContainer = document.getElementById("mealCard");
  mealContainer.innerHTML=''
  mealData.forEach((item) => {
    const foodItemName = document.createElement("div");
    foodItemName.className = "meal-items";
    itemPosition = item.idMeal;
    const mealInformation = `
        <img src ="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>
        `;
    foodItemName.innerHTML = mealInformation;
    foodItemName.addEventListener("click", function () {
      mealIngredientsInfo(item.idMeal);
    });
    mealContainer.appendChild(foodItemName);
  });
};

//API Call by fetch for meal ingredients

const mealIngredientsInfo = (mealItemName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItemName}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        displayDetails(data.meals[0])
    });
};
// displayDetails(data)

//meal ingredients details information

const displayDetails = (items) => {
  const mealItemsInformation = document.getElementById("mealItemsInfo");
    const mealItemsInformations = document.createElement("div");
    mealItemsInformations.className = "ingredients-info";
    const itemsName = document.createElement("h1");
    const ingredients = document.createElement("h5");
    ingredients.innerText = "Ingredients";
    itemsName.innerText = items.strMeal;
    const ul = document.createElement("ul");
    const imgUrl = document.createElement("img");
    imgUrl.src = items.strMealThumb;
    mealItemsInformations.appendChild(imgUrl);
    const li = `
        
    ${items.strIngredient1 ? `<li>${items.strIngredient1}</li>` : ""}
    ${items.strIngredient2 ? `<li>${items.strIngredient2}</li>` : ""}
    ${items.strIngredient3 ? `<li>${items.strIngredient3}</li>` : ""}
    ${items.strIngredient4 ? `<li>${items.strIngredient4}</li>` : ""}
    ${items.strIngredient5 ? `<li>${items.strIngredient5}</li>` : ""}
    ${items.strIngredient6 ? `<li>${items.strIngredient6}</li>` : ""}
    ${items.strIngredient7 ? `<li>${items.strIngredient7}</li>` : ""}
    ${items.strIngredient8 ? `<li>${items.strIngredient8}</li>` : ""}
    ${items.strIngredient9 ? `<li>${items.strIngredient9}</li>` : ""}
    ${items.strIngredient10 ? `<li>${items.strIngredient10}</li>` : ""}
    ${items.strIngredient11 ? `<li>${items.strIngredient11}</li>` : ""}
    ${items.strIngredient12 ? `<li>${items.strIngredient12}</li>` : ""}
    ${items.strIngredient13 ? `<li>${items.strIngredient13}</li>` : ""}
        `;

    /*
        ${
            singleData.accuracy.score
              ? `<button type="button" class="btn btn-danger accuracy-btn">${
                  singleData.accuracy.score * 100 + `&#37;` + " accuracy"
                }</button>`
              : ""
          }
          */


    ul.innerHTML = li;
    mealItemsInformations.appendChild(itemsName);
    mealItemsInformations.appendChild(ingredients);
    mealItemsInformations.appendChild(ul);
    mealItemsInformation.appendChild(mealItemsInformations);
 
};
