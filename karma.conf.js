// Karma configuration

var webpackConfig = require('./webpack.config.test');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'sinon-chai'],
        files: [
            'test/index.js',
        ],
        preprocessors: {
            'test/*': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: {
                colors: true,
            },
            noInfo: true
        },
        reporters: ['mocha'],
        // reporter options
        mochaReporter: {
            showDiff: true,
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        plugins: [
            require('karma-mocha'),
            require('karma-sinon-chai'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-webpack')
        ],
        client: {
            chai: {
                includeStack: true
            }
        }
    });
};
