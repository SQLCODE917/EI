(function () {
	'use strict';

	angular.module ('ei')
		.factory ('updateHackerNewsModelTask', [
			'$log',
			'hackerNewsModel',
			updateHackerNewsModel
			]);

	function updateHackerNewsModel ($log, hackerNewsModel) {
		/*
		 * args: { 'input' : Object, 'args' : Object }
		 */
		return function (args) {
			var key = args.args.key;
			var value = args.input;

			hackerNewsModel[key](value);
		};
	}
})();
