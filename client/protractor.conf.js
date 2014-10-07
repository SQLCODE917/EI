exports.config = {

		seleniumAddress: 'http://localhost:4444/wd/hub',

		capabilities: {
			'browserName': 'phantomjs'
		},

		baseUrl: 'http://localhost:9000',

		specs: [
			'app/layout/hello.integration.spec.js'
		],

		framework: 'jasmine',

		jasmineNodeOpts: {
			showColors: true,
			defaultTimeoutInterval: 30000
		}

};
