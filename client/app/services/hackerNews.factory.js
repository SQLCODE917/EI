(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('hackerNewsService', 
			['$q', '$firebase', 'HACKERNEWS_API_URL', 'HACKERNEWS_API_VERSION', hackerNewsService]);

	function hackerNewsService ($q, firebase, API_URL, API_Version) {
		/*
		 * https://github.com/HackerNews/API
		 */
		var api = {
			item: item,
			user: user,
			topstories: topstories,
			maxitem: maxitem,
			updates: updates
		};

		return api;

		function getFirebaseSync (URL) {
			var reference = new Firebase (URL);
			return firebase (reference);
		}

		function getFirebaseObject (URL) {
			var sync = getFirebaseSync (URL);
			return sync.$asObject ();
		}

		function getFirebaseArray (URL) {
			var sync = getFirebaseSync (URL);
			return sync.$asArray ();
		}

		function getValuesFromFirebaseArray (firebaseObjects) {
			var values = [];

			firebaseObjects.forEach (function (object) {
				values.push (object.$value);
			});

			return values;
		}
	
		/* 
		 * Stories, comments, jobs, Ask HNs and even polls are just items. 
		 * They're identified by their ids, which are unique integers
		 */
		function item (id) {
			return getFirebaseObject (API_URL + API_Version + 'item/' + id);
		}

		/*
		 * Users are identified by case-sensitive ids
		 */
		function user (id) {
			return getFirebaseObject (API_URL + API_Version + 'user/' + id);
		}

		/*
		 * The current top 100 stories
		 */
		function topstories (watchHandler) {
			var deferred = $q.defer ();

			getFirebaseArray (API_URL + API_Version + 'topstories')
				.$loaded ()
				.then (function (topStories) {
					console.log ("Got top stories!");
					
					/*
					 * Context as filter:
					 * parse the Firebase Object Array into a regular Array,
					 * like all other data returned
					 */
					var unwatch = topStories.$watch (watchHandler, {
						data: getValuesFromFirebaseArray(topStories)	
					});

					deferred.resolve (getValuesFromFirebaseArray (topStories));

				})
				.catch (function (error) {
					console.log ("Did not get top stories!");
					console.log (error);
					
					deferred.resolve ([]);
				});

			return deferred.promise;
		}

		/*
		 * The current largest item id
		 */
		function maxitem () {
			return getFirebaseObject (API_URL + API_Version + 'maxitem');
		}

		/*
		 * The item and profile changes
		 */
		function updates () {
			return getFirebaseObject (API_URL + API_Version + 'updates');
		}
	}
})();
