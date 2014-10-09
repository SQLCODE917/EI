(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopStoriesTask', 
			[ '$q', 'hackerNewsModel', 'hackerNewsService', getHackerNewsTopStoriesTask ]);

	function getHackerNewsTopStoriesTask ($q, hackerNewsModel, hackerNewsService) {
		var api = {
			create: function () { return new HackerNewsTopStoriesTask(); },
			constructor: HackerNewsTopStoriesTask
		};

		return api;

		/*
		 * Coupling? 
		 * The $watch handler in the Service is executed like this:
		 * handler.call( context, eventArgs )
		 * in this case, this depends on context like this:
		 * { data: latest top stories Array of Firebase Object $values }
		 */
		function topStoriesWatchHandler (watchEvent) {
			/*jshint validthis: true */
			var self = this;

			console.log( "HN Top Stories have changed!" );
			console.log( "\t" + 
				self.data[watchEvent.key] + 
				" had a " + 
				watchEvent.event 
			);

			hackerNewsModel.setTopStories (self.data);
		}

		function HackerNewsTopStoriesTask () {
		
			this.perform = function() {
				hackerNewsService.topstories (topStoriesWatchHandler)
					.then (function (topStories) {
						hackerNewsModel.setTopStories (topStories);
					});
			};

			return {
				constructor: HackerNewsTopStoriesTask,
				perform: this.perform
			};
		}
	}
})();
