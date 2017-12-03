const requestUrl = "http://localhost:3000/api/v1"

const tableRow = function(food) {
  return `<tr><td>${food["name"]}</td><td>${food["calories"]}</td><td><button class="delete-food" data-id=${food["id"]} type="submit"><img src="/lib/assets/images/delete.png" /></button></td>></tr>`
}

const getFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food){
      $("#food-table tr:first").after(tableRow(food))
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
  .then(function(){
    location.reload(true)
    // getFoods()
  })
}

const deleteFood = (id) => {
  $.ajax({
    url: `${requestUrl}/foods/${id}`,
    type: 'DELETE',
    success: function(result) {
      location.reload(true)
    }
});
}



  module.exports = {getFoods, postFood, deleteFood}
