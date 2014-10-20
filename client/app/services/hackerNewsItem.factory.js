(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('hackerNewsItemService', [
			'$log', 
			'$firebase', 
			'HACKERNEWS_API_URL', 
			'HACKERNEWS_API_VERSION',
			hackerNewsItemService
		]);

	function hackerNewsItemService ($log, $firebase, API_URL, API_Version) {
		var itemServiceURL = API_URL + API_Version + 'item/';
		var reference = new Firebase (itemServiceURL);
		
		return function (id) {
			var firebaseObject = $firebase (reference.child (id)).$asObject (); 
			return firebaseObject.$loaded ();
		};
	}
})();
