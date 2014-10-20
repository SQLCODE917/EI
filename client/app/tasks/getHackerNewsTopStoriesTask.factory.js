(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopStoriesTask', [
			'$q', 
			'$log', 
			'hackerNewsTopstoriesService', 
			getHackerNewsTopStoriesTask 
		]);

	function getHackerNewsTopStoriesTask ($q, $log, hackerNewsTopstories) {

		var api = {	
			create: function () { return new TaskInstance(); },
			constructor: getHackerNewsTopStoriesTask
		};

		return api;

		function TaskInstance () {

			var resultHandlerTask;

			var api = {
				constructor: getHackerNewsTopStoriesTask,
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
				var work = hackerNewsTopstories();
				
				if (resultHandlerTask)
				{
					resultHandlerTask.perform(work);
					work.catch (function (error) {
						var deferred = $q.deffer();
						deferred.resolve ({});
						$log.warn ("Failed to get HN Topstories! Returning an empty set!");
						$log.warn (error.message);
					
						resultHandlerTask.perform (deferred.promise);
					});
				}
			}
		}
	}
})();
