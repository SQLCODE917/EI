(function () {
	'use strict';

	describe ('Hacker News Controller', function() {
	
		var hackerNewsController;

		beforeEach (module ('ei'));
		beforeEach (inject (function ($controller, 
					$log, 
					jExpressionCompiler
					) {
		
				hackerNewsController = $controller ('HackerNewsController', {
					'$log': $log,
					'jExpressionCompiler': jExpressionCompiler
				});
		}));

		it ('should run a jExpression', inject(function (jExpressionCompiler) {
			spyOn (jExpressionCompiler, 'compile');
			spyOn (jExpressionCompiler, 'run');

			hackerNewsController.getTopStories ();
		
			expect (jExpressionCompiler.compile).toHaveBeenCalled ();
			expect (jExpressionCompiler.run).toHaveBeenCalled ();
		}));
	});
})();
