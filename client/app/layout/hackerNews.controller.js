(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ 'hackerNewsModel',
			'workQueueClient', 
			'getHackerNewsTopStoriesTask', 
			'getUpdateHackerNewsModelTask',
			HackerNewsController ]);

	function HackerNewsController (
		hackerNewsModel, 
		workQueueClient, 
		getHackerNewsTopStoriesTask,
		getUpdateHackerNewsModelTask) {

		/*jshint validthis: true */
		var self = this;
		
		self.topstories = hackerNewsModel.getTopstories;

		self.getTopStories = function () {
		
			return workQueueClient
				.allocateQueue()
				.push (
					getHackerNewsTopStoriesTask
					.create()
					.andThen(
						getUpdateHackerNewsModelTask
						.create('setTopstories')
					))
				.perform();

		};
	}
})();
