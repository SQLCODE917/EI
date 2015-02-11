(function () {
'use strict';

angular.module ('ei.services')
	.factory ('hackerNewsItemCacheService', [
		'$q',
		'$log',
		'hackerNewsModel',
		'hackerNewsItemService',
		hackerNewsItemCacheService
		]);

function hackerNewsItemCacheService (
	$q, 
	$log, 
	hackerNewsModel,
	hackerNewsItemService
	) {
	
	var api = {
		find: find,
		save: save
	};

	return api;

	function find (id) {
		var cachedItem = hackerNewsModel.getItem (id);

		if (cachedItem !== hackerNewsModel.nullItem ()) {
		return cachedItem;
	} 

	return api.save (hackerNewsItemService (id));
	}

	function save (item) {
		return hackerNewsModel.setItem (item);
	}
}
})();

