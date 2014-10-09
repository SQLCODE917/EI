// The metaphysical configuration of our unit tests

module.exports = function( config ) {
	config.set({
		
		frameworks: ['jasmine'],
		
		browsers: ['PhantomJS'],

		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/firebase/firebase.js',
			'bower_components/angularfire/dist/angularfire.js',
			
			'app/app.module.js',
			'app/app.routes.js',
			
			'app/models/helloModel.factory.js',
			'app/models/hackerNewsModel.factory.js',
			
			'app/services/workQueue.factory.js',
			'app/services/workQueueClient.factory.js',
			
			'test/services/hackerNews.test.factory.js',

			'app/tasks/getGreetingTask.factory.js',
			'app/tasks/getHackerNewsTopStoriesTask.factory.js',

			'app/layout/hello.controller.js',
			'app/layout/hackerNews.controller.js',
			
			'test/custom.matchers.js',
			'app/layout/hello.controller.unit.spec.js',
			'app/layout/hackerNews.controller.unit.spec.js',
			'app/services/workQueue.factory.unit.spec.js',
			'app/services/workQueueClient.factory.unit.spec.js',
			'app/tasks/getGreetingTask.factory.unit.spec.js',
			'app/tasks/getHackerNewsTopStoriesTask.factory.unit.spec.js'
		],

		exclude: [
			'client/app/**/*.integration.spec.js'
		],

		basePath: '',

		logLevel: config.LOG_DEBUG,

		singleRun: true
	});
};
