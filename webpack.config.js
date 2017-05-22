var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProduction = process.env.NODE_ENV === 'production';

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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?url=false','sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            hash: true,
            minify: {
                collapseWhitespace: isProduction
            }
        }),
        new ExtractTextPlugin("styles.css")
    ]
}