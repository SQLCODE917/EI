(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsTopstoriesReactClass', [
			'$q',
			'hackerNewsStoryReactClass',
			'hackerNewsItemCacheService',
			hackerNewsTopstories
			]);

	function hackerNewsTopstories (
		$q, 
		storyReactClass, 
		hackerNewsItemCache
	) {
		return React.createClass (
		{
			
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
					var topstoryPromises = self.props.topstoryIDs.map (
						function (topstoryID, index) {
						
							return hackerNewsItemCache.find (topstoryID.$value);
					});

					$q.all (topstoryPromises).then (function (topstories) {
						self.setState({ topstories: topstories });	
					});
				};

				fetchTopstories ();
				
				var unwatch = self.props.topstoryIDs.$watch (function (event) {
					console.log (event);
					fetchTopstories ();
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
						"id": topstory.id},
						storyReactClass(
							{story: topstory}
						)
					);
				});

				return (React.DOM.ul (null, topstoryListItems));
			}
		});
	}
})();
