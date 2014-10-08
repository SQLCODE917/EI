(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsModel', hackerNewsModel);

	function hackerNewsModel () {
		var topStories;
		
		var api = {
			topStories: getTopStories,
			setTopStories: setTopStories
		};

		return api;

		function getTopStories () {
			return topStories;
		}

		function setTopStories (newTopStories) {
			topStories = newTopStories;	
		}
	}
})();
