(function () {
	'use strict';

	angular
		.module('ei')
		.factory('getGreetingTask', [ 'helloModel', getGreetingTask ] );

	function getGreetingTask( helloModel ) {
		
		var api = {
			create: function( name ) { return new GreetingTask( name ); },
			constructor: GreetingTask
		};

		return api;
		
		function GreetingTask( name ) {
			
			this.name = name;
			
			this.perform = function() {
				helloModel.setGreeting( "Hello, " + name + "!" );
			};

			return {
				constructor: GreetingTask,
				perform: this.perform
			};
		}

	}
})();
