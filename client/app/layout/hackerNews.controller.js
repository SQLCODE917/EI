(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ '$log',
			'jExpressionCompiler',
			HackerNewsController ]);

	function HackerNewsController (
		$log,
		JExp
		) {

		/*jshint validthis: true */
		var self = this;
		
		self.getTopStories = function () {

			var topStoriesTask = 
			{ 'chain': [
					{ 'getHackerNewsTopstories': [] },
					{ 'then': [] }, 
					{ 'invoke': ['lastReturn'], 
						'target': 'hackerNewsModel', 'key': 'setTopstories' },
					{ 'map': 
						{ 'chain' : [ 
								{ 'getHackerNewsItem': ['lastReturn'] },
								{ 'then': [] },
								{ 'invoke': ['lastReturn'], 
									'target': 'hackerNewsModel', 'key': 'setItem'},
								{ 'getHackerNewsItemChildIDs': ['lastReturn'] },
								{ 'map': 
									{ 'chain': [
											{ 'getHackerNewsItem': ['lastReturn'] },
											{ 'then': [] },
											{ 'invoke': ['lastReturn'],
										   		'target': 'hackerNewsModel', 'key': 'setItem' }
										]
									}
								}
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
