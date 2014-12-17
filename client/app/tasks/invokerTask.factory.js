(function () {
	'use strict';

	angular.module ('ei')
		.factory ('invoke', [
			'$log',
			'$injector',
			invokerTask
			]);

	function invokerTask ($log, $injector) {
		
		/*
		 * jExpression: 
		 * 	{ 'invoke':[arg,...], 'target':'targetName', 'key':'propertyName' }
		 * args: [arg1,...]
		 * 	whatever artuments the function needs
		 * Postcondition:
		 *	calls targetName.propertyName (args)
		 * return:
		 * 	result of the call
		 */
		return function (jExpression, args) {
			var targetName = jExpression.target;
			var key = jExpression.key;
			
			if (!$injector.has (targetName)) {
				throw new Error ('Invoker Task cannot find ' + target + ' to inject!');
			}
			
			var target = $injector.get (targetName);

			var result = target[key].apply (null, args);

			return result;
		};
	}
})();
