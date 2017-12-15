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

	__webpack_require__(1);

	var _foodEvents = __webpack_require__(5);

	var _mealEvents = __webpack_require__(9);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#new-food-submit {\n    background-color: #008CBA;\n    border: 1px solid black;\n    color: black;\n    border-radius: 12px;\n    /*padding: 15px 32px;*/\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n}\n\n\n#food-table {\n  table-layout: fixed;\n  width: 25%\n}\n\n.delete-food {\n  font-size: 16px;\n  border: 1px solid black;\n  background-color: red;\n  color: white;\n  border-radius: 50%;\n}\n\n.delete-from-diary {\n  font-size: 16px;\n  border: 1px solid black;\n  background-color: red;\n  color: white;\n  border-radius: 50%;\n}\n\n th, td {\n  border: 1px solid black;\n}\n\n.food-calories {\n  border: 1px solid black;\n}\n\ntd:last-child {\n  border: none;\n}\n.flex-container {\n  display: flex;\n  flex-direction: row;\n  width: 40%;\n  justify-content: space-between;\n}\n\n.meal-buttons button, #new-food {\n  background-color: #008CBA;\n  border: 1px solid black;\n  color: white;\n  border-radius: 12px;\n  /*padding: 15px 32px;*/\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n}\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _foods = __webpack_require__(6);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _foodResponseHandlers = __webpack_require__(7);

	var _meals = __webpack_require__(8);

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
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	var makeContentEditable = function makeContentEditable() {

	  var tds = document.getElementsByClassName('food-name food-calories');
	  for (var i = 0; i < tds.length; i++) {
	    tds[i].contentEditable = 'true';
	  };
	};

	var hideTableRow = function hideTableRow(id) {
	  $('#' + id).hide();
	};

	var addFoodToTable = function addFoodToTable(food) {
	  var tableRow = '<tr id=' + food["id"] + '><td class="food-name">' + food["name"] + '</td><td class="food-calories">' + food["calories"] + '</td><td><button class="delete-food" type="submit">-</button></td></tr>';
	  $("#food-table tr:first").after(tableRow);

	  makeContentEditable();
	};

	module.exports = {
	  makeContentEditable: makeContentEditable, hideTableRow: hideTableRow, addFoodToTable: addFoodToTable
	};

/***/ }),
/* 8 */
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
	      $("#" + meal["name"].toLowerCase() + "-table").append("<tr id=" + item["id"] + "><td>" + food + "</td><td class=\"calories\">" + calories + "</td><td><button class=\"delete-from-diary\" type=\"submit\">-</button></td>></tr>");
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

	  $("#" + mealName + "-table tfoot .meal-calories").html("" + summedCalories).css("border", "1px solid black");
	  $("#" + mealName + "-table tfoot .remaining-calories").html("" + remainingCalories).css("border", "1px solid black");

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

	  $("#diary-food-table").append("<tr id=\"" + food.id + "\"><td><input type=\"checkbox\"/></td><td class=\"food-item\" >" + food["name"] + "</td><td class=\"food-calories\">" + food["calories"] + "</td><td></td></tr>");
	};

	var generateTotals = function generateTotals() {
	  var total = calculateTotal();
	  var remaining = totalGoalCalories - total;
	  $('#consumed-calories').html("" + total).css("border", "1px solid black");
	  $('#total-remaining-calories').html("" + remaining).css("border", "1px solid black");
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

	      $("#" + meal + "-table tbody").append("<tr id=" + food["id"] + "><td>" + foodName + "</td><td class=\"calories\">" + calories + "</td><td><button class=\"delete-from-diary\" type=\"submit\">-</button></td>></tr>");
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

	module.exports = { getMeals: getMeals, getAllFoods: getAllFoods, deleteFromDiary: deleteFromDiary, foodSearch: foodSearch };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _meals = __webpack_require__(8);

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