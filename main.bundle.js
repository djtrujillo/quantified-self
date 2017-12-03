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

	var _events = __webpack_require__(1);

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
	  console.log("Clicked");
	  var id = $(this).attr("data-id");
	  (0, _foods.deleteFood)(id);
	});

	module.exports = { onLoad: onLoad, clickSubmit: clickSubmit, clickDelete: clickDelete };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var requestUrl = "http://localhost:3000/api/v1";

	var tableRow = function tableRow(food) {
	  return "<tr><td>" + food["name"] + "</td><td>" + food["calories"] + "</td><td><button class=\"delete-food\" data-id=" + food["id"] + " type=\"submit\"><img src=\"/lib/assets/images/delete.png\" /></button></td>></tr>";
	};

	var getFoods = function getFoods() {
	  $.get(requestUrl + "/foods").then(function (foods) {
	    foods.forEach(function (food) {
	      $("#food-table tr:first").after(tableRow(food));
	    });
	  });
	};

	var postFood = function postFood(food, calories) {
	  $.post(requestUrl + "/foods", {
	    "food": {
	      "name": food,
	      "calories": calories
	    }
	  }).then(function () {
	    location.reload(true);
	    // getFoods()
	  });
	};

	var deleteFood = function deleteFood(id) {
	  $.ajax({
	    url: requestUrl + "/foods/" + id,
	    type: 'DELETE',
	    success: function success(result) {
	      location.reload(true);
	    }
	  });
	};

	module.exports = { getFoods: getFoods, postFood: postFood, deleteFood: deleteFood };

/***/ })
/******/ ]);