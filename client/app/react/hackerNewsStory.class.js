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
				var score = (story.score)? story.score : "no";
				var title = (story.title)? story.title : "[no title]";
				var text = story.text;
				var url = story.url;
				
				var storyHeader = React.DOM.div ( 
							{'key': storyID, 'data-story-id': storyID}, 
							[ 
								React.DOM.div (null, storyID + ", " + numChildren + " children, " + score + " points : " + title),
								React.DOM.div (null, story.text)
							]
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
					return (React.DOM.div ({'key': storyID}, [storyHeader, React.DOM.ul (null, childrenItems)]));
				}
			}
		});

		return hackerNewsItem;
	}
})();
