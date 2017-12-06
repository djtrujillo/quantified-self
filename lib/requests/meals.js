const requestUrl = "http://localhost:3000/api/v1"

const totalGoalCalories = 2000

const tableRow = (food, calories) => {
  return `<tr><td>${food}</td><td>${calories}</td></tr>`
}

const remainingCaloriesRow = (calories) => {
  const color = ""
  if(calories >= 0){
    return`<tr><th>Remaining Calories</th><td class="remaining-calories" style="color: green;">${calories}</td></tr>`
  } else {
    return`<tr><th>Remaining Calories</th><td class="remaining-calories" style="color: red;">${calories}</td></tr>`
  }
}

const getMeals = () => {
  $.get(`${requestUrl}/meals`)
  .then(function(meals){
    populateTable(meals)
    calculateCalories(meals)
    generateTotals(meals)
    getAllFoods()
  })
}

const populateTable = (meals) => {
  meals.forEach(function(meal){
    meal["foods"].forEach(function(item) {
      let food = item["name"]
      let calories = item["calories"]
      $(`#${meal["name"].toLowerCase()}-table `).append(tableRow(food, calories))
    })
  })
}

const calculateCalories = (meals) => {
  meals.forEach(function(meal){
    let totalCalories = 0
    meal["foods"].forEach(function(item){
      totalCalories += item["calories"]
    })
    let remainingCalories = getRemainingCalories(meal, totalCalories)
    $(`#${meal["name"].toLowerCase()}-table tfoot`).append(`<tr><th>Total Calories</th><td class="meal-calories">${totalCalories}</td></tr>`)
    $(`#${meal["name"].toLowerCase()}-table tfoot`).append(remainingCaloriesRow(remainingCalories))
  })
}

const getRemainingCalories = (meal, totalCalories) => {
  if(meal["name"] == "Breakfast"){
    return 400 - totalCalories
  } else if(meal["name"] == "Lunch"){
    return 600 - totalCalories
  } else if(meal["name"] == "Dinner"){
    return 800 - totalCalories
  } else if(meal["name"] == "Snack"){
    return 200 - totalCalories
  }
}

const generateTotals = (meals) => {
  let total = calculateTotal(meals)
  let remaining = totalGoalCalories - total
  $('#consumed-calories').html(`${total}`)
  $('#total-remaining-calories').html(`${remaining}`)
  colorCalories(remaining)
}

const calculateTotal = (meals) => {
  let totalMealCalories = 0
  meals.forEach(function(meal){
    let calories = 0
    meal["foods"].forEach(function(item){
      calories += item["calories"]
    })
    totalMealCalories += calories
  })
  return totalMealCalories
}

const getAllFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food){
      $("#diary-food-table").append(foodsTableRow(food))
    })
  })
}

const foodsTableRow = (food) => {
  return `<tr id="${food.id}"><td><input type="checkbox"/></td><td class="food-item" >${food["name"]}</td><td>${food["calories"]}</td></tr>`
}

$("#food-search").on("keyup", function() {
  let text = $(this).val().toLowerCase()
  let foodItem = $(".food-item")

  foodItem.parent().hide()

  foodItem.filter(function () {
      return $(this).text().toLowerCase().indexOf(text) == 0
  }).parent().show()
})


$(".add-to-meal-button").on("click", function() {
  const meal = $(this).prop('id')

  $('input:checkbox:checked').parent().each(function() {
    let foodId = ($(this).parent().prop('id'))

    if(meal == "breakfast") {
      $.post(`${requestUrl}/meals/1/foods/${foodId}`)
    } else if(meal == "lunch") {
      $.post(`${requestUrl}/meals/3/foods/${foodId}`)
    } else if(meal == "dinner") {
      $.post(`${requestUrl}/meals/4/foods/${foodId}`)
    } else if (meal == "snack") {
      $.post(`${requestUrl}/meals/2/foods/${foodId}`)
    }

    $.get(`${requestUrl}/foods/${foodId}`)
      .then(function(food){
        let foodName = food["name"]
        let calories = food["calories"]

        $(`#${meal}-table tbody`).append(tableRow(foodName, calories))
        updateMeal(food, meal)
        updateTotals(food)
      })


  })
})

const updateMeal = (food, meal) => {
  let currentMealCalories = $(`#${meal}-table .meal-calories`).text()
  let newMealCalories = parseInt(currentMealCalories) + food["calories"]
  let currentRemainingMealCalories = $(`#${meal}-table .remaining-calories`).text()
  let newRemainingMealCalories = parseInt(currentRemainingMealCalories) - food["calories"]

  $(`#${meal}-table .meal-calories`).html(`${newMealCalories}`)
  $('#snack-table .remaining-calories').html(`${newRemainingMealCalories}`)
}

const updateTotals = (food) => {
  let currentTotal = $('#consumed-calories').text()
  let newTotal = parseInt(currentTotal) + food["calories"]
  let currentRemaining = $('#total-remaining-calories').text()
  let newRemaining = totalGoalCalories - newTotal

  $('#consumed-calories').html(`${newTotal}`)
  $('#total-remaining-calories').html(`${newRemaining}`)
  colorCalories(newRemaining)
}

const colorCalories = (calories) => {
  if(calories >= 0) {
    $('#total-remaining-calories').css("color", "green")
  } else {
    $('#total-remaining-calories').css("color", "red")
  }
}

module.exports = {getMeals}
