(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ '$log',
			'hackerNewsModel',
			'jExpressionCompiler',
			HackerNewsController ]);

	function HackerNewsController (
		$log,
		hackerNewsModel, 
		JExp
		) {

		/*jshint validthis: true */
		var self = this;
		
		self.topstories = hackerNewsModel.getTopstories;

		self.getTopStories = function () {

			var topStoriesTask = {
				'chain': [
					{'hackerNewsTopstoriesService':[]},
					{'invoke':['lastReturn'], 'target':'hackerNewsModel', 'key':'setTopstories'}
				]
			};
			
			JExp.run (JExp.compile (topStoriesTask));

			return topStoriesTask;
		};
	}
})();
