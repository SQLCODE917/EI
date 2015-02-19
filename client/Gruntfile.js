(function () {
	'use strict';

	/* jshint ignore:start */
	// DANGER ZONE~

	module.exports = function (grunt) {
	
		grunt.loadNpmTasks ('grunt-bower-install');
		grunt.loadNpmTasks ('grunt-dom-munger');
		grunt.loadNpmTasks ('grunt-contrib-uglify');
		grunt.loadNpmTasks ('grunt-contrib-clean');
		grunt.loadNpmTasks ('grunt-contrib-htmlmin');
		grunt.loadNpmTasks ('grunt-karma');

		//Project configuration
		grunt.initConfig ({
			//I did not use a yeoman template, so no need to call these vars like I did:
			variables: {
				dist: 'dist'
			},
			
			clean: {
				client: ['<%= variables.dist %>']
			},
			
			// enriches the 'bower:js' block in index.html with references to bower components 	
			bowerInstall: {
				client: {
					src: ['index.html'],
					exclude: [
						'mockfirebase',
						'firebase-simple-login'
					]
				}
			},

			// collects all script tags and caches them for minification
			dom_munger: {
				client: {
					options: {
						read: {
							selector: 'script',
							attribute: 'src',
							writeto: 'javascripts',
							isPath: true
						},
						remove: ['script'],
						append: {
							selector: 'head',
							html: '<script src="client.full.min.js"></script>'
						} 
					},
					src: 'index.html',
					dest: '<%= variables.dist %>/index.html'
				}
			},

			//minifies scripts collected by the dom_munger
			uglify: {
				client: {
					src: '<%= dom_munger.data.javascripts %>',		
					dest: '<%= variables.dist %>/client.full.min.js'
				}
			},

			//compresses and moves HTML to dist
			htmlmin: {
				client: {
					options: {
						removeComments: true,
						collapseWhitespace: true
					},
					files: [{
						expand: true,
						src: [
							'<%= variables.dist %>/index.html',
							'app/layout/*.html'	
						],
						dest: '<%= variables.dist %>'
					}]
				}
			},

			// since we run tests with Grunt, might as well configure it in the Gruntfile
			karma: {
				options: {
					basePath: '',
					singleRun: true,
					frameworks: ['jasmine'],
					browsers: ['PhantomJS'],
					files: [
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-mocks/angular-mocks.js',
						'bower_components/firebase/firebase.js',
						'bower_components/angularfire/dist/angularfire.js',
						'app/*.js',
						'app/**/*.js'	
					]	
				},
				unit: {
					exclude: [
						'**/*.integration.spec.js'
					]	
				},
				integration: {
					exclude: [
						'**/*.unit.spec.js'
					]
				}
			}

		});

		grunt.registerTask ('test', [
			'karma:unit',
			'karma:integration'
		]);

		grunt.registerTask ('build', [
			'clean:client',
			'bowerInstall:client',
			'dom_munger:client',
			'uglify:client',
			'htmlmin:client'
		]);
	};

	/* jshint ignore:end */
})();
