var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./public'),
  },
  module : {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',     // css-loader 로 번들링한 js형식의 스타일코드를 직접 html에 주입
                'css-loader'        // css => js 로 번들링
            ],
        }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/",
    overlay: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};