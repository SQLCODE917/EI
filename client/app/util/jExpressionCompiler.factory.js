/* Logic as data is a brilliant concept!
 * Based on
 * https://srikumarks.github.io/jexpr/
 * Inspited by
 * http://srikumarks.github.com/gyan/2012/04/15/j-expressions/
 * http://srikumarks.github.com/gyan/2012/04/14/creating-dsls-in-javascript-using-j-expressions/
 */
(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('jExpressionCompiler', [
			'$injector',
		   	'jExpressionM',
			jExpressionCompiler
			]);

	function jExpressionCompiler ($injector, M) {

		var ENV = function (base) {
			// inheritance
			if (base) {
				this.base = base;
				this.symbols = Object.create (base.symbols);
			} else {
				this.symbols = {};
			}
		};
	
		var Env = new ENV();
		
		define (Env, 'chain', chainProvider); 
		define (Env, 'map', mapProvider);
		define (Env, 'then', thenProvider);

		return api (Env);

		function api (env) {
			// chill out
			return Object.freeze ({ 
				compile: function (jExpression) {
					return compile (env, jExpression);
				},
				run: run,
				define: function (name, value) {
					return define (env, name, value);
				}
			});
		}
		
		function define (env, name, value) {
				env.symbols['J_' + name] = value;
		}

		function resolve (env, name) {
			return env.symbols['J_' + name];
		}

		/*
		 * Make new environment helper
		 * to provide each jExp with it's own!
		 */
		function subenv (env) {
			return new ENV (env);
		}
	
	// sequence and chain functions	
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

		/*
		 * jExpression:
		 * { 'chain': [jExp,..]}
		 */
		function chainProvider (env, jExpression) {
			var operationJExpressions = jExpression.chain;
			var operations = operationJExpressions.map (
					function (operationJExpression) {
						return compile (env, operationJExpression);
					});

			
			return chain (operations);
		}

		// map utilities

		/*
		 * { map:[jExp,..] }
		 *
		 */
		function mapProvider (env, jExpression) {
			return asop;

			function asop (M, input, success, failure) {
				var results = input.map (function (inputItem) {
					var mapEnv = subenv (env);
					define (mapEnv, 'currentItem', inputItem);
					var mappingFunction = compile (mapEnv, jExpression.map);
					return mappingFunction (M, inputItem, M.end, failure);
				} );

				M.start (success, results, M.end, failure);
			}
		}

		// then utilities

		/*
		 * { then: [] }
		 */
		function thenProvider (env, jExpression) {

			return asop;

			function asop (M, input, success, failure) {
				input.then (function (resolvedInput) {
					M.start ( success, resolvedInput, M.end, failure);
				});
			}
		}

		// compiler utilities

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

		function resolveArguments (env, jExpression) {
			var operator = getOperator (jExpression);
			var args = jExpression[operator].slice ();

			if (args.lastIndexOf ('lastReturn') !== -1) {
				args.splice (args.lastIndexOf ('lastReturn'), 1, resolve (env, 'lastReturn'));
			}

			if (args.lastIndexOf ('currentItem') !== -1) {
				args.splice (args.lastIndexOf ('currentItem'), 1, resolve (env, 'currentItem'));
			}	

			return args;
		}
		
		function closeOnFunction (env, f, jExpression) {
			return asop;
			function asop (M, input, success, failure) {
				try {
					define (env, 'lastReturn', input);	
					var args = resolveArguments (env, jExpression);
					var result = f.call (null, jExpression, args);
					M.start (success, result, M.end, failure);
				} catch (exception) {
					M.start (
							failure, 
							M.error (exception, input, success, failure),
							M.end,
							M.end
							);
				}
			}
		}

		function compile (env, jExpression) {
			var childEnv = subenv (env);

			var operator = getOperator (jExpression);
			if (operator) {
				
				var coreFunction = resolve (childEnv, operator);
				var angularFunction = inject (operator);
				
				if (coreFunction) {
					return coreFunction (childEnv, jExpression);
				} else if (angularFunction) {
					return closeOnFunction (
							childEnv,
							angularFunction,
							jExpression
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
