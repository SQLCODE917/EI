(function () {
	'use strict';

	describe ('getUpdateHackerNewsModelTask', function () {
		
		beforeEach (module ('ei'));

		it ('should update the model', inject (
				function ($rootScope, hackerNewsModel, getUpdateHackerNewsModelTask) {
			
			var setterToCall = "setTopstories";
			var data = "Hello";

			spyOn (hackerNewsModel, setterToCall);

			var scope = $rootScope.$new ();

			getUpdateHackerNewsModelTask
				.create (setterToCall)
				.perform (data);

			scope.$digest ();

			expect (hackerNewsModel[setterToCall])
				.toHaveBeenCalledWith (data);
		}));
	});
})();
