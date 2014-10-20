(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getUpdateHackerNewsModelTask',
			[ '$q', '$log', 'hackerNewsModel', getUpdateHackerNewsModelTask ]);

	function getUpdateHackerNewsModelTask ($q, $log, hackerNewsModel) {

		var api = {
			constructor: getUpdateHackerNewsModelTask,
			create: function (setterFunctionName) { 
				return new TaskInstance (setterFunctionName);
			}
		};

		return api;	

		function TaskInstance (setterFunctionName) {

			var deferred = $q.defer();

			var api = {
				constructor: getUpdateHackerNewsModelTask,
				perform: perform,
				useKey: useKey
			};

			return api;

			function useKey (key) {
				
				api.perform = function (data) {
					hackerNewsModel [setterFunctionName] (data, key);		
					
					deferred.resolve (data);
					return deferred.promise;
				};


				
				return api;
			}

			function perform (data) {
				hackerNewsModel [setterFunctionName](data);
				
				deferred.resolve (data);
				return deferred.promise;
			}
		}
	}
})();
