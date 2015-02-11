(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsStoryReactClass', [
			'$rootScope',
			'hackerNewsModel',
			hackerNewsStory
			]);

	function hackerNewsStory (
		$rootScope,
		hackerNewsModel
		) {
		return React.createClass (
		{
			displayName: 'HN_STORY',

			getInitialState: function () {
				return {
		   			story: hackerNewsModel.getItem (this.props.storyID),
	   				unwatch: function () {}	
				};	
			},
			
			componentWillMount: function () {
				var self = this;

				var storyID = self.props.storyID;

				var unwatch = $rootScope.$watch ( function () { return hackerNewsModel.getItem (storyID); }, 
					function (newValue, oldValue) {
						self.setState ({story: newValue});
					}
				);
				self.setState({unwatch: unwatch});			
			},

			componentWillUnmount: function () {
				this.state.unwatch ();
			},
			
			render: function () {
				var story = this.state.story;
				
				if (story === hackerNewsModel.nullItem ()) {
					return (React.DOM.div ({className: 'nullItem'}, "Loading..."));
				}
				return (
					React.DOM.div ( 
						{'data-story-id': story.$id}, 
						story.$id + " : " + story.title 
					)
				);
			}
		}); 
	}
})();
