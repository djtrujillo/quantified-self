const requestUrl = "http://localhost:3000/api/v1"

const tableRow = function(food) {
  return `<tr><td>${food["name"]}</td><td>${food["calories"]}</td><td><button type="submit"><img src="/lib/assets/images/delete.png" alt="something"></button></td></tr>`
}

const getFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food){
      $("#food-table").prepend(tableRow(food))
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



  module.exports = {getFoods, postFood}
