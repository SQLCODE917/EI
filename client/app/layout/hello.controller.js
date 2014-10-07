(function() {
	'use strict';

	angular.module('ei')
		.controller('HelloController', 
			[ 'helloModel', 'getGreetingTask', 'workQueueClient', HelloController ]);

	function HelloController( helloModel, getGreetingTask, workQueueClient ) {

		/*jshint validthis: true */
		var self = this;

		self.greeting = helloModel.greeting;

		self.sayHello = function(){
			
			return workQueueClient.allocateQueue()
				.push( getGreetingTask.create( "World" ) )
				.perform();

		};
	}
})();
