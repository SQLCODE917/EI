// The metaphysical configuration of our integration tests

module.exports = function( config ) {
	config.set({
		
		frameworks: ['jasmine'],
		
		browsers: ['PhantomJS'],

		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'app/app.module.js',
			'app/app.routes.js',
			'app/models/helloModel.factory.js',
			'app/layout/hello.controller.js'
		],

		exclude: [
			'client/app/**/*.unit.spec.js'
		],

		basePath: '',

		logLevel: config.LOG_INFO,

		singleRun: true
	});
};
