var path = require('path');
var webpack = require('webpack');
//TODO: use IgnorePlugin for css/scss

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose?$!expose?jQuery'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ],
        noParse: [
            /\/sinon.js/
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.(css|scss)$/)
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            '@pages': path.resolve(__dirname, './app/pages'),
            '@common': path.resolve(__dirname, './app/common/index'),
            '@utils': path.resolve(__dirname, './app/utils'),
            '@fixtures': path.resolve(__dirname, './test/fixtures'),
            sinon: 'sinon/pkg/sinon'
        }
    },
    devtool: '#source-map',
    externals: {
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};