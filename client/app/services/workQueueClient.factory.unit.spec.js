(function () {
	'use strict';

	describe ('Work Queue Client', function () {

		var testTask = {
			perform: function () {}
		};

		beforeEach (module ('ei'));

		it ('should allow to add tasks', inject (function (workQueueClient){
			var workQueueOperator = workQueueClient.allocateQueue();
			
			expect (workQueueOperator.tasks ().length).toEqual (0);

			workQueueOperator.push (testTask);

			expect (workQueueOperator.tasks ().length).toEqual (1);
			
		}));

		it ('should allow to read existing tasks', inject (function (workQueueClient){
			var tasks = workQueueClient.allocateQueue ()
				.push (testTask)
				.tasks ();

			expect (tasks.length).toEqual (1);
			expect (tasks[0]).toBe(testTask);
		}));

		it ('call perform on tasks', inject (function (workQueueClient){
			spyOn (testTask, 'perform');

			workQueueClient.allocateQueue ()
				.push (testTask)
				.perform ();

			expect (testTask.perform).toHaveBeenCalled ();	
		}));
	});	
})();
