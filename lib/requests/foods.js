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


function deleteFromBreakfast(id) {
  $.get(`http://localhost:3000/api/v1/meals/1/foods`)
  .then(function(foods) {
    let breakfast = foods
    let breakfastFoods = foods.foods
    var result = $.grep(breakfastFoods, function(e){
      return e.id == id
    })
    if(result.length == 1) {
      var mealName = "breakfast"
      var foodId = id
    } else {
      var mealName = null
      var foodId = null
    }
    if(mealName != null) {
      deleteFromDiary(mealName, foodId)
    }
  })
}

function deleteFromSnack(id) {
  $.get(`http://localhost:3000/api/v1/meals/2/foods`)
  .then(function(foods) {
    let breakfast = foods
    let breakfastFoods = foods.foods
    var result = $.grep(breakfastFoods, function(e){
      return e.id == id
    })
    if(result.length == 1) {
      var mealName = "snack"
      var foodId = id
    } else {
      var mealName = null
      var foodId = null
    }
    if(mealName != null) {
      deleteFromDiary(mealName, foodId)
    }
  })
}

function deleteFromLunch(id) {
  $.get(`http://localhost:3000/api/v1/meals/3/foods`)
  .then(function(foods) {
    let breakfast = foods
    let breakfastFoods = foods.foods
    var result = $.grep(breakfastFoods, function(e){
      return e.id == id
    })
    if(result.length == 1) {
      var mealName = "lunch"
      var foodId = id
    } else {
      var mealName = null
      var foodId = null
    }
    if(mealName != null) {
      deleteFromDiary(mealName, foodId)
    }
  })
}

function deleteFromDinner(id) {
  $.get(`http://localhost:3000/api/v1/meals/4/foods`)
  .then(function(foods) {
    let breakfast = foods
    let breakfastFoods = foods.foods
    var result = $.grep(breakfastFoods, function(e){
      return e.id == id
    })
    if(result.length == 1) {
      var mealName = "dinner"
      var foodId = id
    } else {
      var mealName = null
      var foodId = null
    }
    if(mealName != null) {
      deleteFromDiary(mealName, foodId)
    }
  })
}

const deleteFood = (id) => {
  Promise.all([
    deleteFromBreakfast(id),
    deleteFromSnack(id),
    deleteFromLunch(id),
    deleteFromDinner(id)
  ])


  $.ajax({
    url: `${requestUrl}/foods/${id}`,
    type: 'DELETE',
    success: function(result) {
      hideTableRow(id)
    }
});
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
