(function () {
	'use strict';

	describe ('Hacker News Controller', function() {
	
		var hackerNewsController;

		beforeEach (module ('ei'));
		beforeEach (inject (function ($controller, 
					$firebase, 
					hackerNewsModel, 
					workQueueClient,
					getHackerNewsTopStoriesTask) {
		
				hackerNewsController = $controller ('HackerNewsController', {
					'$firebase': $firebase,
					'hackerNewsModel': hackerNewsModel,
					'workQueueClient': workQueueClient,
					'getHackerNewsTopStoriesTask': getHackerNewsTopStoriesTask
				});
		}));

		it ('should fetch top stories', inject(function (getHackerNewsTopStoriesTask) {
			var topStoryTaskOperator = hackerNewsController.getTopStories ();
			var topStoryTasks = topStoryTaskOperator.tasks ();

			expect (topStoryTasks.length).toEqual (1);
			expect (topStoryTasks[0])
				.toShareAConstructorWith (getHackerNewsTopStoriesTask.constructor);
		}));
	});
})();
