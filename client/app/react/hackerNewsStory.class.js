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
		var hackerNewsItem = React.createClass (
		{
			displayName: 'HN_ITEM',

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
				var storyID = story.$id;
				var numChildren = (story.kids)? story.kids.length : 0;
				var score = story.score;
				var title = story.title;
				var url = story.url;
				
				var storyHeader = React.DOM.div ( 
							{'key': storyID, 'data-story-id': story.$id}, 
							storyID + ", " + numChildren + " children, " + score + " points : " + title 
						);
				if (numChildren ===0) {
					return storyHeader;
				} else {

					var childrenItems = story.kids.map (function (childID, index) {
						return React.DOM.li (
							{
								'key': index,
							   "id": childID
							},
							React.createElement(hackerNewsItem, { 'storyID': childID }, "")
							);
					});
					return (React.DOM.div (null, [storyHeader, React.DOM.ul (null, childrenItems)]));
				}
			}
		});

		return hackerNewsItem;
	}
})();
