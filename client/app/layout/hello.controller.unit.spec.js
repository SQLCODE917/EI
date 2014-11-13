(function () {
	'use strict';

	describe ('Hello Controller', function() {

		var helloController;

		beforeEach (module ('ei'));
		beforeEach (inject (function (
					$controller, 
					helloModel, 
					jExpressionCompiler
					) {
			helloController = $controller ('HelloController', {
				'helloModel': helloModel,
				'jExpressionCompiler': jExpressionCompiler
			});
		}));


		it ('should use the right algorithm', inject (function (jExpressionCompiler) {
			var expectedTasks = 
				{'invoke':['Hello, World!'], 'target':'helloModel', 'key':'setGreeting'};
			spyOn (jExpressionCompiler, 'compile');
			spyOn (jExpressionCompiler, 'run');
		
			var actualTasks = helloController.sayHello ();
		
			expect (jExpressionCompiler.compile).toHaveBeenCalled ();
			expect (jExpressionCompiler.run).toHaveBeenCalled ();

			var testForEquality = 
				JSON.stringify (expectedTasks) === JSON.stringify (actualTasks);

			expect (testForEquality).toEqual (true);
		}));
	});
})();
