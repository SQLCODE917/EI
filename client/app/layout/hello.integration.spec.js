(function () {
	'use strict';
	
	describe('Hello Page', function () {
		
		beforeEach (function () {
			browser.get ('http://127.0.0.1:9000/');
		});

		it ('should acknowledge the World', function () {
			var greeting = element ('#hello', 'hello container').html ();
			expect (greeting).toEqual ("Hello, World!");
		});
	});	
})();
