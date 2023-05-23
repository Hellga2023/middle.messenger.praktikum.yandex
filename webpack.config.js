const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    })
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 4000,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
        fs: false
    },
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    }  
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude:path.resolve(__dirname, "node_modules")//exclude: /(node_modules)/
      },
      {
        test: /\.(png|svg)/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader",
          "sass-loader",
        ],
      }
    ]
  }
};  


