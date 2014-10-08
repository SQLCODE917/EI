(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ '$firebase', 
			'hackerNewsModel',
			'workQueueClient', 
			'getHackerNewsTopStoriesTask', 
			HackerNewsController ]);

	function HackerNewsController (firebase, 
		hackerNewsModel, 
		workQueueClient, 
		getHackerNewsTopStoriesTask) {

		/*jshint validthis: true */
		var self = this;
		
		self.topStories = hackerNewsModel.topStories;

		self.getTopStories = function () {
			return workQueueClient.allocateQueue()
				.push (getHackerNewsTopStoriesTask.create ())
				.perform();
		};
	}
})();
