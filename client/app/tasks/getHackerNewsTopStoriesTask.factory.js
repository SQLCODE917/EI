(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopStoriesTask', 
			[ 'hackerNewsModel', 'hackerNewsService', getHackerNewsTopStoriesTask ]);

	function getHackerNewsTopStoriesTask (hackerNewsModel, hackerNewsService) {
		var api = {
			perform: perform
		};

		return api;

		function perform () {
			hackerNewsService
				.topstories()
				.then (function (topstories) {
					hackerNewsModel.setTopstories( topstories );
				});
		}
	}
})();
