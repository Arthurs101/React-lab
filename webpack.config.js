//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//root
const path = require("path")
//configurations
module.exports ={
    mode : "development" ,//dev mode
    entry: { //multiple entry points
        index :"./src/index.js"
    } ,
    output:{ //multiple outputs
      path: path.resolve(__dirname, 'dist_with_babel'),
      filename: '[name].bundle.js',
    },
    //css plugin for css bundle and HTML BUNDLE
    plugins:[
       new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }
  ) ,
//   new HtmlWebpackPlugin({
//     template: './src/CustomElements/BookCard/BookCard.html',
//     filename: 'BookCard.html',
//     chunks: ['BookCard']
//   }
//   ),
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }) ,
      new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']})
    ],
    //module rules, creating bundle for a scss
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.html$/i,
          use: 'raw-loader',
        },
        {
          test: /\.css$/i,
          use: 'raw-loader',
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        }
      ],
    }

};

