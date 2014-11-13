(function () {
	'use strict';

	angular.module ('ei')
		.factory ('invoke', [
			'$log',
			'$injector',
			invokerTask
			]);

	/*
	 * On an Angular injectable, invokes a specified method with the parameters given
	 *
	 * To add an Invoker into your jExpression:
	 * { 'invoke':[arg,...], 'target':'targetName', 'key':'propertyName' }
	 * when run, calls targetName.propertyName (args)
	 */
	function invokerTask ($log, $injector) {
		
		/*
		 * Precondition: has been invoked with 'lastReturn' in scope
		 */
		return function (jExpression) {
			var args = jExpression.invoke;
			var targetName = jExpression.target;
			var key = jExpression.key;
			
			if (!$injector.has (targetName)) {
				throw new Error ('Invoker Task cannot find ' + target + ' to inject!');
			}
			
			if (args.lastIndexOf ('lastReturn') !== -1) {
				args.splice (args.lastIndexOf ('lastReturn'), 1, this.lastReturn);
			}

			var target = $injector.get (targetName);

			target[key].apply (null, args);
		};
	}
})();
