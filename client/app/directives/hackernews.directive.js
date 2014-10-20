(function () {
	'use strict';

	angular.module ('ei')
		.directive ('hackerNews', 
			[ 
			'$q',
			'hackerNewsItemCacheService',
			hackernewsDirective
			]
		);

	function hackernewsDirective (
		$q, 
		hackerNewsItemCache
		) {

		var hackerNewsStory = React.createClass ({
			displayName: 'HN_STORY',

			render: function () {
				var story = this.props.story;
				
				return (
					React.DOM.div ( 
						{'data-hn-id': story.id}, 
						story.id + " : " + story.title 
					)
				);
			}
		});

		var topstoriesReactClass = React.createClass ({
			
			displayName: 'TOPSTORIES',

			getInitialState: function () {
				return {
					topstories: [],
					unwatch: function () {}
				};
			},

			componentDidMount: function () {
				var self = this;
				
				var fetchTopstories = function () {
					var topstoryPromises = self.props.topstoryIDs.map (function (topstoryID, index) {
						return hackerNewsItemCache.find (topstoryID.$value);
					});

					$q.all (topstoryPromises).then (function (topstories) {
						self.setState({ topstories: topstories });	
					});
				};

				fetchTopstories();
				
				var unwatch = self.props.topstoryIDs.$watch (function (event) {
					
					console.log ("Topstories have changed!");
					console.log (event);
					fetchTopstories();
				});

				self.setState({unwatch: unwatch});
			},

			componentWillUnmount: function () {
				this.state.unwatch ();
			},

			render: function () {
				var topstories = this.state.topstories;
				
				var topstoryListItems = [];

				topstoryListItems = topstories.map (function (topstory, index) {
					return React.DOM.li( 
						{key: index,
						"data-hn-id": topstory.id},
						hackerNewsStory(
							{story: topstory}
						)
					);
				});

				return (React.DOM.ul (null, topstoryListItems));
			}
		});

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
