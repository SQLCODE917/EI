(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsItemChildIDs', [
				'$log',
				getHackerNewsItemChildIDs
			]);

	function getHackerNewsItemChildIDs (
			$log
		) 
	{
		return function (jExpression, args) {
			var itemObject = args[0];
			if (typeof (itemObject.kids) !== "undefined") {
				return itemObject.kids.map (function (childID) {
					return {$value: childID};
				});	
			} else {
				return [];
			}	
		};	
		
	}
})();
