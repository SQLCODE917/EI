(function () {
	'use strict';

	describe ('Get Greeting Task', function () {
	
		beforeEach (module ('ei'));

		it ('should update the greeting', inject (function (helloModel, getGreetingTask) {
			spyOn (helloModel, 'setGreeting');

			getGreetingTask.create ('Test').perform();

			expect (helloModel.setGreeting).toHaveBeenCalledWith ("Hello, Test!");
		}));
	});
})();
