// const getFoods = require('../requests/foods')
import {getFoods, postFood, deleteFood, editFood, editCalories, filterByName} from "../requests/foods"

// if (window.location.pathname == '/foods.html') {

  const onLoad = $(document).ready(function() {
    getFoods()
  })

  const clickSubmit = $('#new-food-submit').on('click', function(event){
    event.preventDefault()
    const food = $('#food').val()
    const calories = $('#calories').val()

    if (food === "") {
      alert("Please enter food")
    }
    else if (calories === "") {
      alert("Please enter calories")
    }
    else {
      postFood(food, calories)
    }
  })

  const clickDelete = $(document).on('click', '#food-table .delete-food', function(event) {
    const id = $(this.parentElement.parentElement).attr("id")
    deleteFood(id)
  })

  const clickFood = $(document).on('blur', '#food-table .food-name', function(event) {
    var newFood = this.innerHTML
    const id = $(this.parentElement).attr("id")
    editFood(newFood, id)
  })

  const clickCalories = $(document).on('blur', '#food-table .food-calories', function(event) {
    var newCalories = this.innerHTML
    const id = $(this.parentElement).attr("id")
    editCalories(newCalories, id)
  })

  const filter = $("#filter").on('keyup', function(){
    var input = $(this).val().toLowerCase()
    filterByName(input)
  })


module.exports = {onLoad, clickSubmit, clickDelete, clickFood, clickCalories, filter}
