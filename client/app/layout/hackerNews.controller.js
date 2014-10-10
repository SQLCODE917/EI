(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ '$log',
			'hackerNewsModel',
			'workQueueClient', 
			'getHackerNewsTopStoriesTask', 
			'getUpdateHackerNewsModelTask',
			HackerNewsController ]);

	function HackerNewsController (
		$log,
		hackerNewsModel, 
		workQueueClient, 
		getHackerNewsTopStoriesTask,
		getUpdateHackerNewsModelTask) {

		/*jshint validthis: true */
		var self = this;
		
		self.topstories = hackerNewsModel.getTopstories;

		self.getTopStories = function () {
			$log.info ("HN Controller called to get topstories");

			return workQueueClient.allocateQueue()
				.push (
					getHackerNewsTopStoriesTask.create()
					.andThen(
						getUpdateHackerNewsModelTask.create('setTopstories')
					)
				)
				.perform();

		};
	}
})();
