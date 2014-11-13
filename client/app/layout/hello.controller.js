(function() {
	'use strict';

	angular.module('ei')
		.controller('HelloController', [ 
			'helloModel', 
			'jExpressionCompiler', 
			HelloController 
			]);

	function HelloController ( 
		helloModel, 
		JExp 
		) {

		/*jshint validthis: true */
		var self = this;

		self.greeting = helloModel.greeting;

		self.sayHello = function(){
		
			var helloTask = {'invoke':['Hello, World!'], 'target':'helloModel', 'key':'setGreeting'};

			JExp.run (JExp.compile (helloTask));

			return helloTask;
		};
	}
})();
