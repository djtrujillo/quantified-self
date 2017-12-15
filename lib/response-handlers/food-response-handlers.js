
const makeContentEditable = () => {

  var tds = document.getElementsByClassName('food-name food-calories');
  for(var i=0; i<tds.length; i++) {
    tds[i].contentEditable = 'true';
  };
}

const hideTableRow = (id) => {
  $(`#${id}`).hide()
}

const addFoodToTable = (food) => {
  const tableRow = `<tr id=${food["id"]}><td class="food-name">${food["name"]}</td><td class="food-calories">${food["calories"]}</td><td><button class="delete-food" type="submit">-</button></td></tr>`
  $("#food-table tr:first").after(tableRow)

  makeContentEditable()
}

module.exports = { makeContentEditable, hideTableRow, addFoodToTable}
