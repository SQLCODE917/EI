(function () {
	'use strict';

	angular
		.module('ei')
		.factory('getGreetingTask', [ 'helloModel', getGreetingTask ] );

	function getGreetingTask( helloModel ) {
		
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

		return {
			create: function( name ) { return new GreetingTask( name ); },
			constructor: GreetingTask
		};

	}
})();
