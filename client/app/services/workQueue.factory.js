(function () {
	'use strict';

	angular
		.module('ei.services')
		.factory('workQueue', workQueue);

	function workQueue() {
		var api = {
			allocateQueue: function() { return new WorkQueue(); }
		};

		function WorkQueue() {
			this.queue = [];

			return {
				push: this.queue.push,
				clone: this.queue.slice
			};
		}

		return api;
	}
})();
