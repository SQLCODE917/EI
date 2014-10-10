(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getUpdateHackerNewsModelTask',
			[ '$log', 'hackerNewsModel', getUpdateHackerNewsModelTask ]);

	function getUpdateHackerNewsModelTask ($log, hackerNewsModel) {

		var api = {
			constructor: getUpdateHackerNewsModelTask,
			create: function (setterFunctionName) { return new TaskInstance (setterFunctionName);}
		};

		return api;	

		function TaskInstance (setterFunctionName) {

			var api = {
				constructor: getUpdateHackerNewsModelTask,
				perform: perform
			};

			return api;

			function perform (data) {
				$log.info ("Performing an update task on HN model by invoking " + setterFunctionName);
				
				if (data)
				{
					hackerNewsModel [setterFunctionName](data);
				}
			}
		}
	}
})();
