// Karma configuration
// Generated on Fri Jan 19 2018 07:39:54 GMT-0200 (Horário brasileiro de verão)

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',
		browserify: {
			debug: true,
			transform: ['babelify', 'stringify']
		},


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'browserify'],


		// list of files / patterns to load in the browser
		files: [
			'./node_modules/angular/angular.js',                             // angular
			'./node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
			'./node_modules/angular-mocks/angular-mocks.js',
			'./node_modules/angular-route/angular-route.js',
			'./node_modules/angular-sanitize/angular-sanitize.js',
			'./node_modules/angular-messages/angular-messages.js',
			'./node_modules/angular-material/angular-material.js',
			'./Scripts/app.js',
			'./Scripts/app.spec.js'
		],


		// list of files / patterns to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./Scripts/*.js': ['browserify']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['spec'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_DEBUG,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,
		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-browserify',
			'karma-spec-reporter'
		]
	})
}
