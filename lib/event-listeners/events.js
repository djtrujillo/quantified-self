// const getFoods = require('../requests/foods')
import {getFoods, postFood, deleteFood} from "../requests/foods"

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
    console.log("Clicked")
    const id = $(this).attr("data-id")
    deleteFood(id)
  })


module.exports = {onLoad, clickSubmit, clickDelete}
