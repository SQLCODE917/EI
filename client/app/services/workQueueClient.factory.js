(function(){
	'use strict';

	angular.module('ei')
		.factory('workQueueClient', ['workQueue', WorkQueueClient]);

	function WorkQueueClient( workQueue ) {
		
		return {
			allocateQueue: function() { return new WorkQueueOperator(); }
		};

		function WorkQueueOperator() {
			
			var queue = workQueue.allocateQueue();
			
			var api = {
				push: pushTask,
				tasks: cloneTasks,
				perform: performWork
			};

			return api; 


			function performWork() {
				angular.forEach(cloneTasks(), function( task ) {
					task.perform();
				});
				return api;
			}

			function pushTask( task ) {
				queue.push( task );
				return api;
			}

			/*
			 * For logging purposes, the queue, 
			 * once populated, should not be de-populated.
			 * */
			function cloneTasks() {
				return queue.clone();
			}
		}

	}	
})();
