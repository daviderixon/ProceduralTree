const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watch:true,
  module: {
   rules: [
       {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
     {
       enforce: 'pre',
       test: /\.js$/,
       loader: 'eslint-loader',
       exclude: /node_modules/,
       options:{
           fix: true,
       },
     },
     {
          test: /\.glsl$/,
          use: [
            {
              loader: "webpack-glsl-loader",
            },
          ],
     },
   ],
 },
  resolve: {
        modules: [
            "node_modules",
            "modules",
        ],
        extensions: [".js", ".jsx"],
    },
    performance: {
      hints: false
    },
};
