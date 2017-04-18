const webpack = require('webpack');
const chunks = webpack.optimize.CommonsChunkPlugin;
const html = require('html-webpack-plugin');
const text = require('extract-text-webpack-plugin')
const helpers = require('./config/helpers.js');
const path = require('path');


module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: {
        'polyfills': './pollyfills.ts',
        'vendor':'./vendor.ts',
        'app': './app/main.ts'
    },
    output: {
        path: __dirname + '/build/',
        publicPath: 'build/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: 'id.[chunk].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: ['/node_modules/','/releases/'],
                use: ['awesome-typescript-loader', 'angular2-template-loader'],
                
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                use: text.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: helpers.root('app'),
                use: 'raw-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },
    plugins: [
        new html({
            template: './config/template.html',
            filename: '../index.html'
        }),
        new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./app'), // location of your src
        {} // a map of your routes
        )
    ],
    target: 'electron-renderer'
}