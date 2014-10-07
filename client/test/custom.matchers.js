(function () {
	'use strict';

	beforeEach(function() {
		this.addMatchers({
			/*
			 * Created to test objects as stemming from the same constructor function:
			 *
			 * function Person( name ) { this.name = name }
			 * var bob = new Person( "Bob" );
			 * expect(bob).toShareAConstructorWith(Person);
			 *
			 * Comes handy in testing the work queues created by controller actions
			 * to ensure that they include the right tasks.
			 * Task API object made to match the interface of a JS Object by including 
			 * a constructor property
			 */
			toShareAConstructorWith: function(expected) {
				return this.actual.constructor == expected;
			}
		});
	});

})();
