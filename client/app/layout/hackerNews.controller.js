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

			var topStoriesTask = 
			{ 'chain': [
					{ 'getHackerNewsTopstories': [] },
					{ 'invoke': ['lastReturn'], 
						'target': 'hackerNewsModel', 'key': 'setTopstories' },
					{ 'then' : [] }, 
					{ 'map': 
						{ 'chain' : [ 
								{ 'getHackerNewsItem' : ['lastReturn'] },
								{ 'then' : [] },
								{ 'invoke' : ['lastReturn'], 
									'target' : 'hackerNewsItemCacheService', 'key': 'save'}
							] 
						} 
					}
				]
			};
			
			JExp.run (JExp.compile (topStoriesTask));

			return topStoriesTask;
		};
	}
})();
