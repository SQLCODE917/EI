(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsStoryReactClass', hackerNewsStory);

	function hackerNewsStory () {
		return React.createClass (
		{
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
	}
})();
