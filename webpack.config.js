var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');

var inProduction = process.env.NODE_ENV === 'production';

var cssLoaders = {
    dev: ['style-loader', 'css-loader?url=false','sass-loader'],
    prod: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader?url=false','sass-loader']
    })
}

var cssConfig = inProduction ? cssLoaders.prod : cssLoaders.dev;

module.exports = {
    entry: {
        scripts: './src/js/scripts.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: cssConfig
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            hash: true,
            minify: {
                collapseWhitespace: inProduction
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, './*.html')),
            minimize: inProduction
        }),
        new CopyWebpackPlugin([
            { from: 'src/img/favicon', to: 'img/favicon' }
        ])
    ]
}