(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('hackerNewsService',
			['$q', testHackerNewsService]);

	function testHackerNewsService ($q) {
		
		var api = {
			item: item,
			user: user,
			topstories: topstories,
			simulateTopstoriesUpdate: simulateTopstoriesUpdate,
			maxitem: maxitem,
			updates: updates
		};

		var updateData;
		var topStoriesWatchHandler;

		return api;

		function item (id) {
			return {};	
		}

		function user (id) {
			return {};
		}

		function topstories (watchHandler) {
			var deferred = $q.defer ();
			
			var testStories = [ 8414149, 8414078, 8413972, 8411638, 8414102, 8413204, 8413100, 8413971, 8412744, 8414003, 8412841, 8412802, 8412605, 8413548, 8413123, 8414437, 8412897, 8413028, 8413341, 8412425, 8411762, 8413623, 8412346, 8411356, 8413056, 8413365, 8412372, 8414055, 8412877, 8412167, 8413264, 8414137, 8410519, 8412933, 8411846, 8412929, 8411254, 8411512, 8412777, 8412626, 8413274, 8414389, 8414117, 8412114, 8412212, 8412759, 8412696, 8412768, 8411643, 8411866, 8413966, 8410976, 8410545, 8410358, 8413979, 8414129, 8411791, 8409075, 8410314, 8411532, 8411553, 8412099, 8412085, 8410356, 8409084, 8412862, 8409823, 8412705, 8410220, 8409323, 8414090, 8410326, 8414206, 8411026, 8408298, 8407364, 8413066, 8412104, 8412235, 8412786, 8395689, 8414318, 8406384, 8414314, 8406507, 8408501, 8413630, 8414180, 8400778, 8413804, 8407298, 8413233, 8412601, 8411277, 8409940, 8414287, 8397750, 8412679, 8412727, 8413104 ];

			deferred.resolve (testStories);
			return deferred.promise;
		}

		function simulateTopstoriesUpdate (data, eventData) {
			updateData = data;

			topStoriesWatchHander.call ( { data: data }, eventData );
		}

		function maxitem () {
			return -1;
		}

		function updates () {
			return {};
		}
	}
})();
