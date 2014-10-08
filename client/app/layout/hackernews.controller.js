(function () {
	'use strict';

	angular.module ('ei')
		.controller ('HackerNewsController',
			[ '$firebase', HackerNewsController ]);

	function HackerNewsController (firebase) {

		/*jshint validthis: true */
		var self = this;

		self.topStoriesReference = new Firebase ('https://hacker-news.firebaseio.com/v0/topstories');
		self.topStoriesSync = firebase (self.topStoriesReference);
		self.topStories = self.topStoriesSync.$asObject();
	}
})();
