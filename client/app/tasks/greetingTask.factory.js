(function () {
	'use strict';

	angular.module ('ei')
		.factory ('greetingTask', [
			'$log',
			'helloModel',
			greetingTask
			]);

	function greetingTask ($log, helloModel) {
		return function (args) {
			var greeting = args.args;

			helloModel.setGreeting ("Hello, " + greeting + "!" );
		};
	}
})();
