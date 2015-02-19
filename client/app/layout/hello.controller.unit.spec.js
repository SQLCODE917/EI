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
			spyOn (jExpressionCompiler, 'compile');
			spyOn (jExpressionCompiler, 'run');
		
			var actualTasks = helloController.sayHello ();
		
			expect (jExpressionCompiler.compile).toHaveBeenCalled ();
			expect (jExpressionCompiler.run).toHaveBeenCalled ();
		}));
	});
})();
