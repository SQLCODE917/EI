(function(){
	'use strict';

	angular.module('ei')
		.factory('workQueueClient', ['$injector', 'workQueue', WorkQueueClient]);

	function WorkQueueClient( injector, workQueue ) {

		function WorkQueueOperator() {
			
			/*jshint validthis: true*/
			var thisClient = this;

			thisClient.queue = workQueue.allocateQueue();
			
			thisClient.api = {
				push: pushTask,
				tasks: cloneTasks,
				perform: performWork
			};

			function performWork() {
				angular.forEach(cloneTasks(), function( task ) {
					task.perform();
				});
				return thisClient.api;
			}

			function pushTask( task ) {
				thisClient.queue.push( task );
				return thisClient.api;
			}

			function cloneTasks() {
				return thisClient.queue.clone();
			}

			return thisClient.api; 
		}

		return {
			allocateQueue: function() { return new WorkQueueOperator(); }
		};
	}	
})();
