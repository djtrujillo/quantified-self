import {addFoodToTable, makeContentEditable, hideTableRow} from "../response-handlers/food-response-handlers"
import {deleteFromDiary} from "../requests/meals.js"

const requestUrl = "https://shielded-brook-80133.herokuapp.com/api/v1"

const getFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food) {
      addFoodToTable(food)
    })
  })
}

const postFood = (food, calories) => {
  $.post(`${requestUrl}/foods`, {
  "food": {
  "name": food,
  "calories": calories
  }
})
  .then(function(food){
    addFoodToTable(food)
  })
}

const getMeals = () => {
  $.get('https://shielded-brook-80133.herokuapp.com/api/v1/meals')
  .then(function(meals) {
    let allMeals = meals
      debugger
  })
}



const deleteFood = (id) => {
  Promise.all([
    deleteFromDiary("breakfast", id),
    deleteFromDiary("snack", id),
    deleteFromDiary("lunch", id),
    deleteFromDiary("dinner", id)
  ]).then(
      $.ajax({
        url: `${requestUrl}/foods/${id}`,
        type: 'DELETE',
        success: function(result) {
          hideTableRow(id)
        }
      })
    )
  }

const editFood = (newFood, id) => {
  $.ajax({
    url: `${requestUrl}/foods/${id}`,
    type: 'PATCH',
    data: {food: {"name": newFood}},
    success: function(food) {
    }
  })
}

const editCalories = (newCalories, id) => {
  $.ajax({
    url: `${requestUrl}/foods/${id}`,
    type: 'PATCH',
    data: {food: {"calories": newCalories}},
    success: function(result) {
    }
  })
}

const filterByName = (input) => {
  var input = input
  var foodName = $(".food-name")

  foodName.parent().hide()

  foodName.filter(function() {
    return $(this).text().toLowerCase().indexOf(input) == 0
  }).parent().show();
}


module.exports = {getFoods, postFood, deleteFood, editFood, editCalories, filterByName}
