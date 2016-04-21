var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        javascripts: path.resolve(__dirname, './app/main.jsx')
    },
    output: {
        path: path.resolve(__dirname, './assets'),
        filename: '[name].js',
        publicPath: '/assets/',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url?limit=10000'
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose?$!expose?jQuery'
            },
        ],
        noParse: [
            /\/flux.js/,
            /\/flux-utils.js/
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'vendor.js',
            name: 'vendor'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            '@pages': path.resolve(__dirname, './app/pages'),
            '@common': path.resolve(__dirname, './app/common/index'),
            'dispatcher': path.resolve(__dirname, './app/dispatcher'),
            'flux': path.resolve(__dirname, './app/libs/flux/flux'),
            'flux-utils': path.resolve(__dirname, './app/libs/flux/flux-utils')
        }
    }
    //devtool: '#inline-source-map'
};