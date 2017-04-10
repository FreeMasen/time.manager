const webpack = require('webpack');
const chunks = webpack.optimize.CommonsChunkPlugin;
const html = require('html-webpack-plugin');
const text = require('extract-text-webpack-plugin')
const helpers = require('./config/helpers.js');


module.exports = {
    devtool: 'source-map',
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
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                loader: text.extract({ fallback: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: helpers.root('app'),
                loader: 'raw-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
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