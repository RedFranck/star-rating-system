/**
 * **** Star Rating System *****
 * Author: Francis Longpre Marcoux
 */;

Module = (typeof Module != 'undefined')? Module : {};
Module.StarRatingSystem = (function($) {
	function module(container, userOptions) {
		this.options = {};
		this.el_moduleParent; // Host element
		this.el_moduleContainer;
		this.el_starContainer;
		this.el_backgroundScore;

		this.listeners = {
			'scoreUpdated' : []
		};

		this.init(container, userOptions);
	}


	module.prototype = {
		addListener : function (key, callback) {
			this.listeners[key].push(callback);
		},

		fireEvent : function (key, args) {
			if (this.listeners[key]) {
				for( var i = 0, len = this.listeners[key].length; i < len; i++) {
					this.listeners[key][i].call(args);
				}
			}
		},

		setScore : function (score) {
			this.el_backgroundScore.width((score * 100) + '%');
		},

		init : function(container, userOptions) {
			this.el_moduleParent = $(container);
			options = this.mergeDefaultOptions(userOptions || {});

			this.el_moduleContainer = $('<div class="srs-container" data-srs-module="main"></div>');
			this.el_backgroundScore = $('<div class="srs-background-score" data-srs-handle="background-score"></div>');
			this.el_starContainer = this.createStarContainer();
			
			this.el_moduleContainer.append(this.el_starContainer);
			this.el_moduleContainer.append(this.el_backgroundScore);

			this.setDynamicStyle();
			this.setScore(options.defaultScore);

			this.el_starContainer.on('click', '[data-srs-action="rate"]', this.handleStarClick.bind(this));
			
			this.el_moduleParent.append(this.el_moduleContainer);
		},



		mergeDefaultOptions : function(userOptions) {
			var defaults = {
				defaultScore: 0, // (float) between 0 and 1, set the defaults score displayed
				maxStar: 5, // (int) Set the maximum number of stars
				starImageLocation: 'StarRatingSystem_star.png',
			};

			return $.extend(true, defaults, userOptions);
		},


		createStarContainer : function() {
			var el_markup = $('<div class="srs-star-container" data-srs-handle="star-container"></div>');

			for (var i=options.maxStar; i>0; i--) {
				el_markup.append($('<button class="single-star" data-srs-action="rate"><img src="' + options.starImageLocation + '" /></button>'));
			}

			return el_markup;
		},


		handleStarClick : function(e) {
			var el_currentStar = $(e.currentTarget);
			var score = (el_currentStar.index() + 1) / (el_currentStar.siblings().length + 1);
			this.fireEvent('scoreUpdated', [score]);
			this.setScore(score);
		},


		setDynamicStyle : function() {
			var el_stars = this.el_starContainer.find('.single-star');
			el_stars.width( (100/el_stars.length) + '%');
		}
	};


	return module;
}(jQuery));