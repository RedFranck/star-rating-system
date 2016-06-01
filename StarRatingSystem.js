/**
 * **** Star Rating System *****
 * Author: Francis Longpre Marcoux
 */;

Module = (typeof Module != 'undefined')? Module : {};
Module.StarRatingSystem = (function($, self) {
	//=== INTERNAL STUFFS ============
	var publics = self;
	//=== START OF YOUR CODE ============
	//===================================


	//=== Public properties ==========================================================
	//=== To be accessible outside this `class` through MODULE.ModuleName.PropertyName
	//================================================================================
	// no public properties yet



	//=== Private properties =========================================================
	//=== To be used inside this `class` only
	//================================================================================
	var options = {};
	var el_moduleParent; // Host element
	var el_moduleContainer;
	var el_starContainer;
	var el_backgroundScore;



	//=== Public Methods =============================================================
	//=== To be accessible outside this `class` through MODULE.ModuleName.MethodName
	//================================================================================
	/**
	 * @param {Element} container -The DOM node element that will host the module
	 * @param {Object} userOptions -The options Object that will overrides the defaults
	 */
	var init = publics.init = function(container, userOptions) {
		el_moduleParent = $(container);
		options = mergeDefaultOptions(userOptions || {});

		el_moduleContainer = $('<div class="srs-container" data-srs-module="main"></div>');
		el_backgroundScore = $('<div class="srs-background-score" data-srs-handle="background-score"></div>');
		el_starContainer = createStarContainer();
		
		el_moduleContainer.append(el_starContainer);
		el_moduleContainer.append(el_backgroundScore);

		setScore(options.defaultScore);

		el_starContainer.on('click', '[data-srs-action="rate"]', handleStarClick);
		
		el_moduleParent.append(el_moduleContainer);
	};


	/**
	 * @param {Float} score -The score to be set in the star system
	 */
	var setScore = publics.setScore = function(score) {
		el_backgroundScore.width((score * 100) + '%');
	};



	//=== Private Methods ============================================================
	//=== To be used inside this `class` only
	//================================================================================
	var mergeDefaultOptions = function(userOptions) {
		var defaults = {
			defaultScore: 0, // (float) between 0 and 1, set the defaults score displayed
			maxStar: 5, // (int) Set the maximum number of stars
			returnFunction: function(rating){console.log(rating);}, // (function) execute when a user rate, receive a rating (float) between 0 and 1
			starImageLocation: 'StarRatingSystem_star.png',
		};

		return $.extend(true, defaults, userOptions);
	};


	var createStarContainer = function() {
		var el_markup = $('<div class="srs-star-container" data-srs-handle="star-container"></div>');

		for (var i=options.maxStar; i>0; i--) {
			el_markup.append($('<button class="single-star" data-srs-action="rate"><img src="' + options.starImageLocation + '" /></button>'));
		}

		return el_markup;
	};


	var handleStarClick = function(e) {
		var el_currentStar = $(e.currentTarget);
		var score = (el_currentStar.index() + 1) / (el_currentStar.siblings().length + 1);
		options.returnFunction(score);
		setScore(score);
	};



	//=== END OF YOUR CODE ==============
	//===================================
	return publics;
}(jQuery, Module.StarRatingSystem || {}));