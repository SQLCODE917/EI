(function () {
	'use strict';

	describe ('getHackerNewsTopStoriesTask', function () {
	
		beforeEach (module ('ei'));	
	
		it ('should update the top stories', inject (
				function ($rootScope, hackerNewsModel, getHackerNewsTopStoriesTask) {
			
			spyOn (hackerNewsModel, 'setTopStories');

/*
 * When testing, there is no $digest loop,
 * so promisses do not get actually resolved
 */
			var scope = $rootScope.$new();

			getHackerNewsTopStoriesTask
				.create()
				.perform();

		/*
		 * manually aid digestion
		 */
			scope.$digest();
			
			expect (hackerNewsModel.setTopStories)
				.toHaveBeenCalledWith ([ 8414149, 8414078, 8413972, 8411638, 8414102, 8413204 ]);
		}));

		it ('should propagate the changes to top stories', inject( function (
					$rootScope, 
					hackerNewsModel, 
					hackerNewsService, 
					getHackerNewsTopStoriesTask) {

			var scope = $rootScope.$new();

			getHackerNewsTopStoriesTask
				.create ()
				.perform ();
			
			scope.$digest();

			spyOn (hackerNewsModel, 'setTopStories');

			hackerNewsService.simulateTopstoriesUpdate ([8414149],
				{key: 0, event: "", prevChild: ""});
			
			scope.$digest();

			expect (hackerNewsModel.setTopStories)
				.toHaveBeenCalledWith ([8414149]);
		}));
	});
})();
