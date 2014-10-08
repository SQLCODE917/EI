(function () {
	'use strict';

	describe ('Hacker News Controller', function() {
	
		var hnController;

		beforeEach (module ('ei'));
		beforeEach (inject (function ($controller, 
					$firebase, 
					hackerNewsModel, 
					workQueueClient,
					getHackerNewsTopStoriesTask) {
		
				hnController = $controller ('HackerNewsController', {
					'$firebase': $firebase,
					'hackerNewsModel': hackerNewsModel,
					'workQueueClient': workQueueClient,
					'getHackerNewsTopStoriesTask': getHackerNewsTopStoriesTask
				});
		}));

		it ('should fetch top stories', inject(function (getHackerNewsTopStoriesTask) {
			var topStoryTaskOperator = hnController.getTopStories ();
			var topStoryTasks = topStoryTaskOperator.tasks ();

			expect (topStoryTasks.length).toEqual (1);
			expect (topStoryTasks[0])
				.toShareAConstructorWith (getHackerNewsTopStoriesTask.constructor);
		}));
	});
})();
