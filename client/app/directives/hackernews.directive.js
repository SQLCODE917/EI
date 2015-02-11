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
			link: function (scope, element, attributes) {
				React.renderComponent (topstoriesReactClass (), element[0]);
			}
		};
	}
})();
