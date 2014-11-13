(function () {
	'use strict';

	describe ('Hacker News Controller', function() {
	
		var hackerNewsController;

		beforeEach (module ('ei'));
		beforeEach (inject (function ($controller, 
					$log, 
					hackerNewsModel, 
					jExpressionCompiler
					) {
		
				hackerNewsController = $controller ('HackerNewsController', {
					'$log': $log,
					'hackerNewsModel': hackerNewsModel,
					'jExpressionCompiler': jExpressionCompiler
				});
		}));

		it ('should fetch top stories', inject(function (jExpressionCompiler) {
			var expectedTasks = {
				'chain': [
					{'getHackerNewsTopstories':[]},
					{'invoke':['lastReturn'], 'target':'hackerNewsModel', 'key':'setTopstories'}
				]
			};

			spyOn (jExpressionCompiler, 'compile');
			spyOn (jExpressionCompiler, 'run');

			var actualTasks = hackerNewsController.getTopStories ();
		
			expect (jExpressionCompiler.compile).toHaveBeenCalled ();
			expect (jExpressionCompiler.run).toHaveBeenCalled ();

			var testForEquality = JSON.stringify (expectedTasks) === JSON.stringify (actualTasks);
			expect (testForEquality).toEqual (true);	
		}));
	});
})();
