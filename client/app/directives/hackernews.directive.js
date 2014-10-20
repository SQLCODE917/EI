(function () {
	'use strict';

	angular.module ('ei')
		.directive ('hackerNews', 
			[ 
			'hackerNewsTopstoriesReactClass',
			hackernewsDirective
			]
		);

	function hackernewsDirective (
		topstoriesReactClass
		) {

		return {
			restrict: 'A',
			scope: {
				topstories: '='
			},
			link: function (scope, element, attributes) {
						
				scope.topstories().then (function (resolvedTopstoryIDs) {
					React.renderComponent (
						topstoriesReactClass ({
							topstoryIDs: resolvedTopstoryIDs
						}),
						element[0]
					);
				});
			}
		};
	}
})();
