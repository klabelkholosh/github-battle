var path = require('path');
//this creates an index.html and puts it in the below defined 'dist' folder. Plus it will include the index_bundle.js script in the HTML file
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var webpack = require('webpack');

var config = {
	entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
		]
	}, 
	devServer: {
		historyApiFallback: true,  //this allows directly-typed-in URL paths to resolve with React Router
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
}

//obtains NODE_ENV setting from the package.json 'build' script
//below NODE_ENV setting sets it for the eventual compiled code.
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env' : {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		// uglify/minify our code
		new webpack.optimize.UglifyJsPlugin()
	)
}

module.exports = config;
