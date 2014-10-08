(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopStoriesTask', 
			[ 'hackerNewsModel', 'hackerNewsService', getHackerNewsTopStoriesTask ]);

	function getHackerNewsTopStoriesTask (hackerNewsModel, hackerNewsService) {
		var api = {
			create: function () { return new HackerNewsTopStoriesTask(); },
			constructor: HackerNewsTopStoriesTask
		};

		return api;

		function HackerNewsTopStoriesTask () {
		
			/*
			 * How embarassing! My implementation details are showing!
			 * Should they be in the Task, or encapsulated in a client?
			 * Maybe it's a good thing that all the processing logic is in 1 place...
			 */	
			this.perform = function() {
				hackerNewsService.topstories ()
					.$loaded ()
					.then (function (topStories) {
						console.log ("NH Top Stories loaded!");
						
						var getValues = function (firebaseObjects) {
							var values = [];

							firebaseObjects.forEach (function (object) {
								values.push (object.$value);
							});

							return values;
						};

						hackerNewsModel.setTopStories (getValues (topStories));

						var unwatch = topStories.$watch (function (event) {
							console.log( "HN Top Stories have changed!" );
							console.log( "\t" + topStories[event.key].$value + " had a " + event.event );

							hackerNewsModel.setTopStories (getValues (topStories));
						});

					})
					.catch (function (error) {
						console.log ("NH Top Stories failed to load!");
						console.log (error);
					});

			};

			return {
				constructor: HackerNewsTopStoriesTask,
				perform: this.perform
			};
		}
	}
})();
