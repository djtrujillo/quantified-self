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

	var _mealEvents = __webpack_require__(4);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _foods = __webpack_require__(2);

	// if (window.location.pathname == '/foods.html') {

	var onLoad = $(document).ready(function () {
	  (0, _foods.getFoods)();
	}); // const getFoods = require('../requests/foods')


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
	  console.log("food-calories clicked");
	  var newCalories = this.innerHTML;
	  var id = $(this.parentElement).attr("id");
	  (0, _foods.editCalories)(newCalories, id);
	});

	var filter = $("#filter").on('keyup', function () {
	  var input = $(this).val().toLowerCase();
	  (0, _foods.filterByName)(input);
	});

	module.exports = { onLoad: onLoad, clickSubmit: clickSubmit, clickDelete: clickDelete, clickFood: clickFood, clickCalories: clickCalories, filter: filter };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _foodResponseHandlers = __webpack_require__(3);

	var requestUrl = "http://localhost:3000/api/v1";

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

	var deleteFood = function deleteFood(id) {
	  $.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'DELETE',
	    success: function success(result) {
	      (0, _foodResponseHandlers.hideTableRow)(id);
	    }
	  });
	};

	var editFood = function editFood(newFood, id) {
	  $.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'PATCH',
	    data: { food: { "name": newFood } },
	    success: function success(food) {
	      location.reload(true);
	    }
	  });
	};

	var editCalories = function editCalories(newCalories, id) {
	  $.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'PATCH',
	    data: { food: { "calories": newCalories } },
	    success: function success(result) {
	      location.reload(true);
	    }
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

	module.exports = { getFoods: getFoods, postFood: postFood, deleteFood: deleteFood, editFood: editFood, editCalories: editCalories, filterByName: filterByName };

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

	module.exports = { makeContentEditable: makeContentEditable, hideTableRow: hideTableRow, addFoodToTable: addFoodToTable };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _meals = __webpack_require__(5);

	if (window.location.pathname == '/') {
	  var _onIndexLoad = $(document).ready(function () {
	    (0, _meals.getMeals)();
	  });
	}

	module.exports = { onIndexLoad: onIndexLoad };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	var requestUrl = "http://localhost:3000/api/v1";

	var totalGoalCalories = 2000;

	var tableRow = function tableRow(food, calories) {
	  return "<tr><td>" + food + "</td><td>" + calories + "</td></tr>";
	};

	var totalCaloriesRow = function totalCaloriesRow(calories) {
	  return "<tr><th>Total Calories</th><td>" + calories + "</td></tr>";
	};

	var remainingCaloriesRow = function remainingCaloriesRow(calories) {
	  var color = "";
	  if (calories >= 0) {
	    return "<tr><th>Remaining Calories</th><td class=\"remaining-calories\" style=\"color: green;\">" + calories + "</td></tr>";
	  } else {
	    return "<tr><th>Remaining Calories</th><td class=\"remaining-calories\" style=\"color: red;\">" + calories + "</td></tr>";
	  }
	};

	var getMeals = function getMeals() {
	  $.get(requestUrl + "/meals").then(function (meals) {
	    populateTable(meals);
	    calculateCalories(meals);
	    generateTotals(meals);
	    getAllFoods();
	  });
	};

	var populateTable = function populateTable(meals) {
	  meals.forEach(function (meal) {
	    meal["foods"].forEach(function (item) {
	      var food = item["name"];
	      var calories = item["calories"];
	      $("#" + meal["name"].toLowerCase() + "-table").append(tableRow(food, calories));
	    });
	  });
	};

	var calculateCalories = function calculateCalories(meals) {
	  meals.forEach(function (meal) {
	    var totalCalories = 0;
	    meal["foods"].forEach(function (item) {
	      totalCalories += item["calories"];
	    });
	    var remainingCalories = getRemainingCalories(meal, totalCalories);
	    $("#" + meal["name"].toLowerCase() + "-table").append(totalCaloriesRow(totalCalories));
	    $("#" + meal["name"].toLowerCase() + "-table").append(remainingCaloriesRow(remainingCalories));
	  });
	};

	var getRemainingCalories = function getRemainingCalories(meal, totalCalories) {
	  if (meal["name"] == "Breakfast") {
	    return 400 - totalCalories;
	  } else if (meal["name"] == "Lunch") {
	    return 600 - totalCalories;
	  } else if (meal["name"] == "Dinner") {
	    return 800 - totalCalories;
	  } else if (meal["name"] == "Snack") {
	    return 200 - totalCalories;
	  }
	};

	var generateTotals = function generateTotals(meals) {
	  var total = calculateTotal(meals);
	  var remaining = totalGoalCalories - total;
	  $('#consumed-calories').html("" + total);
	  $('#total-remaining-calories').html("" + remaining);
	  if (remaining >= 0) {
	    $('#total-remaining-calories').css("color", "green");
	  } else {
	    $('#total-remaining-calories').css("color", "red");
	  }
	};

	var calculateTotal = function calculateTotal(meals) {
	  var totalMealCalories = 0;
	  meals.forEach(function (meal) {
	    var calories = 0;
	    meal["foods"].forEach(function (item) {
	      calories += item["calories"];
	    });
	    totalMealCalories += calories;
	  });
	  return totalMealCalories;
	};

	var getAllFoods = function getAllFoods() {
	  $.get(requestUrl + "/foods").then(function (foods) {
	    foods.forEach(function (food) {
	      $("#diary-food-table").append(foodsTableRow(food));
	    });
	  });
	};

	var foodsTableRow = function foodsTableRow(food) {
	  return "<tr id=\"" + food.id + "\"><td><input type=\"checkbox\"/></td><td class=\"food-item\" >" + food["name"] + "</td><td>" + food["calories"] + "</td></tr>";
	};

	$("#food-search").bind("keyup", function () {
	  var text = $(this).val().toLowerCase();
	  var foodItem = $(".food-item");

	  foodItem.parent().hide();

	  foodItem.filter(function () {
	    return $(this).text().toLowerCase().indexOf(text) == 0;
	  }).parent().show();
	});

	module.exports = { getMeals: getMeals };

/***/ })
/******/ ]);