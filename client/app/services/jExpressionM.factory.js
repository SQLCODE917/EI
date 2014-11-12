(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('jExpressionM', jExpressionM);

	function jExpressionM () {
		var api = {
			start: start,
			error: error,
			end: end
		};

		return api;

		function start (operator, input, success, failure) {
			operator (api, input, success, failure);
		}

		function end () {}

		function error (exception, input, success, failure) {
			throw new Error ({
				exception: exception,
				input: input,
				success: success,
				failure: failure
			});
		}
	}
})();
