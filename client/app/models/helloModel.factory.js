(function(){
	'use strict';

	angular
		.module('ei')
		.factory('helloModel', helloModel);

	function helloModel() {
		/*jshint validthis:true*/
		var thisModel = this;
		thisModel.greeting = 'default greeting';
		
		function setGreeting( newGreeting ){
			thisModel.greeting = newGreeting;
			return thisModel.greeting;
		}

		function getGreeting() {
			return thisModel.greeting;
		}

		var api = {
			greeting: getGreeting,
			setGreeting: setGreeting
		};

		return api;
	}
})();
