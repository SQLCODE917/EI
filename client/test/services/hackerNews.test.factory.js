(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('hackerNewsService',
			['$q', '$timeout', testHackerNewsService]);

	function testHackerNewsService ($q, $timeout) {
		
		var api = {
			item: item,
			user: user,
			topstories: topstories,
			maxitem: maxitem,
			updates: updates
		};

		var updateData;

		return api;

		function item (id) {
			return {};	
		}

		function user (id) {
			return {};
		}

		function topstories () {
			var deferred = $q.defer ();
			
			var testStories = [ 8414149, 8414078, 8413972, 8411638, 8414102, 8413204 ];

			deferred.resolve (testStories);
			
			return deferred.promise;
		}

		function maxitem () {
			return -1;
		}

		function updates () {
			return {};
		}
	}
})();
