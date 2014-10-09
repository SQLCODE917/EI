(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsModel', hackerNewsModel);

	function hackerNewsModel () {
		var topstories;
		
		var api = {
			getTopstories: getTopstories,
			setTopstories: setTopstories
		};

		return api;

		function setTopstories (newTopstories) {
			topstories = newTopstories;
		}

		function getTopstories () {
			return topstories;
		}
	}
})();
