(function () {
	'use strict';

	angular.module ('ei')
		.factory ('hackerNewsModel', 
			[ '$log', hackerNewsModel ]);

	function hackerNewsModel ($log) {
		var topstories = new Array (100);
		var items = {};
		var nullItem = Object.seal ({$id: -1, title: "Item Title"});
		
		var api = {
			getItem: getItem,
			setItem: setItem,
			nullItem: function () {return nullItem;},
			getTopstories: getTopstories,
			setTopstories: setTopstories
		};

		return api;

		function setTopstories (newTopstories) {
			topstories = newTopstories;
			return topstories;
		}

		function getTopstories () {
			return topstories;
		}

		function setItem (item) {
			items[item.$id] = item;
			return items[item.$id];
		}

		function getItem (itemID) {
			var item = items[itemID];
			if (item) {
				return item;
			} else {
				return api.nullItem();
			}
		}
	}
})();
