const requestUrl = "http://localhost:3000/api/v1"

const tableRow = function(food) {
  return `<tr id=${food["id"]}><td class="food-name">${food["name"]}</td><td class="food-calories">${food["calories"]}</td><td><button class="delete-food" type="submit"><img src="/lib/assets/images/delete.png" /></button></td>></tr>`
}

const getFoods = () => {
  $.get(`${requestUrl}/foods`)
  .then(function(foods){
    foods.forEach(function(food){
      $("#food-table tr:first").after(tableRow(food))
    })
    var tds = document.getElementsByTagName('td');
    for(var i=0; i<tds.length; i++) {
      tds[i].contentEditable = 'true';
    };
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

const editFood = (newFood, id) => {
  $.ajax({
    url: `${requestUrl}/foods/${id}`,
    type: 'PATCH',
    data: {food: {"name": newFood}},
    success: function(result) {
      location.reload(true)
    }
  })
}

const editCalories = (newCalories, id) => {
  $.ajax({
    url: `${requestUrl}/foods/${id}`,
    type: 'PATCH',
    data: {food: {"calories": newCalories}},
    success: function(result) {
      location.reload(true)
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
