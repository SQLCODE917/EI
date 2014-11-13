(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('jExpressionCompiler', [
			'$injector',
		   	'jExpressionM',
			jExpressionCompiler
			]);

	function jExpressionCompiler ($injector, M) {
	
		var STATE = {
			"symbols": {}
		};
		
		var api = {
			compile: compile,
			run: run,
			define: define
		};

		api.define ('chain', chainProvider); 
		
		return api;

		function seq (first, next) {
			return function (M, input, success, failure) {
				M.start (first, input, seq (next, success), failure);
			};
		}

		function chain (operations) {
			var initChain = function (M, input, success, failure) {
				M.start (success, input, M.end, failure);
			};

			return function (M, input, success, failure) {
				M.start (operations.reduce (seq, initChain), input, success, failure);
			};
		}


		function define (name, value) {
				STATE.symbols[name] = value;
		}

		function resolve (name) {
			return STATE.symbols[name];
		}

		/*
		 * jExpression: Object
		 * banking on sequential order of keys in a JS Object - 
		 * seems to be the case in all browsers
		 */
		function getOperator (jExpression) {
			for (var key in jExpression) {
				return key;
			}
			return void (0);
		}

		function inject (name) {
			return $injector.has (name)?
				$injector.get (name):
				false;
		}

		function composeArguments (input, args) {
			return {
				'input': input,
				'args': args
			};
		}

		function closeOnFunction (f, args) {
			return asop;
			function asop (M, input, success, failure) {
				try {
					var allArgs = composeArguments (input, args);
					var result = f.call (null, allArgs);
					M.start (success, result, M.end, failure);
				} catch (exception) {
					M.start (
							failure, 
							M.error (exception, allArgs, success, failure),
							M.end,
							M.end
							);
				}
			}
		}

		function chainProvider (jExpression) {
			var operationJExpressions = jExpression.chain;
			var operations = operationJExpressions.map (
					function (operationJExpression) {
						return compile (operationJExpression);
					});
			return chain (operations);
		}

		function compile (jExpression) {
			var operator = getOperator (jExpression);
			if (operator) {
				
				var coreFunction = resolve (operator);
				var angularFunction = inject (operator);
				
				if (coreFunction) {
					return coreFunction (jExpression);
				} else if (angularFunction) {
					return closeOnFunction (
							angularFunction,
							jExpression[operator]
							);
				} else {
					//error!
					throw new Error ("Operator " + 
							operator + 
							" is not a core or Angular function!");
				}
			} else if (jExpression.constructor === Number || 
					jExpression.constructor === String) {
				return jExpression;
			} else {
				//error!
				throw new Error (
						"jExpression does not have an operator, and is not a primitive!"
						);
			}
		}

		function run (asop) {
			M.start (asop, "Start!", M.end, M.error);
		}
	}
})();
