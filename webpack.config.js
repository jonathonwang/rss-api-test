// Import Webpack
const webpack = require('webpack');
// Import Webpack Plugins
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const purify = require('purifycss-webpack-plugin');

// Webpack Config
module.exports = {  
	entry: './src/ts/app.ts',
	output: {
		path: 'dist/',
		filename: 'js/app.js'
	},
	// Turn on sourcemaps
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	// Add minification
	plugins: [
		new WebpackNotifierPlugin({ title: 'Webpack', contentImage: 'webpack.png' }),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('css/app.css', {
			allChunks: true
		}),
		new purify({
			basePath: __dirname,
			paths: [ '*.html' ],
			minify: true
		})
	],
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts' },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader']) },
			{ test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'file?limit=100000&name=assets/[hash].[ext]' }
		]
	},
	postcss() {
		return [autoprefixer, precss];
 	}
}
