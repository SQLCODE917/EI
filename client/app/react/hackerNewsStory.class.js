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
			onChildDisplayToggle: function (event) {
				if (this.state.children.length === 0 && this.state.story && this.state.story.kids && this.state.story.kids.length > 0) {
					this.setState ({children: this.state.story.kids});
				} else {
					this.setState ({children: []});
				}

				event.preventDefault ();
				event.stopPropagation ();
			},
			
			displayName: 'HN_ITEM',

			getInitialState: function () {
				return {
		   			story: hackerNewsModel.getItem (this.props.storyID),
	   				children: [],
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
				var title = (story.title)? story.title : "";
				var text = story.text;
				var url = story.url;
				
				var storyHeader = React.DOM.div (
						{'key': storyID}, 
						[ 
							React.DOM.span (
								{'key': storyID + "_header", onClick: this.onChildDisplayToggle}, 
								storyID + ", " + numChildren + " children, " + score + " points"
								),
							React.DOM.a ({'href': url, 'key': storyID + "_title"}, title),
							React.DOM.div ({'key': storyID + "_text"}, story.text)
						]
						);
				if (this.state.children.length === 0) {
					return storyHeader;
				} else {

					var childrenItems = this.state.children.map (function (childID, index) {
						return React.DOM.li ({'key': storyID + "_child_" + index},
							React.createElement(hackerNewsItem, { 'storyID': childID }, "")
							);
					});
					return (React.DOM.div (null, 
								[storyHeader, React.DOM.ul ({'key': storyID + "_children"}, childrenItems)]
								));
				}
			}
		});

		return hackerNewsItem;
	}
})();
