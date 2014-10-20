(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('hackerNewsTopstoriesService', [
			'$q',
			'$firebase',
			'HACKERNEWS_API_URL',
			'HACKERNEWS_API_VERSION',
			hackerNewsTopstoriesService
		]);

	function hackerNewsTopstoriesService (
		$q,
		$firebase,
		API_URL,
		API_Version
	){
		var topstoriesServiceURL = API_URL + API_Version + 'topstories';
		var reference = new Firebase (topstoriesServiceURL);

		return function () {
			var firebaseArray = $firebase (reference).$asArray ();
			return firebaseArray.$loaded ();
		};
	}
})();
