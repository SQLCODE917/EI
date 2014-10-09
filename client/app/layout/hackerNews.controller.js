(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ 'hackerNewsModel',
			'workQueueClient', 
			'getHackerNewsTopStoriesTask', 
			HackerNewsController ]);

	function HackerNewsController (
		hackerNewsModel, 
		workQueueClient, 
		getHackerNewsTopStoriesTask) {

		/*jshint validthis: true */
		var self = this;
		
		self.topstories = hackerNewsModel.getTopstories;

		self.getTopStories = function () {
		
			return workQueueClient.allocateQueue()
				.push (getHackerNewsTopStoriesTask)
				.perform();

		};
	}
})();
