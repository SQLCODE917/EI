(function () {
	'use strict';

	describe ('getHackerNewsTopStoriesTask', function () {
	
		beforeEach (module ('ei'));	
	
		it ('should update the top stories', inject (
				function ($rootScope,
					hackerNewsService,	
					getHackerNewsTopStoriesTask) {
			
			spyOn (hackerNewsService, 'topstories');

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
			
			expect (hackerNewsService.topstories)
				.toHaveBeenCalled();
		}));

	});
})();
