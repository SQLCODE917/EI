(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getUpdateHackerNewsModelTask',
			[ 'hackerNewsModel', getUpdateHackerNewsModelTask ]);

	function getUpdateHackerNewsModelTask (hackerNewsModel) {

		var api = {
			create: function (setterFunctionName) { return new TaskInstance (setterFunctionName);}
		};

		return api;	

		function TaskInstance (setterFunctionName) {

			var api = {
				perform: perform
			};

			return api;

			function perform (data) {
				if (data)
				{
					hackerNewsModel [setterFunctionName](data);
				}
			}
		}
	}
})();
