function loadMeals(search) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
}
const displayMeals = (meals) => {
    // step 1: find continer-meals 
    const containerMeals = document.getElementById('continer-meals')
    containerMeals.innerHTML = ''
    meals.forEach(meal => {
        // console.log(meal.idMeal)
        //step 2: create child div for every meal
        const div = document.createElement('div');
        div.classList.add('col');

        //step 3: set content in child
        div.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <!-- Button trigger modal -->
                <button onclick="loadMealdetails( ${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details
                </button>
            </div>
        </div>
        `
        // step 4: AppendChild
        containerMeals.appendChild(div)

    });
}
// Search Meals here
const searchMeals = () => {
    // step 1: find out the search value
    const searchMeal = document.getElementById('search-filed').value;
    loadMeals(searchMeal)
}
// Meal details with pop up
const loadMealdetails=(idMeal) => {
    console.log(idMeal)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(res=>res.json())
    .then(data=>displayItemDetails(data.meals[0]))
}
const displayItemDetails=(details)=>{
    console.log(details)
    const title=document.getElementById('exampleModalLabel')
    title.innerText=details.strMeal;
    const modalBody=document.getElementById('modal-body');
    modalBody.innerHTML=`
    <img class="img-fluid" src="${details.strMealThumb}
    " alt="">
    <p>Category : ${details.strCategory}<p/>
    <p>Message : ${details.strMeasure9}<p/>
    
    `
}
loadMeals('fish')