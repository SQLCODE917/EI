(function () {
	'use strict';

	describe ('getHackerNewsTopStoriesTask', function () {
	
		beforeEach (module ('ei'));	
	
		it ('should update the top stories', inject (
				function ($rootScope, hackerNewsModel, getHackerNewsTopStoriesTask) {
			
			spyOn (hackerNewsModel, 'setTopstories');

/*
 * When testing, there is no $digest loop,
 * so promisses do not get actually resolved
 */
			var scope = $rootScope.$new();

			getHackerNewsTopStoriesTask
				.perform();

		/*
		 * manually aid digestion
		 */
			scope.$digest();
			
			expect (hackerNewsModel.setTopstories)
				.toHaveBeenCalledWith ([ 8414149, 8414078, 8413972, 8411638, 8414102, 8413204 ]);
		}));

	});
})();
