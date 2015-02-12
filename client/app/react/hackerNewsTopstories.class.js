(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsTopstoriesReactClass', [
			'$rootScope',
			'$q',
			'hackerNewsStoryReactClass',
			'hackerNewsItemCacheService',
			'hackerNewsModel',
			hackerNewsTopstories
			]);

	function hackerNewsTopstories (
		$rootScope,
		$q, 
		storyReactClass, 
		hackerNewsItemCache,
		hackerNewsModel
	) {
		return React.createClass (
		{
			
			displayName: 'TOPSTORIES',

			getInitialState: function () {
				return {
					topstories: hackerNewsModel.getTopstories (),
					unwatch: function () {}
				};
			},

			componentWillMount: function () {
				var self = this;
			
				/*
				 * Wait for the controller jExp to bring home the bacon
				 */	
				var unwatch = $rootScope.$watch (function () { return hackerNewsModel.getTopstories (); },
					function (newValue, oldValue) {
						self.setState ({topstories: newValue});
						if (typeof (newValue.$watch) !== "undefined") {
							//this is when we get the magic topstories firebase object
							newValue.$watch (function (event){
								self.setState ({topstories: newValue});
							});
						}
					});

				self.setState ({unwatch: unwatch});

			},
				
			componentWillUnmount: function () {
				this.state.unwatch ();
			},

			render: function () {
				var topstories = this.state.topstories;
				var topstoryListItems = [];

				topstoryListItems = topstories.map (function (topstory, index) {
					return React.DOM.li( 
						{'key': index},
						storyReactClass(
							{storyID: topstory.$value}
						)
					);
				});

				return (React.DOM.ul (null, topstoryListItems));
			}
		});
	}
})();
