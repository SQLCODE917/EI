(function(){
	'use strict';

	angular.module('ei')
		.factory('workQueueClient', ['$injector', 'workQueue', WorkQueueClient]);

	function WorkQueueClient( injector, workQueue ) {

		function WorkQueueOperator() {
			
			/*jshint validthis: true*/
			var thisClient = this;

			function performWork() {
				angular.forEach(thisClient.queue.copy(), function( task ) {
					task.perform();
				});
			}

			function pushTask( task ) {
				thisClient.queue.push( task );
				return thisClient;
			}

			thisClient.queue = workQueue.allocateQueue();
			thisClient.perform = performWork;
			thisClient.push = pushTask;

			return {
				push: pushTask,
				perform: thisClient.performWork
			}; 
		}

		return {
			allocateQueue: function() { return new WorkQueueOperator(); }
		};
	}	
})();
