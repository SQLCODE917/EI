(function () {
	'use strict';

	describe('Hello Controller', function() {

		var helloController;

		beforeEach(module('ei'));
		beforeEach(inject(function($controller, helloModel, getGreetingTask, workQueueClient) {
			helloController = $controller('HelloController', {
				'helloModel': helloModel,
				'getGreetingTask': getGreetingTask,
				'workQueueClient': workQueueClient
			});
		}));
		
		it('should define a greeting', function() {
			expect(helloController.greeting()).toBeDefined();
		});

		it('should greet when prompted', function() {
			expect(helloController.greeting()).not.toEqual('Hello, World!');

			helloController.sayHello();

			expect(helloController.greeting()).toEqual('Hello, World!');
		});

		it('should greet using the right task', inject(function(getGreetingTask) {
			var greetingTaskOperator = helloController.sayHello();
			var greetingTasks = greetingTaskOperator.tasks();

			expect(greetingTasks.length).toEqual(1);
			expect(greetingTasks[0]).toShareAConstructorWith(getGreetingTask.constructor);
		}));
	});
})();
