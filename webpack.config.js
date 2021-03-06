require("@babel/polyfill");

const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
	entry: ["@babel/polyfill/noConflict", "./src/index.js"],
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
			},
			{
				test: /\.svg$/,
				loader: "svg-inline-loader"
			},
			{
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
        },
      }
		]
	},
	devServer: {
		contentBase: "./dist",
		port: 9000
	}
};