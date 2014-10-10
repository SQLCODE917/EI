(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopStoriesTask', 
			[ 'hackerNewsService', getHackerNewsTopStoriesTask ]);

	function getHackerNewsTopStoriesTask (hackerNewsService) {

		var api = {	
			create: function () { return new TaskInstance(); }
		};

		return api;

		function TaskInstance () {

			var resultHandlerTask;

			var api = {
				perform: perform,
				andThen: andThen
			};

			return api;

			function andThen (onResult)
			{
				resultHandlerTask = onResult;
				return api;
			}

			function perform () {
				var work = hackerNewsService
					.topstories();
				if (resultHandlerTask)
					work.then (resultHandlerTask.perform);
			}
		}
	}
})();
