(function () {
	'use strict';

	angular
		.module('ei')
		.factory('getGreetingTask', [ 'helloModel', getGreetingTask ] );

	function getGreetingTask( helloModel ) {
		
		function Task( name ) {
			
			this.name = name;
			
			this.perform = function() {
				helloModel.setGreeting( "Hello, " + name + "!" );
			};

			return {
				dependencies: this.dependencies,
				perform: this.perform
			};
		}

		return {
			create: function( name ) { return new Task( name ); }
		};

	}
})();
