"use strict";

module.exports = {
	entry: "./Scripts/app.js",
	output: {
		filename: "./wwwroot/js/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["es2015"]
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				loader: "file-loader"
			}
		]
	}
};