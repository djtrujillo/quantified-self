const requestUrl = "http://localhost:3000/api/v1"
const totalGoalCalories = 2000

const getMeals = () => {
  $.get(`${requestUrl}/meals`)
  .then(function(meals){
    populateTable(meals)
    generateTotals()
    getAllFoods()
  })
}

const populateTable = (meals) => {
  meals.forEach(function(meal){
    meal["foods"].forEach(function(item) {
      let food = item["name"]
      let calories = item["calories"]
      $(`#${meal["name"].toLowerCase()}-table`).append(`<tr id=${item["id"]}><td>${food}</td><td class="calories">${calories}</td><td><button class="delete-from-diary" type="submit"><img src="/lib/assets/images/delete.png" /></button></td>></tr>`)
    })
    caloriesRow(meal["name"].toLowerCase())
  })
}

const caloriesRow = (mealName) => {
  $(`#${mealName}-table tfoot`).append(`<tr><th>Total Calories</th><td class="meal-calories"></td></tr>`,
                                       `<tr><th>Remaining Calories</th><td class="remaining-calories"></td></tr>`)
  calculateCalories(mealName)
}

const calculateCalories = (mealName) => {
  let summedCalories = 0

  $(`#${mealName}-table .calories`).each(function() {
    let value = parseInt($(this).text())
    summedCalories += value
  })

  let remainingCalories = getRemainingCalories(mealName, summedCalories)

  $(`#${mealName}-table tfoot .meal-calories`).html(`${summedCalories}`)
  $(`#${mealName}-table tfoot .remaining-calories`).html(`${remainingCalories}`)

  colorCalories(mealName, remainingCalories)
}

const getRemainingCalories = (mealName, totalCalories) => {
  if(mealName == "breakfast"){
    return 400 - totalCalories
  } else if(mealName == "lunch"){
    return 600 - totalCalories
  } else if(mealName == "dinner"){
    return 800 - totalCalories
  } else if(mealName == "snack"){
    return 200 - totalCalories
  }
}

const colorCalories = (mealName, calories) => {
  if(calories >= 0) {
    $(`#${mealName}-table .remaining-calories`).css("color", "green")
  } else {
    $(`#${mealName}-table .remaining-calories`).css("color", "red")
  }
}

const getAllFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food){
      $("#diary-food-table").append(`<tr id="${food.id}"><td><input type="checkbox"/></td><td class="food-item" >${food["name"]}</td><td>${food["calories"]}</td></tr>`)
    })
  })
}

const generateTotals = () => {
  let total = calculateTotal()
  let remaining = totalGoalCalories - total
  $('#consumed-calories').html(`${total}`)
  $('#total-remaining-calories').html(`${remaining}`)
  colorCalories("totals", remaining)
}

const calculateTotal = () => {
  let totalMealCalories = 0
  $('.meal-calories').each(function(){
      totalMealCalories += parseFloat($(this).text());
  });
  return totalMealCalories
}

const deleteFromDiary = (mealName, foodId) => {
  let mealId = 0

  if(mealName == "breakfast") {
    mealId = 1
  } else if(mealName == "lunch") {
    mealId = 3
  } else if(mealName == "dinner") {
    mealId = 4
  } else if (mealName == "snack") {
    mealId = 2
  }

  $.ajax({
    url: `${requestUrl}/meals/${mealId}/foods/${foodId}`,
    type: 'DELETE',
    success: function(result) {
      calculateCalories(mealName)
      generateTotals()
    }
  })
}

const foodSearch = (text, foodItem) => {
  foodItem.parent().hide()

  foodItem.filter(function () {
      return $(this).text().toLowerCase().indexOf(text) == 0
  }).parent().show()
}

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

        $(`#${meal}-table tbody`).append(`<tr id=${food["id"]}><td>${foodName}</td><td class="calories">${calories}</td><td><button class="delete-from-diary" type="submit"><img src="/lib/assets/images/delete.png" /></button></td>></tr>`)
        $("input:checkbox:checked").prop('checked', false)
        calculateCalories(meal)
        generateTotals()
      })

  })
})

module.exports = {getMeals, getAllFoods, deleteFromDiary, foodSearch}
