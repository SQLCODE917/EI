(function () {
	'use strict';

	describe('Work Queue', function () {
		
		beforeEach (module ('ei'));
		
		it ('should create unique queues', inject (function (workQueue) {
			var queue1 = workQueue.allocateQueue ();
			var queue2 = workQueue.allocateQueue ();
			
			expect (queue1).not.toBe (queue2);
		}));

		it ('should create queues that can be populated', inject (function (workQueue) {
			var queue = workQueue.allocateQueue ();

			expect (queue.clone ().length).toEqual (0);

			var workItem = function() {};
			queue.push (workItem);

			expect (queue.clone ().length).toEqual (1);
			expect (queue.clone ()[0]).toEqual (workItem);
			
		}));
		
		it ('should create queues that cannot be de-populated', inject (function ( workQueue) {
			
			var queue = workQueue.allocateQueue( );
			var workItem = function () {};
			queue.push (workItem);

			var queueClone = queue.clone ();

			expect (queueClone.length).toEqual (1);

			queueClone = [];

			expect (queueClone.length).toEqual (0);

			var anotherQueueClone = queue.clone ();

			expect (anotherQueueClone.length).toEqual (1);
			expect (anotherQueueClone[0]).toEqual (queue.clone()[0]);
		}));
	});
})();
