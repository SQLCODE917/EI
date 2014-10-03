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
