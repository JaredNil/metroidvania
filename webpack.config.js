const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

console.log('IsProd', isProd);
console.log('IsDev', isDev);


// Функция переопределяет наименование ф	айлов в dist для разных режимов разработки

const filename = ext => !isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;



module.exports = {
	context: path.resolve(__dirname, 'src'), // Абсолютный путь до папки с исходниками
	entry: ['@babel/polyfill', './index.js'], // Точка входа (с полифилом для await )
	output: {
		filename: filename('js'), // Общий файл со всем js кодом и с хэшем для уточнения версии файла и загрузки последней версии с нужным хэшем, если isProd
		path: path.resolve(__dirname, 'dist') // Путь до папки с обработанными файлами
	},
	resolve: {
		extensions: ['.js'], // Расширения по умолчанию
		alias: { //  Cокращение прописывания путей
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		}
	},
	devtool: isDev ? 'source-map' : false, // хз зачем
	devServer: { // Динамическое обновление во время разработки
		port: 4200,
		hot: isDev,
		// devMiddleware: {
		// 	index: true,
		// 	mimeTypes: { phtml: 'text/html' },
		// 	publicPath: '/publicPathForDevServe',
		// 	serverSideRender: true,
		// 	writeToDisk: true,
		// },

	},



	plugins: [
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: { // Минифицирование
				removeComments: isProd, // Удаленние коментов ЕСЛИ режим продакшена -> node run build
				collapseWhitespace: isProd
			},

		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					// Копирует икноку из исходников в dist
					to: path.resolve(__dirname, 'dist')
				}
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
	],

	module: {
		rules: [
			{ // Модуль обработчик Loaders (в частности SCSS loader c CSS loader'ом)
				test: /\.s[ac]ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{ // babel loader js
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{ // html loader
				test: /\.html$/i,
				use: [
					"html-loader"
				]
			}
		],
	},
}