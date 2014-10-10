(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsModel', 
			[ '$log', hackerNewsModel ]);

	function hackerNewsModel ($log) {
		var topstories;
		
		var api = {
			getTopstories: getTopstories,
			setTopstories: setTopstories
		};

		return api;

		function setTopstories (newTopstories) {
			$log.info ('Setting HN model.topstories to an object of length ' + newTopstories.length);
			topstories = newTopstories;
		}

		function getTopstories () {
			return topstories;
		}
	}
})();
