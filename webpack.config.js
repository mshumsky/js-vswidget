require("@babel/polyfill");

const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
	entry: ["@babel/polyfill", "./src/index.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "widget.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
				exclude: [/node_modules/]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [autoprefixer({})]
							}
						}
					},
					"sass-loader"
				]
			}
		]
	},
	devServer: {
		contentBase: "./dist",
		port: 9000	
	}
};