const createFoodsTable = (foods) => {
  foods.forEach(function(food){

    let tableRow = `<tr><td>${food["name"]}</td><td>${food["calories"]}</td><td><button class="delete-food" data-id=${food["id"]} type="submit"><img src="/lib/assets/images/delete.png" /></button></td>></tr>`
    $("#food-table tr:first").after(tableRow)
  })
}

module.exports = {createFoodsTable}
