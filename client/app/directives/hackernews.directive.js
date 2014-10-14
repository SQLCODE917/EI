(function () {
	'use strict';

	angular.module ('ei')
		.directive ('hackerNews', hackernewsDirective);

	function hackernewsDirective () {
		var topstoriesReactClass = React.createClass ({
			
			displayName: 'TOPSTORIES',

			render: function () {
			
				var topstories = this.props.topstories;

				var listItems = topstories.map (function (topstory, index) {
					//http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
					// key attribute contains the unique ID for every element in the collection.
					return (React.DOM.li ( { key: index }, 
							index + " : " + topstory.$value));
				});

				return (React.DOM.ul (null, listItems));
			}
		});

		return {
			restrict: 'A',
			scope: {
				topstories: '='
			},
			link: function (scope, element, attributes) {
			
				function renderReactComponent (topstories) {
					React.renderComponent (
							topstoriesReactClass ({
								topstories: topstories
							}),
							element[0]
						);
				}

				var unwatch = scope.$watchCollection ('topstories()', function (newValue, oldValue) {

					renderReactComponent (newValue);
					
					if (newValue.$watch) {

						newValue.$watch (function (event){
							renderReactComponent (newValue);	
						});

						unwatch();
					}
				});
			}
		};
	}
})();
