import {addFoodToTable, makeContentEditable, hideTableRow} from "../response-handlers/food-response-handlers"
import {deleteFromDiary} from "../requests/meals.js"

const requestUrl = "http://localhost:3000/api/v1"

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
  $.get('http://localhost:3000/api/v1/meals')
  .then(function(meals) {
    let allMeals = meals
      debugger
  })
}

// const checkIfFoodExistsInMeal = (id) => {
//   var meals = []
//   for (var i = 1; i < 5; i++) {
//
//     $.get(`http://localhost:3000/api/v1/meals/${i}/foods`)
//     .then(function(foods) {
//
//       let mealItems = foods.foods
//       var result = $.grep(mealItems, function(e) {
//         return e.id == id
//       })
//
//       if (result.length == 1) {
//         meals.push(foods.name.toLowerCase())
//       }
//   debugger
//     })
//   }
// }


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
