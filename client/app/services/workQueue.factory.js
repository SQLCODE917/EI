(function () {
	'use strict';

	angular
		.module('ei.services')
		.factory('workQueue', workQueue);

	function workQueue() {
	
		/*
		 * Factories create singletons.
		 * In order to compartmentalize the work done by separate controller actions,
		 * create new instances of a work queue for each.
		 * */	
		var api = {
			allocateQueue: function() { return new WorkQueue(); }
		};

		return api;


		function WorkQueue() {
			this.queue = [];

			return {
				push: this.queue.push,
				clone: this.queue.slice
			};
		}
	}
})();
