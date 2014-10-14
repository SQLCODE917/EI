(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopStoriesTask', 
			[ '$q', '$log', 'hackerNewsService', getHackerNewsTopStoriesTask ]);

	function getHackerNewsTopStoriesTask ($q, $log, hackerNewsService) {

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
				$log.info ("Performing the HN Topstories task");
				var work = hackerNewsService
					.topstories ()
					.$loaded ();
				
				/*
				 * Having a result handler gains us 2 functions:
				 * First, we can chain tasks
				 * Second, we can handle errors by passing a null object
				 */
				if (resultHandlerTask)
				{
					work.then (resultHandlerTask.perform);
					work.catch (function (error) {
						$log.warn ("Failed to get HN Topstories! Returning an empty set!");
						$log.warn (error.message);
					
						resultHandlerTask.perform ([]);	
					});
				}
			}
		}
	}
})();
