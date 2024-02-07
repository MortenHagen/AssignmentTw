const ingredientSubmit = document.querySelector('.ingredient-submit');
const stepsSubmit = document.querySelector('.steps-submit');
const pictureSubmit = document.querySelector('.submitPicture');
const nameSubmit = document.querySelector('.submitName');
let allRecipes = JSON.parse(localStorage.getItem('recipes')) || []; // Retrieve recipes from localStorage or initialize an empty array

const recipeHeader = document.querySelector('.recipe-header');
const ingredientsContainer = document.querySelector('.ingredients-container');
const stepsContainer = document.querySelector('.steps-container');
const pictureContainer = document.querySelector('.picture-container')


pictureSubmit.addEventListener('click', function(event) {
    event.preventDefault();

    const pictureURL = document.querySelector('#picture').value;
    console.log(pictureURL);
    if (pictureURL.trim() !== '') {
        const pictureItem = document.createElement('li');
        pictureItem.textContent = pictureURL;
        pictureContainer.appendChild(pictureItem);
    };
    document.querySelector('#picture').value = "";
});


ingredientSubmit.addEventListener('click', function(event) {
        event.preventDefault();

        const ingredient = document.querySelector('.ingredients').value;

        if (ingredient.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = ingredient;
            ingredientsContainer.appendChild(listItem);
        }
        document.querySelector('.ingredients').value = ""
    });

stepsSubmit.addEventListener('click', function(event) {
        event.preventDefault();

        const recipeName = document.querySelector('#recipe-name').value;

        if (recipeName.trim() !== '') {
            const listItem = document.createElement('h2');
            listItem.textContent = `Recipe Name: ${recipeName}`;
    
            recipeHeader.appendChild(listItem);
        }

        const step = document.querySelector('.steps').value;

        if (step.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = step;

            stepsContainer.appendChild(listItem);

            const recipeName = document.querySelector('#recipe-name').value;

            const recipe = {
                name: recipeName,
                ingredients: [...document.querySelectorAll('.ingredients-container li')].map(li => li.textContent),
                steps: [...document.querySelectorAll('.steps-container li')].map(li => li.textContent),
                thePicture: [...document.querySelectorAll('.picture-container li')].map(li => li.textContent)
            };

            allRecipes.push(recipe);
            localStorage.setItem('recipes', JSON.stringify(allRecipes));
            console.log(recipe);
        }
    });

const resultContainer = document.querySelector('.result-container');

let allRecipesLocal = JSON.parse(localStorage.getItem('recipes')) || [];



function displayRecipeStickers() {
    resultContainer.innerHTML = '';

    allRecipesLocal.forEach(recipe => {
        const mainSticker = document.createElement('div');
        mainSticker.classList.add('main-sticker', 'column--4', 'offset-small--1');
        resultContainer.appendChild(mainSticker);

        const mainStickerImg = document.createElement('div');
        mainStickerImg.classList.add('main-sticker__img');
        mainSticker.appendChild(mainStickerImg);

        const mainStickerImg1 = document.createElement('div');
        mainStickerImg1.classList.add('main-sticker__img1');
        mainStickerImg.appendChild(mainStickerImg1);

        const img = document.createElement('img');
        img.setAttribute('src', recipe.thePicture[0])
        mainStickerImg1.appendChild(img);

        const textContainer = document.createElement('div');
        textContainer.classList.add('main-sticker__text-container');
        mainSticker.appendChild(textContainer);

        const spanElement = document.createElement('span');
        spanElement.textContent = recipe.name;
        textContainer.appendChild(spanElement);

        mainSticker.addEventListener('click', () => displayRecipeDetails(recipe));
    });
}



function displayRecipeDetails(recipe) {
    resultContainer.innerHTML = '';
 
    const recipeDetailsContainer = document.createElement('div');
    recipeDetailsContainer.classList.add('recipe-details');
    resultContainer.appendChild(recipeDetailsContainer); 

    const recipeNameHeader = document.createElement('h2');
    recipeNameHeader.textContent = recipe.name;
    recipeDetailsContainer.appendChild(recipeNameHeader);

    const ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Ingredients:';
    recipeDetailsContainer.appendChild(ingredientsHeader);

    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach(ingredient => {
    
	const ingredientItem = document.createElement('li');
	ingredientItem.textContent = ingredient;
	ingredientsList.appendChild(ingredientItem);
    });
    recipeDetailsContainer.appendChild(ingredientsList);

    const stepsHeader = document.createElement('h3');
    stepsHeader.textContent = 'Steps:';
    recipeDetailsContainer.appendChild(stepsHeader);

    const stepsList = document.createElement('ol');
    recipe.steps.forEach(step => {
        const stepItem = document.createElement('li');
        stepItem.textContent = step;
        stepsList.appendChild(stepItem);
    });
    recipeDetailsContainer.appendChild(stepsList);
}

displayRecipeStickers();
