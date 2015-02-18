(function () {
	'use strict';

	/* jshint ignore:start */
	// DANGER ZONE~

	module.exports = function (grunt) {
	
		grunt.loadNpmTasks ('grunt-bower-install');

		//Project configuration
		grunt.initConfig ({
			bowerInstall: {
				client: {
					src: ['index.html'],
					exclude: [
						'mockfirebase',
						'firebase-simple-login'
					]
				}
			}	
		});

		grunt.registerTask ('build', [
			'bowerInstall:client'	
		]);
	};

	/* jshint ignore:end */
})();
