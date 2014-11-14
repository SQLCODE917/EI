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
		 * Precondition: 'lastReturn' in scope
		 * jExpression: 
		 * 	{ 'invoke':[arg,...], 'target':'targetName', 'key':'propertyName' }
		 * Postcondition: 
		 *	calls targetName.propertyName (args)
		 * return:
		 * 	result of the call
		 */
		return function (jExpression) {
			var args = jExpression.invoke.slice ();
			var targetName = jExpression.target;
			var key = jExpression.key;
			
			if (!$injector.has (targetName)) {
				throw new Error ('Invoker Task cannot find ' + target + ' to inject!');
			}
			if (args.lastIndexOf ('lastReturn') !== -1) {
				args.splice (args.lastIndexOf ('lastReturn'), 1, this.lastReturn);
			}

			var target = $injector.get (targetName);

			var result = target[key].apply (null, args);

			return result;
		};
	}
})();
