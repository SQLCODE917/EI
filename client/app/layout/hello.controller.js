(function() {
	'use strict';

	angular.module('ei')
		.controller('HelloController', 
			[ '$scope', 'helloModel', 'getGreetingTask', 'workQueueClient', HelloController ]);

	function HelloController( scope, helloModel, getGreetingTask, workQueueClient ) {

		scope.$watch( function() { return helloModel.greeting(); },
			function( newGreeting, oldGreeting ) {
				scope.greeting = newGreeting;
			});
		
		scope.sayHello = function(){

			workQueueClient.allocateQueue()
				.push( getGreetingTask.create( "World" ) )
				.perform();

		};
	}
})();
