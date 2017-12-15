/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _foodEvents = __webpack_require__(1);

	var _mealEvents = __webpack_require__(5);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _foods = __webpack_require__(2);

	var onLoad = $(document).ready(function () {
	  (0, _foods.getFoods)();
	});

	var clickSubmit = $('#new-food-submit').on('click', function (event) {
	  event.preventDefault();
	  var food = $('#food').val();
	  var calories = $('#calories').val();

	  if (food === "") {
	    alert("Please enter food");
	  } else if (calories === "") {
	    alert("Please enter calories");
	  } else {
	    (0, _foods.postFood)(food, calories);
	  }
	});

	var clickDelete = $(document).on('click', '#food-table .delete-food', function (event) {
	  var id = $(this.parentElement.parentElement).attr("id");
	  (0, _foods.deleteFood)(id);
	});

	var clickFood = $(document).on('blur', '#food-table .food-name', function (event) {
	  var newFood = this.innerHTML;
	  var id = $(this.parentElement).attr("id");
	  (0, _foods.editFood)(newFood, id);
	});

	var clickCalories = $(document).on('blur', '#food-table .food-calories', function (event) {
	  var newCalories = this.innerHTML;
	  var id = $(this.parentElement).attr("id");
	  (0, _foods.editCalories)(newCalories, id);
	});

	var filter = $("#filter").on('keyup', function () {
	  var input = $(this).val().toLowerCase();
	  (0, _foods.filterByName)(input);
	});

	module.exports = {
	  onLoad: onLoad, clickSubmit: clickSubmit, clickDelete: clickDelete, clickFood: clickFood, clickCalories: clickCalories, filter: filter
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _foodResponseHandlers = __webpack_require__(3);

	var _meals = __webpack_require__(4);

	var requestUrl = "https://shielded-brook-80133.herokuapp.com/api/v1";

	var getFoods = function getFoods() {
	  $.get(requestUrl + "/foods").then(function (foods) {
	    foods.forEach(function (food) {
	      (0, _foodResponseHandlers.addFoodToTable)(food);
	    });
	  });
	};

	var postFood = function postFood(food, calories) {
	  $.post(requestUrl + "/foods", {
	    "food": {
	      "name": food,
	      "calories": calories
	    }
	  }).then(function (food) {
	    (0, _foodResponseHandlers.addFoodToTable)(food);
	  });
	};

	var getMeals = function getMeals() {
	  $.get('https://shielded-brook-80133.herokuapp.com/api/v1/meals').then(function (meals) {
	    var allMeals = meals;
	    debugger;
	  });
	};

	var deleteFood = function deleteFood(id) {
	  Promise.all([(0, _meals.deleteFromDiary)("breakfast", id), (0, _meals.deleteFromDiary)("snack", id), (0, _meals.deleteFromDiary)("lunch", id), (0, _meals.deleteFromDiary)("dinner", id)]).then($.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'DELETE',
	    success: function success(result) {
	      (0, _foodResponseHandlers.hideTableRow)(id);
	    }
	  }));
	};

	var editFood = function editFood(newFood, id) {
	  $.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'PATCH',
	    data: { food: { "name": newFood } },
	    success: function success(food) {}
	  });
	};

	var editCalories = function editCalories(newCalories, id) {
	  $.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'PATCH',
	    data: { food: { "calories": newCalories } },
	    success: function success(result) {}
	  });
	};

	var filterByName = function filterByName(input) {
	  var input = input;
	  var foodName = $(".food-name");

	  foodName.parent().hide();

	  foodName.filter(function () {
	    return $(this).text().toLowerCase().indexOf(input) == 0;
	  }).parent().show();
	};

	module.exports = {
	  getFoods: getFoods, postFood: postFood, deleteFood: deleteFood, editFood: editFood, editCalories: editCalories, filterByName: filterByName
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	var makeContentEditable = function makeContentEditable() {
	  var tds = document.getElementsByTagName('td');
	  for (var i = 0; i < tds.length; i++) {
	    tds[i].contentEditable = 'true';
	  };
	};

	var hideTableRow = function hideTableRow(id) {
	  $('#' + id).hide();
	};

	var addFoodToTable = function addFoodToTable(food) {
	  var tableRow = '<tr id=' + food["id"] + '><td class="food-name">' + food["name"] + '</td><td class="food-calories">' + food["calories"] + '</td><td><button class="delete-food" type="submit"><img src="/lib/assets/images/delete.png" /></button></td>></tr>';
	  $("#food-table tr:first").after(tableRow);
	  makeContentEditable();
	};

	module.exports = {
	  makeContentEditable: makeContentEditable, hideTableRow: hideTableRow, addFoodToTable: addFoodToTable
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	var requestUrl = "https://shielded-brook-80133.herokuapp.com/api/v1";
	var totalGoalCalories = 2000;

	var getMeals = function getMeals() {
	  $.get(requestUrl + "/meals").then(function (meals) {
	    populateTable(meals);
	    generateTotals();
	    getAllFoods();
	  });
	};

	var populateTable = function populateTable(meals) {
	  meals.forEach(function (meal) {
	    meal["foods"].forEach(function (item) {
	      var food = item["name"];
	      var calories = item["calories"];
	      $("#" + meal["name"].toLowerCase() + "-table").append("<tr id=" + item["id"] + "><td>" + food + "</td><td class=\"calories\">" + calories + "</td><td><button class=\"delete-from-diary\" type=\"submit\"><img src=\"/lib/assets/images/delete.png\" /></button></td>></tr>");
	    });
	    caloriesRow(meal["name"].toLowerCase());
	  });
	};

	var caloriesRow = function caloriesRow(mealName) {
	  $("#" + mealName + "-table tfoot").append("<tr><th>Total Calories</th><td class=\"meal-calories\"></td></tr>", "<tr><th>Remaining Calories</th><td class=\"remaining-calories\"></td></tr>");
	  calculateCalories(mealName);
	};

	var calculateCalories = function calculateCalories(mealName) {
	  var summedCalories = 0;

	  $("#" + mealName + "-table .calories").each(function () {
	    var value = parseInt($(this).text());
	    summedCalories += value;
	  });

	  var remainingCalories = getRemainingCalories(mealName, summedCalories);

	  $("#" + mealName + "-table tfoot .meal-calories").html("" + summedCalories);
	  $("#" + mealName + "-table tfoot .remaining-calories").html("" + remainingCalories);

	  colorCalories(mealName, remainingCalories);
	};

	var getRemainingCalories = function getRemainingCalories(mealName, totalCalories) {
	  if (mealName == "breakfast") {
	    return 400 - totalCalories;
	  } else if (mealName == "lunch") {
	    return 600 - totalCalories;
	  } else if (mealName == "dinner") {
	    return 800 - totalCalories;
	  } else if (mealName == "snack") {
	    return 200 - totalCalories;
	  }
	};

	var colorCalories = function colorCalories(mealName, calories) {
	  if (calories >= 0) {
	    $("#" + mealName + "-table .remaining-calories").css("color", "green");
	  } else {
	    $("#" + mealName + "-table .remaining-calories").css("color", "red");
	  }
	};

	var getAllFoods = function getAllFoods() {
	  $.get(requestUrl + "/foods").then(function (foods) {
	    foods.forEach(function (food) {
	      buildFoodTable(food);
	    });
	  });
	};

	var buildFoodTable = function buildFoodTable(food) {
	  $("#diary-food-table").append("<tr id=\"" + food.id + "\"><td><input type=\"checkbox\"/></td><td class=\"food-item\" >" + food["name"] + "</td><td class=\"food-calories\">" + food["calories"] + "</td></tr>");
	};

	var generateTotals = function generateTotals() {
	  var total = calculateTotal();
	  var remaining = totalGoalCalories - total;
	  $('#consumed-calories').html("" + total);
	  $('#total-remaining-calories').html("" + remaining);
	  colorCalories("totals", remaining);
	};

	var calculateTotal = function calculateTotal() {
	  var totalMealCalories = 0;
	  $('.meal-calories').each(function () {
	    totalMealCalories += parseFloat($(this).text());
	  });
	  return totalMealCalories;
	};

	var deleteFromDiary = function deleteFromDiary(mealName, foodId) {
	  var mealId = 0;

	  if (mealName == "breakfast") {
	    mealId = 1;
	  } else if (mealName == "lunch") {
	    mealId = 3;
	  } else if (mealName == "dinner") {
	    mealId = 4;
	  } else if (mealName == "snack") {
	    mealId = 2;
	  }

	  $.ajax({
	    url: requestUrl + "/meals/" + mealId + "/foods/" + foodId,
	    type: 'DELETE',
	    success: function success(result) {
	      calculateCalories(mealName);
	      generateTotals();
	    }
	  });
	};

	var foodSearch = function foodSearch(text, foodItem) {
	  foodItem.parent().hide();

	  foodItem.filter(function () {
	    return $(this).text().toLowerCase().indexOf(text) == 0;
	  }).parent().show();
	};

	var mealIdTable = { "breakfast": 1, "snack": 2, "lunch": 3, "dinner": 4 };
	$(".add-to-meal-button").on("click", function () {
	  var meal = $(this).prop('id');

	  $('input:checkbox:checked').parent().each(function () {
	    var foodId = $(this).parent().prop('id');

	    $.post(requestUrl + "/meals/" + mealIdTable[meal] + "/foods/" + foodId);

	    $.get(requestUrl + "/foods/" + foodId).then(function (food) {
	      var foodName = food["name"];
	      var calories = food["calories"];

	      $("#" + meal + "-table tbody").append("<tr id=" + food["id"] + "><td>" + foodName + "</td><td class=\"calories\">" + calories + "</td><td><button class=\"delete-from-diary\" type=\"submit\"><img src=\"/lib/assets/images/delete.png\" /></button></td>></tr>");
	      $("input:checkbox:checked").prop('checked', false);
	      calculateCalories(meal);
	      generateTotals();
	    });
	  });
	});

	$("#calorie-sorter").on("click", function () {
	  var rowsToSort = [];
	  var currentSorting = $('#diary-food-table').prop('class');

	  $('#diary-food-table tbody tr').each(function () {
	    var foodId = $(this).prop('id');
	    var foodName = $(this).children('.food-item').text();
	    var foodCalories = $(this).children('.food-calories').text();
	    var rowInformation = { 'id': foodId, 'name': foodName, 'calories': foodCalories };

	    rowsToSort.push(rowInformation);
	  });

	  if (currentSorting == 'default') {
	    rowsToSort.sort(function (a, b) {
	      $('#diary-food-table').prop('class', 'asc');
	      return parseInt(a.calories) - parseInt(b.calories);
	    });
	  } else if (currentSorting == 'asc') {
	    rowsToSort.sort(function (a, b) {
	      $('#diary-food-table').prop('class', 'desc');
	      return b.calories - a.calories;
	    });
	  } else {
	    rowsToSort.sort(function (a, b) {
	      $('#diary-food-table').prop('class', 'default');
	      return a.id - b.id;
	    });
	  }

	  $("#diary-food-table tbody").empty();

	  rowsToSort.forEach(function (food) {
	    buildFoodTable(food);
	  });
	});

	module.exports = {
	  getMeals: getMeals, getAllFoods: getAllFoods, deleteFromDiary: deleteFromDiary, foodSearch: foodSearch
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _meals = __webpack_require__(4);

	var onIndexLoad = $(document).ready(function () {
	  (0, _meals.getMeals)();
	});

	var clickDeleteFromMeal = $(document).on('click', '.delete-from-diary', function (event) {
	  var mealName = $(this).closest('table').prop('class');
	  var foodId = $(this).closest('tr').prop('id');
	  (0, _meals.deleteFromDiary)(mealName, foodId);
	  $(this).closest('tr').remove();
	});

	$("#food-search").on("keyup", function () {
	  var text = $(this).val().toLowerCase();
	  var foodItem = $(".food-item");

	  (0, _meals.foodSearch)(text, foodItem);
	});

	module.exports = {
	  onIndexLoad: onIndexLoad, clickDeleteFromMeal: clickDeleteFromMeal
	};

/***/ })
/******/ ]);