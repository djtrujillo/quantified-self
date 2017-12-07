import {getMeals, getAllFoods, deleteFromDiary, foodSearch} from "../requests/meals"

if (window.location.pathname == '/') {
  const onIndexLoad = $(document).ready(function() {
    getMeals()
  })
}

const clickDeleteFromMeal = $(document).on('click', '.delete-from-diary', function(event) {
  const mealName = $(this).closest('table').prop('class')
  const foodId = $(this).closest('tr').prop('id')
  deleteFromDiary(mealName, foodId)
  $(this).closest('tr').remove()
})

$("#food-search").on("keyup", function() {
  let text = $(this).val().toLowerCase()
  let foodItem = $(".food-item")

  foodSearch(text, foodItem)
})

module.exports = {onIndexLoad, clickDeleteFromMeal}
