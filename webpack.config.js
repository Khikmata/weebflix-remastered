const path = require("path");


module.exports = {
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			"@": path.resolve(__dirname, './src'),
			Components: path.resolve(__dirname, 'src/components'),
			Utils: path.resolve(__dirname, 'src/utils'),
			Store: path.resolve(__dirname, 'src/store'),
			Assets: path.resolve(__dirname, 'src/assets'),
			Styles: path.resolve(__dirname, 'src/styles'),
		}
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};